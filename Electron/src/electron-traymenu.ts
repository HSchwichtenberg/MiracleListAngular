import { app } from 'electron';
import { dialog } from 'electron';
import { Menu } from 'electron';

/**
 * Hilfsklasse, die Menübaum für Tray-Menü erstellt
 */
export class MiracleListTrayMenu {
public static CreateMenu(win: Electron.BrowserWindow, env: any) {
  const contextMenu: Electron.Menu = Menu.buildFromTemplate([
   {
    label: 'Über diese Anwendung', click: () => {
     const options: Electron.MessageBoxOptions = {
      type: 'info',
      title: 'Cross-Plattform-Desktop-Variante der Beispielanwendung MiracleList',
      buttons: ['Ok'],
      message: 'Autor: Dr. Holger Schwichtenberg, www.IT-Visions.de\nDetails siehe Anwendungsmenü!\nSysteminformationen: ' + JSON.stringify(env, null, 4) + ''
     };
     dialog.showMessageBoxSync(options);
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
    label: 'Abmelden', click: () => { win.webContents.send('logout', { msg: '' }); }
   },
   {
    label: 'Beenden', click: () => { app.quit(); }
   },
  ]);
  return contextMenu;
 }
}
