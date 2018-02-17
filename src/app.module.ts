import { StatusComponent } from './Status/Status.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NgZone, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // ab 0.6.5 für angular 5
import { AppComponent } from './app/app.component';

// Proxy
import { MiracleListProxy, API_BASE_URL  } from './Services/MiracleListProxy';
import { MiracleListProxyV2, API_BASE_URL as API_BASE_URLv2 } from './Services/MiracleListProxyV2';
// MomentJS
import * as moment from 'moment';
import 'moment/locale/en-gb';

import {MomentModule} from 'angular2-moment/moment.module';

// Eigene Pipes
import {LineBreakPipe} from "./Util/LineBreakPipe"
import {ImportancePipe} from "./Util/ImportancePipe"
// Kontextmenü (Angular-Modul)
//alt: import { ContextMenuModule } from './Util/angular2-contextmenu/angular2-contextmenu';
// neu: ab 0.6.5 für angular 5 (https://github.com/isaacplmann/ngx-contextmenu)
import { ContextMenuModule } from 'ngx-contextmenu'

// Datetime-Direktive
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

// eigene Komponenten
import { TaskEditComponent } from './TaskEdit/TaskEdit.component'
import { TaskViewComponent } from './TaskView/TaskView.component'
import { SubTaskListComponent } from './SubTaskList/SubTaskList.component'
import { LoginComponent } from './Login/Login.component'
import { StartComponent } from './Start/Start.component'

// Routing
import { Router } from '@angular/router'
import { RoutingModule } from './Util/RoutingModule'

// Kommunikation
import { CommunicationService } from './Services/CommunicationService'

// Modaler Dialog (ab ab Angular 5)
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule, Modal, bootstrap4Mode } from 'ngx-modialog/plugins/bootstrap';

//Drag&Drop
import {DndModule} from 'ng2-dnd';

// Animationen (ab Angular 4.0)
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Mehrsprachigkeit
import {TranslateModule} from '@ngx-translate/core';

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

// 0.6.2-Beta1: HttpInterceptor für Token
import { LOCALE_ID } from '@angular/core';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpClientInterceptor } from './Services/HttpClientInterceptor';
import { HttpInterceptor } from "./Services/HttpInterceptor";
import { environment } from './environments/environment';
import { AppLoadService } from 'Services/AppLoadService';

// Entfernt ab 0.6.5 für Angular 5
// export function HttpInterceptorFactory(communicationService : CommunicationService, xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router)
// {
//  return new HttpInterceptor(communicationService, xhrBackend, requestOptions)
// }

export function CommunicationServiceFactory(router: Router, zone: NgZone)
{ 
return new CommunicationService(router, zone); 
}

export function init_app(appLoadService: AppLoadService) {
 return () => appLoadService.initializeApp();
}

export function get_settings(appLoadService: AppLoadService) {
 return () => appLoadService.getSettings();
}

export  function getURL()
{
 console.log("getURL: " + AppLoadService.URL);
 return AppLoadService.URL;
}

@NgModule({
  declarations: [ // Komponenten und Pipes
    AppComponent, ImportancePipe, LineBreakPipe, TaskEditComponent, TaskViewComponent, SubTaskListComponent, LoginComponent, StartComponent, StatusComponent
   // PlaygroundComponent
    //, TaskTableComponent
  ],
  imports: [ // Angular-Module
    BrowserModule, FormsModule,
    ContextMenuModule.forRoot(), MomentModule, NKDatetimeModule, RoutingModule, ModalModule.forRoot(), BootstrapModalModule, BrowserAnimationsModule,     DndModule.forRoot()
    ,HttpClientModule // ab 0.6.5 für Angular 5
    ,TranslateModule.forRoot() // ab 0.6.6 für Übersetzung
    //GridModule
  ],
  providers: [ // Services / Dependency Injection
   AppLoadService,
   { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true },
   { provide: APP_INITIALIZER, useFactory: get_settings, deps: [AppLoadService], multi: true },
  //   { provide: API_BASE_URL, useValue: environment.API_BASE_URL}, // Wert für Token aus Einstellung holen
  // { provide: API_BASE_URLv2, useValue: environment.API_BASE_URL}, // Wert für Token aus Einstellung holen
    
    { provide: API_BASE_URL, useValue: getURL}, // Wert für Token aus Konfiguration holen
    { provide: API_BASE_URLv2, useFactory:  getURL}, // Wert für Token aus Konfiguration holen
   MiracleListProxy, MiracleListProxyV2, HttpClientModule,
   { provide: LOCALE_ID, useValue: 'de-DE' },
   { // HttpInterceptor für HttpClient. wird ab 0.6.5 für Angular 5 benötigt, da MiracleListProxy HttpClient-Dienst nun verwendet
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true
    },
   {
    provide: CommunicationService,
    useFactory: CommunicationServiceFactory,
    deps: [Router, NgZone, HttpClient]
   },
    // { bis 0.6.5 für Angular < 5
    //  provide: Http,
    //  useFactory: HttpInterceptorFactory,
    //  deps: [CommunicationService, XHRBackend, RequestOptions]
    // },
    //i18n
    { provide: LOCALE_ID, useValue: 'en' }
  ],
  exports: [LoginComponent],

   bootstrap: [StartComponent] // Startkomponente


})
export class AppModule {

public static baseUrl = "";

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
