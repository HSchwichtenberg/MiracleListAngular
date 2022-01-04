"use strict";
exports.__esModule = true;
var settings = require("electron-settings");
// Electron-Komponenten
var electron_1 = require("electron");
// NodeJS-Komponenten
var username = require("username");
var fs = require("fs");
var moment = require("moment");
// Eigene Hilfsklassen
var electron_appmenu_1 = require("./electron-appmenu");
var electron_traymenu_1 = require("./electron-traymenu");
var isDevelopment = process.env.NODE_ENV !== 'production';
var path = require('path');
var url = require('url');
// Konfiguration
var logfile = 'miraclelist_log.txt';
// Das Fenster- und das Tray-Objekt müssen global sein!
var win;
var tray;
// called in ready()-event
function electronMain() {
    writeLog("!!! Electron/Main:createWindow");
    // =================== Einstellungen auslesen und speichern
    var erster = new Date();
    var anzahl = 0;
    if (settings != null) {
        erster = new Date(settings.get('miraclelist.ersteVerwendung').toString());
        if (!erster)
            erster = new Date();
        settings.set('miraclelist.ersteVerwendung', erster.toString());
        anzahl = settings.get('miraclelist.anzahlVerwendungen');
        if (!anzahl)
            anzahl = 1;
        else
            anzahl++;
        settings.set('miraclelist.anzahlVerwendungen', anzahl);
    }
    else {
        console.log("!!!! Settings not available!");
    }
    // =================== Systeminformationen auslesen und in dynamischem Objekt speichern
    var _a = electron_1.screen.getPrimaryDisplay().workAreaSize, width = _a.width, height = _a.height;
    var env = {
        Zeit: new Date(),
        OS: process.platform,
        OSVersion: process.getSystemVersion(),
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
    // =================== Renderer-Fenster erzeugen
    writeLog("Creating BrowserWindow...");
    console.log(__dirname + '/img/icon.png');
    var icon = electron_1.nativeImage.createFromPath(__dirname + '/img/icon.png');
    win = new electron_1.BrowserWindow({
        width: 900,
        height: 600,
        frame: true,
        icon: icon,
        show: false,
        backgroundColor: '#ffdd86',
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'electron-preload.js')
        }
    });
    win.setTitle(electron_1.app.getName() + " v" + electron_1.app.getVersion() + " auf " + process.platform);
    // ===================  Datenübergabe von Informationen an Renderer mit dynamischen Objekt
    win.env = env;
    // ==================== Ereignisse
    win.webContents.on('crashed', function (event) {
        writeLog("!!!crashed", event);
        var options = {
            type: 'info',
            title: 'Renderer Process Crashed',
            message: 'This process has crashed.',
            buttons: ['Reload', 'Close']
        };
        electron_1.dialog.showMessageBox(win, options).then(function (index) {
            if (index.response === 0)
                win.reload();
            else
                win.close();
        });
    });
    win.on('unresponsive', function (event) { writeLog("!!!unresponsive"); });
    // ===================  Startseite laden
    writeLog("Electron/Main:Lade Index.html...");
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    // =================== Anwendungsmenü erstellen
    writeLog("Electron/Main:Anwendungsmen erstellen...");
    var menuTemplate = electron_appmenu_1.MiracleListAppMenu.CreateMenu(win, env);
    var menu = electron_1.Menu.buildFromTemplate(menuTemplate);
    electron_1.Menu.setApplicationMenu(menu);
    // =================== Traymenü erstellen
    // siehe auch https://github.com/electron/electron/blob/master/docs/api/tray.md
    try {
        writeLog("Electron/Main:Traymenü erstellen...");
        tray = new electron_1.Tray(icon);
        tray.setToolTip('MiracleList');
        tray.setContextMenu(electron_traymenu_1.MiracleListTrayMenu.CreateMenu(win, env));
    }
    catch (err) {
        writeLog("Electron/Main:Tray-Fehler: " + err.message);
    }
    // =================== Reaktion auf Events vom Renderer
    writeLog("Electron/Main:Event Handler erstellen...");
    electron_1.ipcMain.on('export', function (event, arg) {
        console.log("!!!export-event", event, arg);
        writeLog("export-event!");
        var file = path.join(electron_1.app.getPath("documents"), 'miraclelist_export.json');
        var text = JSON.stringify(arg);
        console.log("Export-Datei", file);
        writeLog("export-Datei: " + file);
        fs.appendFile(file, text, function (err) {
            if (err)
                throw err;
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
    win.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
    // Ladeeffekte unsichtbar machen, indem wir erst jetzt das Fenster anzeigen
    win.on('ready-to-show', function () {
        win.show();
        win.focus();
    });
    writeLog("Electron/Main:createWindow END");
} // End electronMain
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// Startcode festlegen
electron_1.app.on('ready', electronMain);
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', function () {
    writeLog("Electron/Main:window-all-closed");
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        writeLog("Electron/Main:activate");
        electronMain();
    }
});
process.on('uncaughtException', function (err) {
    writeLog("!!!uncaughtException", err);
    var options = {
        title: "Leider ist ein Fehler aufgetreten",
        type: 'info',
        buttons: ['YES', 'NO'],
        message: err.stack,
        detail: 'Soll die Anwendung fortgesetzt werden?'
    };
    var w = electron_1.BrowserWindow.getFocusedWindow();
    var e = electron_1.dialog.showMessageBoxSync(w, options);
    console.log(e);
    if (e === 1) {
        electron_1.app.exit(); //process.crash();
    }
});
function writeLog(logtext, obj) {
    if (obj)
        console.log(logtext, obj);
    else
        console.log(logtext);
    if (!logfile)
        return;
    var logtext2 = moment().format("DD.MM.YYYY HH:mm:ss") + ": " + logtext + "\r\n";
    if (obj)
        logtext += JSON.stringify(obj, null, 1);
    var logfilepath = path.join(electron_1.app.getPath("documents"), logfile);
    fs.appendFile(logfilepath, logtext2, function (err) {
        if (err)
            throw err;
    });
}
