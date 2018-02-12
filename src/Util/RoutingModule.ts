
// Angular Library-Importe
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Eigene Module
import { TaskEditComponent } from "../TaskEdit/TaskEdit.Component";
import { TaskViewComponent } from "../TaskView/TaskView.Component";
import { LoginComponent } from "../Login/Login.Component";
import { AppComponent } from "../app/app.component";
// import { PlaygroundComponent } from './../playground/playground.component';
// import { TaskTableComponent } from '../TaskTable/TaskTable.component';

// URLs festlegen
const routes: Routes = [
 { path: '', component: LoginComponent },
 { path: 'app', component: AppComponent,
  children: [
   { path: 'taskview/:id', component: TaskViewComponent, outlet: "column3" },
   { path: 'taskedit/:id', component: TaskEditComponent, outlet: "column3" }
  ]
 }
 // ,
 //  { path: 'test', component: PlaygroundComponent  }, // ohne Parameter zuerst!
 //  { path: 'test/:id1/:id2/:id3', component: PlaygroundComponent  }
 // { path: 'table', component: TaskTableComponent },
];

@NgModule({
 imports: [RouterModule.forRoot(routes,{ enableTracing: false})], // forRoot == Routing für das Hauptmodul
 exports: [RouterModule]
})
export class RoutingModule {

}
