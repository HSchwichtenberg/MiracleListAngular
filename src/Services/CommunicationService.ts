import { Task } from './MiracleListProxy';
import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class CommunicationService {

 constructor(private router: Router, private zone: NgZone, )
 {
  console.log("==== CommunicationService");
 }

 // Client-Navigation per Router
 public navigate(url: string) {
  this.router.navigateByUrl(url);
 }

 // Ereignis für Ereigniskonsumenten
 TaskListUpdateEvent = new EventEmitter();
 TaskDetailCloseEvent = new EventEmitter();

 // Ereignisauslösung
 EmitTaskListUpdateEvent(t: Task) {
  this.TaskListUpdateEvent.emit(t);
 }

  // Ereignisauslösung
 EmitTaskDetailCloseEvent(t: Task) {
  this.TaskDetailCloseEvent.emit(t);
 }

 // Daten der Benutzeranmeldung
 public username: string = "Holger Schwichtenberg";
 public token: string = "feee0475-2125-4764-a2f9-c301c87742ec";

 GetPackage() : any
 {
  // Versionsnummer auslesen
  return require('../../package.json');
 }
 // Liefert das vom Electron Main Prozess übergebe env-Objekt
  getElectronEnv(): any {
  if (typeof electron == "undefined") return "n/a";
  var env = (<any>electron.remote.getCurrentWindow()).env;
  return env;
 }

 isElectron() : boolean
 {
  return (electron != undefined);
 }

getElectronEnvString(): string {
 if (!this.isElectron()) return "n/a";
  var env = this.getElectronEnv();
  return (env.ElectronVersion + " auf " + env.OS);
 }

 isCordova() : boolean
 {
   console.log("--> Cordova=",(<any>window).device);
   return ((<any>window).device != undefined);
 }

  getCordovaEnvString(): string {
   if (!this.isCordova()) return "n/a";
   var env = (<any>window).device;
   return (env.version + " auf " + env.platform);
 }
}
