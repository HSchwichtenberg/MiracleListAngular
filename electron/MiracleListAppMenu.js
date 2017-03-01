"use strict";
class MiracleListAppMenu {
    static CreateMenu(app, win) {
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
                    {
                        label: 'Abmelden',
                        click: () => {
                            contents.send('logout', { msg: '' });
                        }
                    },
                    {
                        label: 'Beenden',
                        click: () => {
                            app.quit();
                        }
                    }
                ]
            },
            {
                label: 'Bearbeiten',
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
                label: 'Ansicht',
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
        return menuTemplate;
    }
}
exports.MiracleListAppMenu = MiracleListAppMenu;
//# sourceMappingURL=MiracleListAppMenu.js.map