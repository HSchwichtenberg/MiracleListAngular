import {Title} from '@angular/platform-browser';
import {Component, OnInit, NgZone, HostListener} from '@angular/core';
// Dienste
import {MiracleListProxy} from '../Services/MiracleListProxy';
import {CommunicationService} from '../Services/CommunicationService'
// für Modalfenster
import {ViewContainerRef} from '@angular/core';
import {Overlay} from 'angular2-modal';
import {Modal} from 'angular2-modal/plugins/bootstrap';

// MomentJS
import * as moment from 'moment';

// Importe für Electron
// sind hier nicht, sondern in typings.d.ts weil 
// import { remote, ipcRenderer }  from "electron"; // geht nicht. FEHLER: fs.existsSync is not a function vgl. http://stackoverflow.com/questions/41785295/fs-module-fails-when-integrating-electron-into-angular-project
declare var Notification: any;

@Component({
 selector: 'Start',
 templateUrl: './Start.component.html'
})

export class StartComponent implements OnInit {

 constructor(private miracleListProxy: MiracleListProxy, public communicationService: CommunicationService, overlay: Overlay, vcr: ViewContainerRef, public modal: Modal, private titleService: Title, private zone: NgZone, private title: Title) {
  overlay.defaultViewContainer = vcr;
   this.calcSizeInfo(window.screen.width);
  console.log("StartComponent:ctor", typeof electron, this.communicationService.getElectronEnv());
 }

 ngOnInit() {
  console.log("======= StartComponent:ngOnInit");
  console.log("Anwendung: " + this.communicationService.GetPackage().name);
  console.log("Version: " + this.communicationService.GetPackage().version + " vom " + this.communicationService.GetPackage().date);
  console.log("Sprache: " + (<any>moment().localeData())._abbr);
  console.log("StartComponent:ngOnInit", typeof electron, this.communicationService.getElectronEnv());

  // Serverstatus ermitteln
  this.miracleListProxy.version().subscribe(x=>
   {
    this.serverStatus = "Server v" + x + " verfügbar!";
   }, x=> { this.serverStatus = "Server NICHT verfügbar!" });

  // Electron-IPC-Events behandeln
  if (typeof electron != "undefined") {
   this.title.setTitle("MiracleList-Desktop-Client v" + this.communicationService.getElectronEnv().appversion + " auf " + this.communicationService.getElectronEnv().os);

   console.log("!!!! Registriere mehrere electron-Event-Handler...");
   electron.ipcRenderer.on('about', (event, data) => {
    this.zone.run(() => {  // Ohne zone.run() geht Angular-Change-Tracking nicht mehr! siehe http://stackoverflow.com/questions/41254904/angular-2-change-detection-breaks-down-with-electron
     console.log("!!! Nachricht von MAIN-Prozess geht ein", event, data);
     this.about();
    });

   });
   electron.ipcRenderer.on('logout', (event, data) => {
    this.zone.run(() => { 
     console.log("!!! Nachricht von MAIN-Prozess geht ein", event, data);
     this.logout();
    });
   });
   electron.ipcRenderer.on('export-reply', (event, data) => {
    this.zone.run(() => {
     console.log("!!! Nachricht von MAIN-Prozess geht ein", event, data);
     alert(data);
    });
   });
  }
 }

 async export() {
  let categorySet = await this.miracleListProxy.categorySet(this.communicationService.token).toPromise();
  console.log("Export", categorySet);
  electron.ipcRenderer.send("export", categorySet);
 }


 get isLoggedIn(): boolean {
  return (this.communicationService.username != null && this.communicationService.username != "")
 }

sizeInfo : string;
public serverStatus = "...lade...";

@HostListener('window:resize', ['$event'])
onResize(event) {
 this.calcSizeInfo(event.target.innerWidth);
}

calcSizeInfo(width : number)
{
 var size = width;
 var sizeName = "";

  switch (true) {
   case (size >= 1170): sizeName = "lg"; break;
   case (size >= 970): sizeName = "md"; break;
   case (size >= 750): sizeName = "sm"; break;
   default: sizeName = "xs"; break;
  }

 this.sizeInfo =  size +  "px (" + sizeName + ")";
}

mainpage()
{
 if (!this.communicationService.isElectron()) // geht so nicht in Electron
  {
 console.log("GOTO mainpage");
 window.location.reload();
  }
  else
   {
    // TODO: fehlt noch siehe https://github.com/electron/electron/blob/master/docs/api/app.md
   }
 // this.communicationService.EmitTaskDetailCloseEvent(null);
}

 about() {
  console.log(this.modal);
  this.modal.alert()
   .size('lg')
   .showClose(true)
   .title('Über die Anwendung MiracleList')
   .body(`
            <h4>Dies ist eine Beispielanwendung für eine  Cross-Platform-Anwendung auf Basis einer Single-Page-Webapplication (SPA). MiracleList dient der Aufgabenverwaltung.</h4>
            <div>Autor: Dr. Holger Schwichtenberg, <a href="http://www.IT-Visions.de">www.IT-Visions.de</a></div>
            <div>Version: ${this.communicationService.GetPackage().version} vom ${this.communicationService.GetPackage().date}</div>
    
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
            </ul>
            <h5>Systeminfo:</h5>
            <ul>
                <li>Angemelderter Benutzer: ${this.isLoggedIn ? this.communicationService.username + " (Token:" + this.communicationService.token + ")" : ""}</li>
                <li>Browser: ${navigator.userAgent}</li>
                     <li>Bildschirmauflösung: ${window.innerWidth}x${window.innerHeight}</li>
                <li>Electron-Version: ${this.communicationService.getElectronEnvString()}</li>
                <li>Cordova-Version: ${this.communicationService.getCordovaEnvString()}</li>
                <li>Spracheinstellungen: Anwendung: ${(<any>moment().localeData())._abbr + " / Browser: " + window.navigator.language}</li>
            </ul>`
   )
   .open();
 }

 logout() { // Abmelden wird sowohl von Webseite als auch Electron gerufen
  console.log("logout");
  this.miracleListProxy.logoff(this.communicationService.token).subscribe(x => {
   console.log("logoff: OK!")
   this.communicationService.token = "";
   this.communicationService.username = "";
   this.titleService.setTitle("MiracleListClient");
   this.communicationService.navigate(""); // Anmeldeansicht aufrufen
  
   // HTML5 Notification API (NICHT das Electron-API, soll ja auch in normaler Webseite laufen!)
   if (Notification.permission !== "granted")
    {
    Notification.requestPermission();
    }
 
   let myNotification = new Notification('MiracleList', {
     title: "MiracleList",
    icon: "./assets/MiracleListLogo_ohneText.jpg",
    body: 'Sie wurden abgemeldet!'
   })
  

  });

 }
}