/**
 * Created by HS on 28.02.2017.
 */

/**
 * Hilfsklasse, die Menübaum erstellt
 */
export class MiracleListAppMenu {
// Menü erstellen
 public static CreateMenu(app : Electron.App, win: Electron.BrowserWindow): Electron.MenuItemOptions[] {
  let contents = win.webContents;
  // Menü setzen
  const menuTemplate: Electron.MenuItemOptions = [{
   label: 'Anwendung',
   submenu: [{
    label: 'Über diese Anwendung',
    click: () => {
     console.log("Sende nachricht...");
     contents.send('about', {msg: 'nachricht'});
     console.log("Sende nachricht ENDE");
     // console.log(options.message);
    }
   },
    {
     label: 'Abmelden',
     click: () => {
      contents.send('logout', {msg: ''});
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
      click: function (item, focusedWindow) {
       if (focusedWindow) {
        focusedWindow.toggleDevTools();
       }
      }
     }
    ]
   } // Ende View Menü

  ];

  return menuTemplate;
 }
}
