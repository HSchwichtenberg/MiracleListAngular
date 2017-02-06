import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Task, SubTask } from '../Services/MiracleListProxy';
import { MiracleListProxy } from '../Services/MiracleListProxy';

// Kommunikation
import { CommunicationService } from "../Services/CommunicationService"

@Component({
 selector: 'SubTaskList',
 templateUrl: './SubTaskList.component.html'
})

export class SubTaskListComponent implements OnInit {

 constructor(private miracleListProxy: MiracleListProxy, private communicationService: CommunicationService) {
  console.log("======= SubTaskList:Constructor", this.task);
 }

 ngOnInit() {
  // Startaktion
  console.log("======= SubTaskList:ngOnInit", this.task);
 }

 @Input()
 public task: Task;

 @Output()
 subTaskListChangedEvent = new EventEmitter();

 private newSubTaskTitle: string;

 createSubTask() {
  let st = new SubTask();
  st.subTaskID = 0;
  st.title = this.newSubTaskTitle;
  st.created = new Date();
  st.done = false;
  st.taskID = 0;
  this.task.subTaskSet.push(st);
  this.changeTask();
 }

 changeTask() {
  this.miracleListProxy.changeTask(this.communicationService.token, this.task).subscribe(
   x => {
    console.log("!!!Task GEÄNDERT", x)
    this.task = x;
    this.newSubTaskTitle = "";
    this.subTaskListChangedEvent.emit(this.task);
   });
 }

 removeSubTask(st: SubTask) {
  console.log("Subtask LÖSCHEN", st)
  let index = this.task.subTaskSet.indexOf(st);
  this.task.subTaskSet.splice(index, 1);
  this.miracleListProxy.changeTask(this.communicationService.token, this.task).subscribe(
   x => {
    console.log("Subtask GELÖSCHT", st)
    this.subTaskListChangedEvent.emit(this.task);
   });
 }
}