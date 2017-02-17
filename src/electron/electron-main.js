"use strict";
const electron_1 = require("electron");
const path = require('path');
const url = require('url');
let win;
function createWindow() {
    console.log("!!!Electron/Main:createWindow");
    console.log("Path=" + __dirname);
    win = new electron_1.BrowserWindow({
        width: 1000,
        height: 800,
        icon: path.join(__dirname, 'favicon.ico'),
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    win.version = process.versions['electron'];
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    let contents = win.webContents;
    const menuTemplate = [{
            label: 'Anwendung',
            submenu: [{
                    label: 'Über diese Anwendung',
                    click: () => {
                        console.log("Sende nachricht...");
                        contents.send('about', { msg: 'nachricht' });
                        console.log("Sende nachricht ENDE");
                    }
                },
                { label: 'Beenden',
                    click: () => {
                        electron_1.app.quit();
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [{
                    label: 'Undo',
                    accelerator: 'CmdOrCtrl+Z',
                    role: 'undo'
                }, {
                    label: 'Redo',
                    accelerator: 'Shift+CmdOrCtrl+Z',
                    role: 'redo'
                }, {
                    type: 'separator'
                }, {
                    label: 'Cut',
                    accelerator: 'CmdOrCtrl+X',
                    role: 'cut'
                }, {
                    label: 'Copy',
                    accelerator: 'CmdOrCtrl+C',
                    role: 'copy'
                }, {
                    label: 'Paste',
                    accelerator: 'CmdOrCtrl+V',
                    role: 'paste'
                }, {
                    label: 'Select All',
                    accelerator: 'CmdOrCtrl+A',
                    role: 'selectall'
                }]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Zwischem Vollbildmodus und normalen Modus wechseln. ',
                    accelerator: (function () {
                        if (process.platform === 'darwin') {
                            return 'Ctrl+Command+F';
                        }
                        else {
                            return 'F11';
                        }
                    })(),
                    click: function (item, focusedWindow) {
                        if (focusedWindow) {
                            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                        }
                    }
                }, {
                    label: 'Developer Tools Ein-/Ausblenden',
                    accelerator: (function () {
                        if (process.platform === 'darwin') {
                            return 'Alt+Command+I';
                        }
                        else {
                            return 'F12';
                        }
                    })(),
                    click: function (item, focusedWindow) {
                        if (focusedWindow) {
                            focusedWindow.toggleDevTools();
                        }
                    }
                }
            ]
        }
    ];
    const menu = electron_1.Menu.buildFromTemplate(menuTemplate);
    electron_1.Menu.setApplicationMenu(menu);
    win.on('closed', () => {
        win = null;
    });
    console.log("Electron/Main:createWindow END");
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (win === null) {
        console.log("Electron/Main:activate");
        createWindow();
    }
});
//# sourceMappingURL=electron-main.js.map