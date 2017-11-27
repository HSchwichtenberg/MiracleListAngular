import { app, dialog } from 'electron';
/**
 * Hilfsklasse, die Menübaum für Hauptmenü erstellt
 */
export class MiracleListAppMenu {
// Menü erstellen
 public static CreateMenu(win: Electron.BrowserWindow, env: any): Electron.MenuItemConstructorOptions[] {
  const menuTemplate: Electron.MenuItemConstructorOptions[] = [{
   label: 'Anwendung',
   submenu: [{
    label: 'Über diese Anwendung',
    click: () => {
     win.webContents.send('about', {env: env});
    }
   },
    {
     label: 'Systeminfo',
     click: () => {
      var options: Electron.MessageBoxOptions = {
       title: "Systeminfo",
       type: 'info',
       buttons: ['OK'],
       message: JSON.stringify(env, null, 1),
      };
      dialog.showMessageBox(win, options);
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
    win.webContents.send('logout', {msg: ''});
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
   } // Ende Edit Menü
   ,
   {
    label: 'Ansicht',
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
       } else {
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
       } else {
        return 'F12';
       }
      })(),
      click: function (item, focusedWindow: Electron.BrowserWindow) {
       if (focusedWindow) {
        focusedWindow.webContents.toggleDevTools();
        require('devtron').install()
       }
      }
     }
    ]
   } // Ende View Menü

  ];

  return menuTemplate;
 }
}
