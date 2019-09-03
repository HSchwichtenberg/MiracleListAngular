"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var electron_2 = require("electron");
var electron_3 = require("electron");
/**
 * Hilfsklasse, die Menübaum für Tray-Menü erstellt
 */
var MiracleListTrayMenu = /** @class */ (function () {
    function MiracleListTrayMenu() {
    }
    MiracleListTrayMenu.CreateMenu = function (win, env) {
        var contextMenu = electron_3.Menu.buildFromTemplate([
            {
                label: 'Über diese Anwendung', click: function () {
                    var options = {
                        type: 'info',
                        title: 'Cross-Plattform-Desktop-Variante der Beispielanwendung MiracleList',
                        buttons: ['Ok'],
                        message: 'Autor: Dr. Holger Schwichtenberg, www.IT-Visions.de\nDetails siehe Anwendungsmenü!\nSysteminformationen: ' + JSON.stringify(env, null, 4) + ''
                    };
                    electron_2.dialog.showMessageBoxSync(options);
                }
            },
            {
                label: 'Verstecken', click: function () { win.minimize(); }
            },
            {
                label: 'Wiederherstellen', click: function () { win.restore(); }
            },
            {
                label: 'Maximieren', click: function () { win.maximize(); }
            },
            {
                label: 'Abmelden', click: function () { win.webContents.send('logout', { msg: '' }); }
            },
            {
                label: 'Beenden', click: function () { electron_1.app.quit(); }
            },
        ]);
        return contextMenu;
    };
    return MiracleListTrayMenu;
}());
exports.MiracleListTrayMenu = MiracleListTrayMenu;
