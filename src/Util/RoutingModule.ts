
// Angular Library-Importe
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Eigene Module
import { TaskEditComponent } from "../TaskEdit/TaskEdit.Component"
import { TaskViewComponent } from "../TaskView/TaskView.Component"
import { LoginComponent } from "../Login/Login.Component"
import { AppComponent } from "../app/app.component"
// import { PlaygroundComponent } from './../playground/playground.component';
// import { TaskTableComponent } from '../TaskTable/TaskTable.component';

// URLs festlegen
const routes: Routes = [
 { path: '', component: LoginComponent },
 // { path: 'test', component: PlaygroundComponent },
 // { path: 'table', component: TaskTableComponent },
 { path: 'app', component: AppComponent,
  children: [
   { path: 'taskview/:id', component: TaskViewComponent, outlet: "column3" },
   { path: 'taskedit/:id', component: TaskEditComponent, outlet: "column3" }
  ]
 }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class RoutingModule {

}