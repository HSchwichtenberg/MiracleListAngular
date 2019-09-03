"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var os = require('os');
var path = require('path');
var fs = require('fs');
/**
 * Hilfsklasse, die Menübaum für Hauptmenü erstellt
 */
var MiracleListAppMenu = /** @class */ (function () {
    function MiracleListAppMenu() {
    }
    // Menü erstellen
    MiracleListAppMenu.CreateMenu = function (win, env) {
        var menuTemplate = [{
                label: 'App',
                submenu: [{
                        label: 'Über diese Anwendung',
                        accelerator: 'CmdOrCtrl+I',
                        click: function () {
                            win.webContents.send('about', { env: env });
                        }
                    },
                    {
                        label: 'Systeminfo',
                        accelerator: 'CmdOrCtrl+S',
                        click: function () {
                            var options = {
                                title: "Systeminfo",
                                type: 'info',
                                buttons: ['OK'],
                                message: JSON.stringify(env, null, 1)
                            };
                            electron_1.dialog.showMessageBox(win, options);
                        }
                    },
                    {
                        label: 'Website miraclelist.de',
                        accelerator: 'CmdOrCtrl+W',
                        click: function () {
                            electron_1.shell.openExternal('http://www.miraclelist.de');
                        }
                    },
                    {
                        label: 'Drucken',
                        accelerator: 'CmdOrCtrl+D',
                        click: function () {
                            var pdfPath = path.join(os.tmpdir(), 'print.pdf');
                            win.webContents.printToPDF({}, function (error, data) {
                                if (error)
                                    throw error;
                                fs.writeFile(pdfPath, data, function (err) {
                                    if (err) {
                                        throw err;
                                    }
                                    electron_1.shell.openExternal('file://' + pdfPath);
                                });
                            });
                        }
                    },
                    {
                        label: 'Fehler (zum Test)',
                        click: function () {
                            throw new Error('Dies ist nur ein Testfehler');
                        }
                    },
                    {
                        label: 'Abmelden',
                        click: function () {
                            win.webContents.send('logout', { msg: '' });
                        }
                    },
                    {
                        label: 'Beenden',
                        click: function () {
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
                        label: 'Ausschneiden',
                        accelerator: 'CmdOrCtrl+X',
                        role: 'cut'
                    }, {
                        label: 'Kopieren',
                        accelerator: 'CmdOrCtrl+C',
                        role: 'copy'
                    }, {
                        label: 'Einfügen',
                        accelerator: 'CmdOrCtrl+V',
                        role: 'paste'
                    }
                    // Problem mit electron 6.0.x
                    // , {
                    //  label: 'Alles auswählen',
                    //  accelerator: 'CmdOrCtrl+A',
                    //  role: 'selectall'
                    // }
                ]
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
                    },
                    {
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
                                focusedWindow.webContents.toggleDevTools();
                                require('devtron').install();
                            }
                        }
                    },
                    {
                        label: 'Dokumente anzeigen',
                        accelerator: (function () {
                            if (process.platform === 'darwin') {
                                return 'Ctrl+Command+D';
                            }
                            else {
                                return 'F11';
                            }
                        })(),
                        click: function (item, focusedWindow) {
                            if (focusedWindow) {
                                console.log("Öffne Ordner", electron_1.app.getPath("documents"));
                                electron_1.shell.showItemInFolder(electron_1.app.getPath("documents") + "/xy");
                            }
                        }
                    },
                ]
            } // Ende View Menü
        ];
        return menuTemplate;
    };
    return MiracleListAppMenu;
}());
exports.MiracleListAppMenu = MiracleListAppMenu;
