"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const username = require("username");
const fs = require("fs");
const moment = require("moment");
const electron_appmenu_1 = require("./electron-appmenu");
const electron_traymenu_1 = require("./electron-traymenu");
const path = require('path');
const url = require('url');
let win;
const logfile = 'miraclelist_log.txt';
function createWindow() {
    writeLog("!!! Electron/Main:createWindow");
    const { width, height } = electron_1.screen.getPrimaryDisplay().workAreaSize;
    const env = {
        Zeit: new Date(),
        OS: process.platform,
        Sprache: electron_1.app.getLocale(),
        ElectronVersion: process.versions.electron,
        ChromeVersion: process.versions.chrome,
        Screen: width + "x" + height,
        Anwendungspfad: __dirname,
        AktuellerBenutzer: username.sync(),
        UserHomeDir: electron_1.app.getPath("documents"),
        AppVersion: electron_1.app.getVersion()
    };
    writeLog(JSON.stringify(env, null, 4));
    const favicon = path.join(__dirname, 'favicon.ico');
    writeLog("Icon:" + favicon);
    writeLog("new BrowserWindow()...");
    win = new electron_1.BrowserWindow({
        width: 900,
        height: 600,
        frame: true,
        icon: favicon,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'electron-preload.js')
        }
    });
    win.setTitle(electron_1.app.getName() + " v" + electron_1.app.getVersion() + " auf " + process.platform);
    win.env = env;
    writeLog("Electron/Main:Lade Index.html...");
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    let contents = win.webContents;
    writeLog("Electron/Main:Anwendungsmenü erstellen...");
    let menuTemplate = electron_appmenu_1.MiracleListAppMenu.CreateMenu(electron_1.app, win);
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
        console.log("export-event", arg);
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
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', () => {
    writeLog("Electron/Main:window-all-closed");
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (win === null) {
        writeLog("Electron/Main:activate");
        createWindow();
    }
});
function writeLog(logtext) {
    console.log(logtext);
    if (!logfile)
        return;
    const logtext2 = moment().format("DD.MM.YYYY HH:mm:ss") + ": " + logtext + "\r\n";
    let logfilepath = path.join(electron_1.app.getPath("documents"), logfile);
    fs.appendFile(logfilepath, logtext2, (err) => {
        if (err)
            throw err;
    });
}
//# sourceMappingURL=electron-main.js.map