"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_2 = require("electron");
const electron_3 = require("electron");
class MiracleListTrayMenu {
    static CreateMenu(win, env) {
        const contextMenu = electron_3.Menu.buildFromTemplate([
            {
                label: 'Über diese Anwendung', click: () => {
                    const options = {
                        type: 'info',
                        title: 'Cross-Plattform-Desktop-Variante der Beispielanwendung MiracleList',
                        buttons: ['Ok'],
                        message: '(C) Dr. Holger Schwichtenberg, www.IT-Visions.de\nDetails siehe Anwendungsmenü!\nSysteminformationen: ' + JSON.stringify(env, null, 4) + ''
                    };
                    electron_2.dialog.showMessageBox(options, function () { });
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
                label: 'Beenden', click: () => { electron_1.app.quit(); }
            },
        ]);
        return contextMenu;
    }
}
exports.MiracleListTrayMenu = MiracleListTrayMenu;
//# sourceMappingURL=electron-traymenu.js.map