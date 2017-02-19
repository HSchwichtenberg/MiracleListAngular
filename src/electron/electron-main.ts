import { app, BrowserWindow, Menu, dialog, ipcMain }  from "electron";

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win : Electron.BrowserWindow

function createWindow() {

    // Create the electron browser window. 
    console.log("!!!Electron/Main:createWindow");
    console.log("Path=" + __dirname);
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
    }))

    let contents = win.webContents

    // Menü setzen
    const menuTemplate = [{
            label: 'Anwendung',
            submenu: [{
                    label: 'Über diese Anwendung',
                    click: () => {

                        // const options = {
                        //     type: 'info',
                        //     title: 'Desktop-Variante der Beispielanwendung MiracleList',
                        //     buttons: ['Ok'],
                        //     message: '(C) Dr. Holger Schwichtenberg 2017, Details siehe Hamburgermenü!'
                        // }
                        // dialog.showMessageBox(options, function() {})
                        console.log("Sende nachricht...");
                        contents.send('about', { msg: 'nachricht' });
                        console.log("Sende nachricht ENDE");
                        // console.log(options.message);
                    }
                },
                 {  label: 'Abmelden',
                    click: () => {
                          contents.send('logout', { msg: '' });
                    }
                },
                {  label: 'Beenden',
                    click: () => {
                        app.quit();
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
        } // Ende Edit Menü
        ,
        {
            label: 'View',
            submenu: [
                // {
                // label: 'Reload',
                // accelerator: 'CmdOrCtrl+R',
                // click: function(item, focusedWindow) {
                //     if (focusedWindow) {
                //         // on reload, start fresh and close any old
                //         // open secondary windows
                //         if (focusedWindow.id === 1) {
                //             BrowserWindow.getAllWindows().forEach(function(win) {
                //                 if (win.id > 1) {
                //                     win.close()
                //                 }
                //             })
                //         }
                //         focusedWindow.reload()
                //     }
                // }
                // }, 
                {
                    label: 'Zwischem Vollbildmodus und normalen Modus wechseln. ',
                    accelerator: (function() {
                        if (process.platform === 'darwin') {
                            return 'Ctrl+Command+F'
                        } else {
                            return 'F11'
                        }
                    })(),
                    click: function(item, focusedWindow) {
                        if (focusedWindow) {
                            focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
                        }
                    }
                }, {
                    label: 'Developer Tools Ein-/Ausblenden',
                    accelerator: (function() {
                        if (process.platform === 'darwin') {
                            return 'Alt+Command+I'
                        } else {
                            return 'F12'
                        }
                    })(),
                    click: function(item, focusedWindow) {
                        if (focusedWindow) {
                            focusedWindow.toggleDevTools()
                        }
                    }
                }
            ]
        } // Ende View Menü

    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    // Open the DevTools.
    // win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })

    console.log("Electron/Main:createWindow END");
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        console.log("Electron/Main:activate");
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.