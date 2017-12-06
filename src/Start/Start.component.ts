import { Title } from "@angular/platform-browser";
import { Component, OnInit, NgZone, HostListener } from "@angular/core";
// Dienste
import { MiracleListProxy } from "../Services/MiracleListProxy";
import { MiracleListProxyV2 } from "../Services/MiracleListProxyV2";
import { CommunicationService } from "../Services/CommunicationService";
// für Modalfenster
import { Modal } from "angular2-modal/plugins/bootstrap";

// MomentJS
import * as moment from "moment";
import { get } from "https";

// Importe für Electron
// sind hier nicht, sondern in typings.d.ts denn: import { remote, ipcRenderer }  from "electron"; geht nicht: FEHLER: fs.existsSync is not a function vgl. http://stackoverflow.com/questions/41785295/fs-module-fails-when-integrating-electron-into-angular-project
declare var Notification: any;

@Component({
  selector: "Start",
  templateUrl: "./Start.component.html"
})
export class StartComponent implements OnInit {
  constructor(
    private miracleListProxy: MiracleListProxy,
    private miracleListProxyV2: MiracleListProxyV2,
    public communicationService: CommunicationService,
    public modal: Modal,
    private titleService: Title,
    private zone: NgZone,
    private title: Title
  ) {
    console.log(
      "StartComponent:ctor",
      typeof electron,
      this.communicationService.getElectronEnv()
    );
  }

  ngOnInit() {
    console.log("======= StartComponent:ngOnInit");
    console.log("Anwendung: " + this.communicationService.GetPackage().name);
    console.log(
      "Version: " +
        this.communicationService.GetPackage().version +
        " vom " +
        this.communicationService.GetPackage().date
    );
    console.log("Sprache: " + (<any>moment().localeData())._abbr);
    console.log(
      "StartComponent:ngOnInit",
      typeof electron,
      this.communicationService.getElectronEnv()
    );
    console.log("Electron?: " + this.isElectron);
    console.log("Cordova?: " + this.isCordovaApp + "/" + this.isCordovaApp2);
    console.log("URL: " + document.URL);

    // ============= Electron-IPC-Events behandeln
    if (typeof electron !== "undefined") {
      this.title.setTitle(
        "MiracleList-Desktop-Client mit Electron v" +
          this.communicationService.getElectronEnvString()
      );

      console.log("!!!! Registriere mehrere electron-Event-Handler...");
      electron.ipcRenderer.on("about", (event: string, data: any) => {
        this.zone.run(() => {
          // Ohne zone.run() geht Angular-Change-Tracking nicht mehr! siehe https://github.com/angular/zone.js/issues/537
          console.log("!!! Nachricht von MAIN-Prozess geht ein", event, data);
          this.about();
        });
      });
      electron.ipcRenderer.on("logout", (event: string, data: any) => {
        this.zone.run(() => {
          console.log("!!! Nachricht von MAIN-Prozess geht ein", event, data);
          this.logout();
        });
      });
      electron.ipcRenderer.on("export-reply", (event: string, data: any) => {
        this.zone.run(() => {
          console.log("!!! Nachricht von MAIN-Prozess geht ein", event, data);
          alert("Export gespeichert in: " + data);
        });
      });
    }
  }

  async export() {
    if (!(this.isElectron || this.isCordovaApp)) return;
    // Daten für den Export vom Server einlesen
    let categorySet = await this.miracleListProxy
      .categorySet(this.communicationService.token)
      .toPromise();
    console.log("Starte Export", categorySet);

    if (this.isElectron) {
     // ========= Export für Electron -> Nachricht an Main Process
      electron.ipcRenderer.send("export", categorySet);
    }
    if (this.isCordovaApp)
    {  // ========= Export für Cordova mit Plug-In "File"
    let inhalt : string = JSON.stringify(categorySet);
    try {
     const filename = "miraclelistexport.txt";
     let path = cordova.file.documentsDirectory; // das geht auf Windows, iOS u.a.
     if (window.device.platform === 'Android') path = cordova.file.dataDirectory;
     window.resolveLocalFileSystemURL(path,
         (dirEntry : DirectoryEntry) => {
           dirEntry.getFile(filename, { create: true }, (fileEntry : FileEntry) => {
            console.log("Speichern in Datei:", fileEntry);
             fileEntry.createWriter((fileWriter : FileWriter) => {
               fileWriter.seek(fileWriter.length);
               let blob : Blob = new Blob([inhalt], { type: "text/plain" });
               fileWriter.write(blob); // Text speichern
               fileEntry.file( function (file: File) { // Metadaten lesen
                alert("Export gespeichert in Datei :" + fileEntry.nativeURL + " vom: " + (new Date(file.lastModifiedDate)) + " Größe: " + file.size + " im Ordner: " + dirEntry.nativeURL); });
             }, (err: FileError) => { alert("Fehler beim Exportieren: " + err.code); })
           });  // end getFile
         }); // end resolveLocalFileSystemURL
     } catch (error ) {
      alert("Fehler beim Exportieren: " + error.name + ":"  +error.messsage)
     }
    } // end isCordovaApp
   } // end export()

ReadExportFile()
{
 try {
  let root = cordova.file.documentsDirectory; // das geht auf Windows, iOS u.a.
  if (window.device.platform === 'Android') root = cordova.file.dataDirectory;

  window.resolveLocalFileSystemURL(root,
          (dir : DirectoryEntry) => {
                  dir.getFile("miraclelistexport", { create: true }, (file : FileEntry) => {
                file.file(function (f : File) {
                let reader = new FileReader();

                        reader.onloadend = function() {
                            console.log("Successful file read: " + this.result);
                           alert("Datei :" + file.nativeURL + " vom: " + (new Date(f.lastModifiedDate)) + " Größe: " + f.size + " im Ordner: " + dir.nativeURL + " Inhalt: " + this.result);
                        };

                        reader.readAsText(f);
                       },(err: FileError) => { alert("Fehler beim Lesen: " + err.code); });

              }, (err: FileError) => { alert("Fehler beim Exportieren: " + err.code); })
            });

       } catch (error ) {

        alert("Fehler beim Importieren: " + error.name + ":"  +error.messsage)
       }
      }

  get isElectron(): boolean {
    try {
      return electron !== undefined;
    } catch (ex) {
      return false;
    }
  }

  get isCordovaApp(): boolean {
    return (<any>window).isCordovaApp;
  }

  get isCordovaApp2(): boolean {
    try {
      return (<any>window).cordova !== undefined;
    } catch (ex) {
      return false;
    }
  }

  get isLoggedIn(): boolean {
    return (
      this.communicationService.username != null &&
      this.communicationService.username !== ""
    );
  }

  mainpage() {
    if (!this.communicationService.isElectron()) {
      // geht so nicht in Electron
      console.log("GOTO mainpage");
      window.location.reload();
    } else {
      // TODO: fehlt noch siehe https://github.com/electron/electron/blob/master/docs/api/app.md
    }
    // this.communicationService.EmitTaskDetailCloseEvent(null);
  }

  crash() {
    alert(
      "Diese Funktion bringt jetzt gleich zum Test den Browser zum Absturz!"
    );
    for (let i = 0; i === i; i++) {}
  }

  exit() {
    if (this.communicationService.isCordova) {
      (<any>navigator).app.exitApp();
    // navigator.app.exitApp(); // geht nur, wenn man die  "..MiracleListClient\node_modules\@types\cordova\index.d.ts"  erweitert um
                              // interface Navigator {
                              //     app: {
                              //         exitApp: () => any;
                              //     }
                              // }
     }
    // if (this.communicationService.isElectron) { app.quit(); }
  }

  about() {
    console.log(this.modal);
    this.modal
      .alert()
      .size("lg")
      .showClose(true)
      .title("Über die Anwendung MiracleList")
      .body(
        `
            <h4>Dies ist eine Beispielanwendung für eine  Cross-Platform-Anwendung auf Basis einer Single-Page-Webapplication (SPA). MiracleList dient der Aufgabenverwaltung.</h4>
            <div>Autor: Dr. Holger Schwichtenberg, <a href="http://www.IT-Visions.de">www.IT-Visions.de</a></div>
            <div>Version: ${
              this.communicationService.GetPackage().version
            } vom ${this.communicationService.GetPackage().date}</div>

            <h5>Webadressen:</h5>
            <ul>
              <li>Backend: <a href="https://miraclelistbackend.azurewebsites.net">https://miraclelistbackend.azurewebsites.net</a></li>
                <li>Web-Frontend: <a href="http://www.miraclelist.net">http://www.miraclelist.net</a></li>
                <li>Windows-Client: <a href="https://Miraclelist.azurewebsites.net/download/MiracleListElectron-win32-x64.rar">https://Miraclelist.azurewebsites.net/download/MiracleListElectron-win32-x64.rar</a></li>
                <li>MacOS-Client: <a href="https://Miraclelist.azurewebsites.net/download/MiracleListElectron-darwin-x64.zip">https://Miraclelist.azurewebsites.net/download/MiracleListElectron-darwin-x64.zip</a></li>
                <li>Linux-Client: <a href="https://Miraclelist.azurewebsites.net/download/MiracleListElectron-linux-x64.rar">https://Miraclelist.azurewebsites.net/download/MiracleListElectron-linux-x64.rar</a></li>
                <li>Quellcode Frontend: <a href="https://github.com/HSchwichtenberg/MiracleListClient">https://github.com/HSchwichtenberg/MiracleListClient</a></li>
            </ul>
            <h5>Eingesetzte Techniken:</h5>
            <ul>
                <li>Backend: .NET Core, C#, ASP.NET Core WebAPI, Entity Framework Core, SQL Azure, Azure Web App, Swagger</li>
                <li>Frontend: HTML, CSS, TypeScript, Angular, Bootstrap, MomentJS, angular2-moment, angular2-contextmenu, angular2-modal, Electron, Cordova</li>
            </ul></h5>
            <h5>Versionsgeschichte:</h5>
            <ul>
                <li>0.1: Basisversion mit Aufgaben anlegen und bearbeiten</li>
                <li>0.2: Benutzerverwaltung, Kategorien verwalten</li>
                <li>0.3: Suchfunktion, fällige Aufgaben</li>
                <li>0.4: Aufwand zu einer Aufgabe erfassbar</li>
                <li>0.5: Electron-Client</li>
                <li>0.6: Cordova-Client, Aufgaben sind sortierbar</li>
                <li>0.6.1: Verbesserte Navigation auf kleinen Displays</li>
                <li>0.6.2: Umstellung auf API v2 mit HttpInjector</li>
                <li>0.6.3: Ständige Aktualisierung des Server-Status, zusätzliche Menüpunkt in Electron-App</li>
            </ul>
            <h5>Systeminfo:</h5>
            <ul>
                <li>Angemelderter Benutzer: ${
                  this.isLoggedIn
                    ? this.communicationService.username +
                      " (Token:" +
                      this.communicationService.token +
                      ")"
                    : ""
                }</li>
                <li>Browser: ${navigator.userAgent}</li>
                     <li>Bildschirmauflösung: ${window.innerWidth}x${
          window.innerHeight
        }</li>
                <li>Electron-Version: ${this.communicationService.getElectronEnvString()}</li>
                <li>Cordova-Version: ${this.communicationService.getCordovaEnvString()}</li>
                <li>Spracheinstellungen: Anwendung: ${(<any>moment().localeData())
                  ._abbr +
                  " / Browser: " +
                  window.navigator.language}</li>
            </ul>`
      )
      .open();
  }

  logout() {
    // Abmelden wird sowohl von Webseite als auch Electron gerufen
    console.log("logout");
    this.miracleListProxy
      .logoff(this.communicationService.token)
      .subscribe(x => {
        console.log("logoff: OK!");
        this.communicationService.token = "";
        this.communicationService.username = "";
        this.titleService.setTitle("MiracleListClient");
        this.communicationService.navigate(""); // Anmeldeansicht aufrufen

        // HTML5 Notification API (NICHT das Electron-API, soll ja auch in normaler Webseite laufen!)
        if (Notification.permission !== "granted") {
          Notification.requestPermission();
        }

        let myNotification = new Notification("MiracleList", {
          title: "MiracleList",
          icon: "./assets/MiracleListLogo_ohneText.jpg",
          body: "Sie wurden abgemeldet!"
        });
      });
  }
}
