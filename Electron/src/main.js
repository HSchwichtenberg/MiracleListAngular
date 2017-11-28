"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const username = require("username");
const fs = require("fs");
const moment = require("moment");
const electron_appmenu_1 = require("./electron-appmenu");
const electron_traymenu_1 = require("./electron-traymenu");
const isDevelopment = process.env.NODE_ENV !== 'production';
const path = require('path');
const url = require('url');
let win;
const logfile = 'miraclelist_log.txt';
function electronMain() {
    writeLog("!!! Electron/Main:createWindow");
    const settings = require('electron-settings');
    let erster = settings.get('miraclelist.ersteVerwendung');
    if (!erster)
        erster = new Date();
    settings.set('miraclelist.ersteVerwendung', erster);
    let anzahl = settings.get('miraclelist.anzahlVerwendungen');
    if (!anzahl)
        anzahl = 1;
    else
        anzahl++;
    settings.set('miraclelist.anzahlVerwendungen', anzahl);
    const { width, height } = electron_1.screen.getPrimaryDisplay().workAreaSize;
    const env = {
        Zeit: new Date(),
        OS: process.platform,
        Sprache: electron_1.app.getLocale(),
        Speicher: (process.getSystemMemoryInfo().total / 1024).toFixed() + "MB",
        AppMetrics: electron_1.app.getAppMetrics(),
        ElectronVersion: process.versions.electron,
        ChromeVersion: process.versions.chrome,
        NodeVersion: process.versions.node,
        V8Version: process.versions.v8,
        Screen: width + "x" + height,
        Anwendungspfad1: __dirname,
        Anwendungspfad2: electron_1.app.getAppPath(),
        AktuellerBenutzer: username.sync(),
        UserHomeDir: electron_1.app.getPath("documents"),
        UserData: electron_1.app.getPath('userData'),
        AppVersion: electron_1.app.getVersion(),
        ErsteVerwendung: erster,
        AnzahlVerwendungen: anzahl
    };
    writeLog("Systeminfo", env);
    writeLog("Creating BrowserWindow...");
    const favicon = path.join(__dirname, 'favicon.ico');
    win = new electron_1.BrowserWindow({
        width: 900,
        height: 600,
        frame: true,
        icon: favicon,
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'electron-preload.js')
        }
    });
    win.setTitle(electron_1.app.getName() + " v" + electron_1.app.getVersion() + " auf " + process.platform);
    win.env = env;
    win.webContents.on('crashed', function (event) {
        writeLog("!!!crashed", event);
        const options = {
            type: 'info',
            title: 'Renderer Process Crashed',
            message: 'This process has crashed.',
            buttons: ['Reload', 'Close']
        };
        electron_1.dialog.showMessageBox(options, function (index) {
            if (index === 0)
                win.reload();
            else
                win.close();
        });
    });
    win.on('unresponsive', function (event) { writeLog("!!!unresponsive"); });
    writeLog("Electron/Main:Lade Index.html...");
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    writeLog("Electron/Main:Anwendungsmenü erstellen...");
    let menuTemplate = electron_appmenu_1.MiracleListAppMenu.CreateMenu(win, env);
    const menu = electron_1.Menu.buildFromTemplate(menuTemplate);
    electron_1.Menu.setApplicationMenu(menu);
    try {
        writeLog("Electron/Main:Traymenü erstellen...");
        let tray = new electron_1.Tray(favicon);
        tray.setToolTip('MiracleList');
        tray.setContextMenu(electron_traymenu_1.MiracleListTrayMenu.CreateMenu(win, env));
    }
    catch (err) {
        writeLog("Electron/Main:Tray-Fehler: " + err.message);
    }
    writeLog("Electron/Main:Event Handler erstellen...");
    electron_1.ipcMain.on('export', (event, arg) => {
        console.log("!!!export-event", event, arg);
        writeLog("export-event!");
        let file = path.join(electron_1.app.getPath("documents"), 'miraclelist_export.json');
        let text = JSON.stringify(arg);
        console.log("Export-Datei", file);
        writeLog("export-Datei: " + file);
        fs.appendFile(file, text, (err) => {
            if (err)
                throw err;
        });
        console.log("Export: OK!", file);
        event.sender.send('export-reply', 'Aufgaben exportiert in Datei ' + file);
    });
    win.on('closed', () => {
        win = null;
    });
    writeLog("Electron/Main:createWindow END");
}
electron_1.app.on('ready', electronMain);
electron_1.app.on('window-all-closed', () => {
    writeLog("Electron/Main:window-all-closed");
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (win === null) {
        writeLog("Electron/Main:activate");
        electronMain();
    }
});
process.on('uncaughtException', function (err) {
    writeLog(`!!!uncaughtException`, err);
    let options = {
        title: "Leider ist ein Fehler aufgetreten",
        type: 'info',
        buttons: ['YES', 'NO'],
        message: err.stack,
        detail: 'Soll die Anwendung fortgesetzt werden?'
    };
    let w = electron_1.BrowserWindow.getFocusedWindow();
    let e = electron_1.dialog.showMessageBox(w, options);
    console.log(e);
    if (e === 1) {
        electron_1.app.exit();
    }
});
function writeLog(logtext, obj) {
    console.log(logtext, obj);
    if (!logfile)
        return;
    let logtext2 = moment().format("DD.MM.YYYY HH:mm:ss") + ": " + logtext + "\r\n";
    if (obj)
        logtext += JSON.stringify(obj, null, 1);
    let logfilepath = path.join(electron_1.app.getPath("documents"), logfile);
    fs.appendFile(logfilepath, logtext2, (err) => {
        if (err)
            throw err;
    });
}
//# sourceMappingURL=main.js.map