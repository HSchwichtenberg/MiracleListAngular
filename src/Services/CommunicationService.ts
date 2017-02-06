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

 // Ereignisauslösung
 EmitTaskListUpdateEvent(t: Task) {
  this.TaskListUpdateEvent.emit(t);
 }

 // Daten der Benutzeranmeldung
 public username: string = "";
 public token: string = "dev2";
}