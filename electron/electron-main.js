"use strict";
const electron_1 = require("electron");
const MiracleListAppMenu_1 = require("./MiracleListAppMenu");
const username = require("username");
const fs = require("fs");
const moment = require("moment");
const path = require('path');
const url = require('url');
let win;
function createWindow() {
    console.log("createWindow");
    writeLog("!!!Electron/Main:createWindow");
    const { width, height } = electron_1.screen.getPrimaryDisplay().workAreaSize;
    writeLog("OS:" + process.platform);
    writeLog("Screen:" + width + "x" + height);
    writeLog("Anwendungspfad:" + __dirname);
    writeLog("Aktueller Benutzer:" + username.sync());
    writeLog("User Home Dir:" + electron_1.app.getPath("documents"));
    const favicon = path.join(__dirname, 'favicon.ico');
    writeLog("Icon1:" + favicon);
    writeLog("new BrowserWindow()");
    win = new electron_1.BrowserWindow({
        width: 900,
        height: 600,
        frame: true,
        icon: favicon,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    win.setTitle(electron_1.app.getName() + " v" + electron_1.app.getVersion() + " auf " + process.platform);
    let env = new Object();
    env.version = process.versions['electron'];
    env.os = process.platform;
    env.appversion = electron_1.app.getVersion();
    win.env = env;
    writeLog("Electron/Main:Lade Index.html...");
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    let contents = win.webContents;
    writeLog("Electron/Main:Anwendungsmenü erstellen...");
    var menuTemplate = MiracleListAppMenu_1.MiracleListAppMenu.CreateMenu(electron_1.app, win);
    const menu = electron_1.Menu.buildFromTemplate(menuTemplate);
    electron_1.Menu.setApplicationMenu(menu);
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
    try {
        writeLog("Electron/Main:Traymenü erstellen...");
        let tray = new electron_1.Tray(favicon);
        const contextMenu = electron_1.Menu.buildFromTemplate([
            {
                label: 'Über diese Anwendung', click: () => {
                    const options = {
                        type: 'info',
                        title: 'Cross-Plattform-Desktop-Variante der Beispielanwendung MiracleList',
                        buttons: ['Ok'],
                        message: '(C) Dr. Holger Schwichtenberg 2017\nDetails siehe Anwendungsmenü!\nSystembenutzer: ' + username.sync() + ''
                    };
                    electron_1.dialog.showMessageBox(options, function () { });
                }
            },
            {
                label: 'Verstecken', click: () => { win.minimize(); }
            },
            {
                label: 'Wiederherstellen', click: () => { win.restore(); }
            },
            {
                label: 'Maximieren', click: () => { win.maximize(); }
            },
            {
                label: 'Abmelden', click: () => { contents.send('logout', { msg: '' }); }
            },
            {
                label: 'Beenden', click: () => { electron_1.app.quit(); }
            },
        ]);
        tray.setToolTip('MiracleList');
        tray.setContextMenu(contextMenu);
    }
    catch (err) {
        writeLog("Electron/Main:Tray-Fehler: " + err.message);
    }
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
    logtext = moment().format("DD.MM.YYYY HH:mm:ss") + ": " + logtext + "\r\n";
    let logfile = path.join(electron_1.app.getPath("documents"), 'miraclelist_log.txt');
    fs.appendFile(logfile, logtext, (err) => {
        if (err)
            throw err;
    });
}
//# sourceMappingURL=electron-main.js.map