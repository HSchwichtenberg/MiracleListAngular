import { Task } from './MiracleListProxy';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class CommunicationService {

 constructor(private router: Router)
 { }

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
 public username: string = "";
 public token: string = "dev2";

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
 
getElectronEnvString(): string {
 if (!this.isElectron()) return "n/a";
  var env = this.getElectronEnv();
  return (env.version + " auf " + env.os);
 }

 isCordova() : boolean
 {
  return (typeof (<any>window).device != "undefined");
 }

 isElectron() : boolean
 {
  return (typeof electron != "undefined");
 }

  getCordovaEnvString(): string {
   if (!this.isCordova()) return "n/a";
   var env = (<any>window).device;
   return (env.version + " auf " + env.platform);
 }
}