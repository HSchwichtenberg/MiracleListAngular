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
 public username: string = "test";
 public token: string = "test";

 GetPackage() : any
 {
  // Versionsnummer auslesen
  return require('../../package.json');
 }
 // Liefert das vom Electron Main Prozess übergebe env-Objekt
  getElectronEnv(): any {
  if (! this.isElectron()) return "n/a";
  let env = (<any>electron.remote.getCurrentWindow()).env;
  return env;
 }

 isElectron() : boolean
 {
  try{
   return  electron !== undefined;
 }
 catch(ex)
 {
 return false;
 }
 }

getElectronEnvString(): string {
 if (!this.isElectron()) return "n/a";
  let env = this.getElectronEnv();
  return (env.AppVersion + " auf " + env.OS);
 }

 isCordova() : boolean
 {
   console.log("--> Cordova=",(<any>window).cordova);
   return ((<any>window).cordova !== undefined);
 }

  getCordovaEnvString(): string {
   if (!this.isCordova()) return "n/a";
   let cordova = window.cordova;
   let device = window.device;
   return (cordova.version + " auf " + device.platform + " " 
   + device.version + " (" + device.manufacturer + " " 
   + device.model + ")");
 }
}
