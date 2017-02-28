import { app, BrowserWindow, Menu, dialog, ipcMain, Tray, screen } from "electron";
import {MiracleListMenu} from "./MiracleListMenu";

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: Electron.BrowserWindow;

function createWindow() {

    // Create the electron browser window
    console.log("!!!Electron/Main:createWindow");
    const {width, height} = screen.getPrimaryDisplay().workAreaSize
    console.log("Screen:" + width + "x" + height );
    console.log("Path:" + __dirname);
    win = new BrowserWindow({
        width: 900,
        height: 600,
        icon: path.join(__dirname, 'favicon.ico'),
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }

    });

    (<any>win).version = process.versions['electron'];

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    let contents = win.webContents;


    // TODO: new Tray: https://github.com/electron/electron/blob/master/docs/api/tray.md
    // TODO: Globaler Shortcut: https://github.com/electron/electron/blob/master/docs/api/global-shortcut.md

    // // =================== Tray setzen

    let tray = null;

    tray = new Tray(path.join(__dirname, 'favicon.ico'));
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio' },
        { label: 'Item3', type: 'radio', checked: true },
        { label: 'Item4', type: 'radio' }
    ])
    tray.setToolTip('MiracleList');
    tray.setContextMenu(contextMenu);

    // =================== Anwendungsmenü einbinden
    var menuTemplate = MiracleListMenu.CreateMenu(app, win);
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    // Open the DevTools.
    win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });

    console.log("Electron/Main:createWindow END");
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
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
        console.log("Electron/Main:activate");
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

