"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const os = require('os');
const path = require('path');
const fs = require('fs');
class MiracleListAppMenu {
    static CreateMenu(win, env) {
        const menuTemplate = [{
                label: 'App',
                submenu: [{
                        label: 'Über diese Anwendung',
                        accelerator: 'CmdOrCtrl+I',
                        click: () => {
                            win.webContents.send('about', { env: env });
                        }
                    },
                    {
                        label: 'Systeminfo',
                        accelerator: 'CmdOrCtrl+S',
                        click: () => {
                            let options = {
                                title: "Systeminfo",
                                type: 'info',
                                buttons: ['OK'],
                                message: JSON.stringify(env, null, 1),
                            };
                            electron_1.dialog.showMessageBox(win, options);
                        }
                    },
                    {
                        label: 'Website miraclelist.de',
                        accelerator: 'CmdOrCtrl+W',
                        click: () => {
                            electron_1.shell.openExternal('http://www.miraclelist.de');
                        }
                    },
                    {
                        label: 'Drucken',
                        accelerator: 'CmdOrCtrl+D',
                        click: () => {
                            const pdfPath = path.join(os.tmpdir(), 'print.pdf');
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
                        click: () => {
                            throw new Error('Dies ist nur ein Testfehler');
                        }
                    },
                    {
                        label: 'Abmelden',
                        click: () => {
                            win.webContents.send('logout', { msg: '' });
                        }
                    },
                    {
                        label: 'Beenden',
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
                    }, {
                        label: 'Alles auswählen',
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
            }
        ];
        return menuTemplate;
    }
}
exports.MiracleListAppMenu = MiracleListAppMenu;
//# sourceMappingURL=electron-appmenu.js.map