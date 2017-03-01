# MiracleListClient

 <h4>Dies ist eine Beispielanwendung für eine Cross-Platform-Anwendung auf Basis einer Single-Page-Webapplication (SPA). MiracleList dient der Aufgabenverwaltung.</h4>
            <div>Autor: Dr. Holger Schwichtenberg, <a href="http://www.IT-Visions.de">www.IT-Visions.de</a></div>
            <div>Version: 0.6.0-Beta1 vom 01.03.2017</div>
            <h5>Webadressen:</h5>
            <ul>
                <li>Backend: <a href="https://miraclelistbackend.azurewebsites.net">https://miraclelistbackend.azurewebsites.net</a></li>
                <li>Web-Frontend: <a href="http://www.miraclelist.net">http://www.miraclelist.net</a></li>
                <li>Windows-Client: <a href="https://Miraclelist.azurewebsites.net/download/MiracleListElectron-win32-x64.rar">https://Miraclelist.azurewebsites.net/download/MiracleListElectron-win32-x64.rar</a></li>
                <!--<li>MacOS-Client: <a href="https://Miraclelist.azurewebsites.net/download/MiracleListElectron-darwin-x64.rar">https://Miraclelist.azurewebsites.net/download/MiracleListElectron-darwin-x64.rar</a></li>-->
                <li>Linux-Client: <a href="https://Miraclelist.azurewebsites.net/download/MiracleListElectron-linux-x64.rar">https://Miraclelist.azurewebsites.net/download/MiracleListElectron-linux-x64.rar</a></li>
                <li>Quellcode Frontend: <a href="https://github.com/HSchwichtenberg/MiracleListClient">https://github.com/HSchwichtenberg/MiracleListClient</a></li>
            </ul>
            <h5>Eingesetzte Techniken:</h5>
            <ul>
                <li>Backend: .NET Core, C#, ASP.NET Core WebAPI, Entity Framework Core, SQL Azure, Azure Web App, Swagger</li>
                <li>Frontend: HTML, CSS, TypeScript, Angular, Bootstrap, MomentJS, angular2-moment, angular2-contextmenu, angular2-modal</li>
            </ul></h5>
             <h5>Versionsgeschichte:</h5>
            <ul>
                <li>0.1: Basisversion mit Aufgaben anlegen und bearbeiten</li>
                <li>0.2: Benutzerverwaltung, Kategorien verwalten</li>
                <li>0.3: Suchfunktion, fällige Aufgaben</li>
                <li>0.4: Aufwand als Zusatzeigenschaft</li>
                <li>0.5: Electron-Client</li>
                <li>0.6: Cordova-Client, Aufgaben sind sortierbar</li>
</ul>

--------------------------------------------------------
# Package Restore

Die notwendigen NPM-Module (ca. 500 MB) sind nicht enthalten. Sie müssen diese mit `npm install` wiederherstellen!

Dieser Befehl muss 2x ausgeführt werden
- im Hauptverzeichnis
- im Verzeichnis /electron für die speziellen Node-Pakete für electron

--------------------------------------------------------

# Hilfe zum Electron-Client

Übersetzen und starten: `npm run w-electron` (w für Windows, m für Mac)

Pakete erstellen: `npm run w-electron-deployallprod`

--------------------------------------------------------

# Hilfe zum Cordova-Client

Angular-Webanwendung ins www-Verzeichnis von Cordova übersetzen: `npm run build-cordova` 

Platform hinzufügen: `cordova platform add android` usw.
Übersetzen: `cordova build android` usw.

--------------------------------------------------------
# Es folgt die Original-Readme-Datei von Angular-CLI

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.24.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

ng build --target=production --environment=prod

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
