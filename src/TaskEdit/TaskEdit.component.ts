import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Task } from '../Services/MiracleListProxy';
import { MiracleListProxy } from '../Services/MiracleListProxy';
import { CommunicationService } from "../Services/CommunicationService"

// Animationen
import { slideToTop, slideToLeft, slideToRight, slideToBottom } from '../Util/RouterAnimations';

@Component({
 selector: 'TaskEdit',
 templateUrl: './TaskEdit.component.html',
 styleUrls:[ './TaskEdit.component.css'],
 animations: [slideToLeft()],
 host: { '[@routerTransition]': '' }
})
export class TaskEditComponent  implements OnInit {
 constructor(private miracleListProxy: MiracleListProxy,
  private router: Router,
  private route: ActivatedRoute,
  private communicationService: CommunicationService) {
 }


  ngOnInit() {
  this.route.params.forEach((params: Params) => {
   let id = +params['id'];
   this.getTask(id);
 
  });
 }

 @Input()
 public task: Task;


 getTask(id: number) {
  console.log("TaskEdit:Task LADEN...", id)
  this.miracleListProxy.task(this.communicationService.token, id).subscribe(
   x => {
    this.task = x;
    console.log("TaskEdit:Task GELADEN", x)
   });
 }

 reload($x) {
  console.log("RELOAD!", $x);
  this.communicationService.EmitTaskListUpdateEvent(this.task);
 }

 cancel() {
  this.gotoView();
 }

 submit(form: NgForm) {
  if (form.invalid) return;
  console.log("Task ÄNDERN", this.task);
  this.miracleListProxy.changeTask(this.communicationService.token, this.task).subscribe(
   x => {
    console.log("Task GEÄNDERT", x)
    this.gotoView();
   });
 }

 private gotoView() {
  this.communicationService.navigate(`/app/(column3:taskview/${this.task.taskID})`); // Ansicht aufrufen
  this.communicationService.EmitTaskListUpdateEvent(this.task);
 }
}