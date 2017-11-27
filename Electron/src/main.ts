// Electron-Komponenten
import { app, BrowserWindow, Menu, dialog, ipcMain, Tray, screen } from "electron";
// NodeJS-Komponenten
import * as username from "username";
import * as fs from "fs";
import * as moment from "moment";
// Eigene Hilfsklassen
import { MiracleListAppMenu } from "./electron-appmenu";
import { MiracleListTrayMenu } from "./electron-traymenu";

const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path');
const url = require('url');
// const NativeImage = require('native-image');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: Electron.BrowserWindow;

const logfile: string = 'miraclelist_log.txt';

function electronMain() {
 writeLog("!!! Electron/Main:createWindow");

 // =================== Systeminformationen auslesen und in dynamischem Objekt speichern
 const {width, height} = screen.getPrimaryDisplay().workAreaSize;
 const env = {
  Zeit: new Date(),
  OS: process.platform,
  Sprache: app.getLocale(),
  Speicher: (process.getSystemMemoryInfo().total/1024).toFixed() + "MB",
  AppMetrics: app.getAppMetrics(), // früher: getAppMemoryInfo
  ElectronVersion: process.versions.electron,
  ChromeVersion: process.versions.chrome,
  Screen: width + "x" + height,
  Anwendungspfad: __dirname,
  Anwendungspfad2: app.getAppPath,
  AktuellerBenutzer: username.sync(),
  UserHomeDir: app.getPath("documents"),
  AppVersion: app.getVersion(),
  };
 writeLog("Systeminfo",env);

 // =================== Renderer-Fenster erzeugen
 writeLog("Creating BrowserWindow...");
 const favicon: string = path.join(__dirname, 'favicon.ico');
 win = new BrowserWindow({
  width: 900,
  height: 600,
  frame: true, // false für frameless Window
  icon: favicon,
  webPreferences: {
   devTools: true,
   nodeIntegration: true,
   preload: path.join(__dirname, 'electron-preload.js')
  }
 });
 win.setTitle(app.getName() + " v" + app.getVersion() + " auf " + process.platform);

 // ===================  Datenübergabe von Informationen an Renderer mit dynamischen Objekt
 (<any>win).env = env;

 // ==================== Ereignisse

 win.webContents.on('crashed', function(event) { writeLog("!!!crashed"); })
 win.on('unresponsive', function(event) {  writeLog("!!!unresponsive"); })

  // ===================  Startseite laden
 writeLog("Electron/Main:Lade Index.html...");
 win.loadURL(url.format({
  pathname: path.join(__dirname, 'index.html'),
  protocol: 'file:',
  slashes: true
 }));



 // =================== Anwendungsmenü erstellen
 writeLog("Electron/Main:Anwendungsmenü erstellen...");
 let menuTemplate = MiracleListAppMenu.CreateMenu(win, env);
 const menu = Menu.buildFromTemplate(menuTemplate);
 Menu.setApplicationMenu(menu);

 // =================== Traymenü erstellen
 // siehe auch https://github.com/electron/electron/blob/master/docs/api/tray.md
 try {
  writeLog("Electron/Main:Traymenü erstellen...");
  let tray = new Tray(favicon);
  tray.setToolTip('MiracleList');
  tray.setContextMenu(MiracleListTrayMenu.CreateMenu(win, env));
 }
 catch (err) {
  writeLog("Electron/Main:Tray-Fehler: " + err.message)
 }

  // =================== Reaktion auf Events vom Renderer
  writeLog("Electron/Main:Event Handler erstellen...");
  ipcMain.on('export', (event, arg) => {
   console.log("!!!export-event", event, arg);
   writeLog("export-event!");
   let file = path.join(app.getPath("documents"), 'miraclelist_export.json');
   let text = JSON.stringify(arg);
   console.log("Export-Datei", file);
   writeLog("export-Datei: " + file);
   fs.appendFile(file, text, (err) => {
    if (err) throw err;
   });
   console.log("Export: OK!", file);
   event.sender.send('export-reply', 'Aufgaben exportiert in Datei ' + file);
  });

  // ggf. Dateiauswahl
  //  let options = {
  // title: "Export speichern",
  // defaultPath: "export.csv",
 // }
  // let savepath = dialog.showSaveDialog(options);


 // =================== Globaler Shortcut
 // TODO: https://github.com/electron/electron/blob/master/docs/api/global-shortcut.md


 // Emitted when the window is closed.
 win.on('closed', () => {
  // Dereference the window object, usually you would store windows
  // in an array if your app supports multi windows, this is the time
  // when you should delete the corresponding element.
  win = null;
 });
 writeLog("Electron/Main:createWindow END");
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', electronMain);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  writeLog("Electron/Main:window-all-closed");
 // On macOS it is common for applications and their menu bar
 // to stay active until the user quits explicitly with Cmd + Q
 if (process.platform !== 'darwin') {
  app.quit();
 }
});

app.on('activate', () => {
 // On macOS it's common to re-create a window in the app when the
 // dock icon is clicked and there are no other windows open.
 if (win === null) {
  writeLog("Electron/Main:activate");
  electronMain();
 }
});

process.on('uncaughtException',
 function (err: Error) {

  writeLog(`!!!uncaughtException`, err );
  let options: Electron.MessageBoxOptions = {
   title: "Leider ist ein Fehler aufgetreten",
   type: 'info',
   buttons: ['YES', 'NO'],
   message: err.stack,
   detail: 'Soll die Anwendung fortgesetzt werden?'
  };
  let w = BrowserWindow.getFocusedWindow();
  let e = dialog.showMessageBox(w, options);
  console.log(e);
  if (e===1) { app.exit(); //process.crash();
  }
 }
 )

function writeLog(logtext: string, obj?: any) {
 console.log(logtext, obj);
 if (!logfile) return;
 let logtext2 = moment().format("DD.MM.YYYY HH:mm:ss") + ": " + logtext + "\r\n";
 if (obj) logtext += JSON.stringify(obj, null, 1);
 let logfilepath = path.join(app.getPath("documents"), logfile)
 fs.appendFile(logfilepath, logtext2, (err) => {
  if (err) throw err;
 });
}
