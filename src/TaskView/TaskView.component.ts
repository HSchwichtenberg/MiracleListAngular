
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Task } from '../Services//MiracleListProxy';
import { MiracleListProxy } from '../Services/MiracleListProxy';
import { CommunicationService } from "../Services/CommunicationService"

@Component({
 selector: 'TaskView',
 templateUrl: './TaskView.component.html'
})

export class TaskViewComponent implements OnInit {
 constructor(private miracleListProxy: MiracleListProxy,
  private communicationService: CommunicationService,   private route: ActivatedRoute,
  ) {
  console.log("======= TaskViewComponent:Constructor");
 }

 ngOnInit() {
  console.log("======= TaskViewComponent:ngOnInit");
  // Routenparameter verarbeiten
  this.route.params.forEach((params: Params) => {
   let id = +params['id'];
   this.getTask(id);

  });
 }

 private task: Task;

 getTask(id: number) {
  console.log("TaskView:Task LADEN...", id)
  this.miracleListProxy.task(this.communicationService.token, id).subscribe(
   x => {
    this.task = x;
    console.log("TaskView:Task GELADEN", x)
    // informiere nun die übergeordnete Komponente über den aktuellen Task
    // wichtig, wenn direkter Ansprung per URL erfolgte
    this.communicationService.EmitTaskListUpdateEvent(this.task);
   });
 }

 gotoEdit() {
  this.communicationService.navigate(`/app/(column3:taskedit/${this.task.taskID})`); // Ansicht aufrufen
 }

 reload(obj: any) {
  this.communicationService.EmitTaskListUpdateEvent(this.task);
 }
}