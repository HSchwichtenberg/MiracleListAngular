
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app/app.component';

// Proxy
import { MiracleListProxy } from './Services/MiracleListProxy';
// MomentJS
import * as moment from 'moment';
import 'moment/locale/de';

import {MomentModule} from 'angular2-moment/moment.module';

// Eigene Pipes
import {LineBreakPipe} from "./Util/LineBreakPipe"
import {ImportancePipe} from "./Util/ImportancePipe"
// Kontextmenü (Angular-Modul)
import { ContextMenuModule } from './Util/angular2-contextmenu/angular2-contextmenu';
// Datetime-Direktive
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

// eigene Komponenten
import { TaskEditComponent } from './TaskEdit/TaskEdit.Component'
import { TaskViewComponent } from './TaskView/TaskView.Component'
import { SubTaskListComponent } from './SubTaskList/SubTaskList.Component'
import { LoginComponent } from './Login/Login.Component'
import { StartComponent } from './Start/Start.Component'

// Routing
import { Router } from '@angular/router'
import { RoutingModule } from './Util/RoutingModule'

// Kommunikation
import { CommunicationService } from './Services/CommunicationService'

// Modaler Dialog
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

//Drag&Drop
import {DndModule} from 'ng2-dnd';

// // Sonstiges
//import { PlaygroundComponent } from './playground/playground.component';

// // KendoUI Grid
// import { GridModule } from '@progress/kendo-angular-grid';
// import { TaskTableComponent } from './TaskTable/TaskTable.component';
// import { load } from '@telerik/kendo-intl';
// load(
//    //supplemental data
//    require(`cldr-data/supplemental/likelySubtags.json`),
//    require(`cldr-data/supplemental/weekData.json`),
//    require(`cldr-data/supplemental/currencyData.json`),

//    //locale data
//    require(`cldr-data/main/de/numbers.json`),
//    require(`cldr-data/main/de/currencies.json`),
//    require(`cldr-data/main/de/ca-gregorian.json`),
//    require(`cldr-data/main/de/timeZoneNames.json`)
// );

import { LOCALE_ID } from '@angular/core';

@NgModule({
  declarations: [ // Komponenten und Pipes
    AppComponent, ImportancePipe, LineBreakPipe, TaskEditComponent, TaskViewComponent, SubTaskListComponent, LoginComponent,StartComponent
   // PlaygroundComponent
    //, TaskTableComponent
  ],
  imports: [ // Angular-Module
    BrowserModule, FormsModule,
    HttpModule, ContextMenuModule, MomentModule, NKDatetimeModule, RoutingModule, ModalModule.forRoot(), BootstrapModalModule,     DndModule.forRoot()
    //GridModule
  ],
  providers: [ // Services / Dependency Injection
   MiracleListProxy, CommunicationService, { provide: LOCALE_ID, useValue: 'de-DE' }],
  bootstrap: [StartComponent] // Startkomponente

})
export class AppModule {

/**
 *
 */
constructor() {

 // Sprache für momentJS auf aktuelle Browsersprache setzen
 // moment.locale(window.navigator.language);
 // oder feste Sprache:
 moment.locale("de-de");

}

}
