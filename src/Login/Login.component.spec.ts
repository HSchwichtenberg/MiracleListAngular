
 // ========================= Hilfsfunktionen für Testen
import { TestBed, inject, async, fakeAsync } from '@angular/core/testing';
import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';
import { tick } from '@angular/core/testing';
import * as $ from 'jquery'
import { By }              from '@angular/platform-browser';

 // ========================= Notwendige DI für den zu testenden Code

// Angular-Typen
import { Observable } from 'rxjs/Observable';
import { Injectable, Inject, Optional, OpaqueToken, LOCALE_ID } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestOptionsArgs, XHRBackend, BaseRequestOptions, ConnectionBackend } from '@angular/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location, CommonModule } from '@angular/common';
import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Proxy
import { MiracleListProxy } from '../Services/MiracleListProxy';
// MomentJS
import * as moment from 'moment';
import 'moment/locale/de';

import { MomentModule } from 'angular2-moment/moment.module';

// Eigene Pipes
import { LineBreakPipe } from "../Util/LineBreakPipe"
import { ImportancePipe } from "../Util/ImportancePipe"
// Kontextmenü (Angular-Modul)
import { ContextMenuModule } from '../Util/angular2-contextmenu/angular2-contextmenu';
// Datetime-Direktive
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

// eigene Komponenten
import { LoginComponent } from '../Login/Login.Component'
import { AppComponent } from './../app/app.component';
// Routing
import { Router } from '@angular/router'
import { RoutingModule } from '../Util/RoutingModule'

// Kommunikation
import { CommunicationService } from '../Services/CommunicationService'

describe('a Login component', () => {
	let component: LoginComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ // Komponenten und Pipes
			AppComponent,	LoginComponent, ImportancePipe, LineBreakPipe
			],
			imports: [ // Angular-Module
				CommonModule, BrowserModule, FormsModule,
				HttpModule, ContextMenuModule, MomentModule, NKDatetimeModule, RouterTestingModule.withRoutes([
					{ path: 'app', component: AppComponent }
				])
			],
			providers: [ // Services / Dependency Injection 
				LoginComponent, MiracleListProxy, CommunicationService, { provide: LOCALE_ID, useValue: 'de-DE' }, Http, ConnectionBackend
			]
		});
	});



	// instantiation through framework injection
	beforeEach(inject([LoginComponent], (LoginComponent) => {
		component = LoginComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});

	it('should create the app', async(() => {
  let fixture = TestBed.createComponent(LoginComponent);
  let comp = fixture.debugElement.componentInstance;
  expect(comp).toBeTruthy();
  }));

	it('should render Benutzername', async(() => {
		let fixture = TestBed.createComponent(LoginComponent);
		fixture.detectChanges();
		let compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('.panel-body').textContent).toContain('Benutzername');
	}));


	it('should have h2 Benutzeranmeldung', () => {
		let fixture = TestBed.createComponent(LoginComponent);
		 expect($('h2')).toHaveText('Benutzeranmeldung');
	});



it('it should update with valueChanges', fakeAsync(() => {
    var testwert1 = 'Mein Name';
				var testwert2 = 'Mein Kennwort';
				const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    tick();
    expect(fixture.componentInstance.name).toEqual(undefined);
				expect(fixture.componentInstance.password).toEqual(undefined);

    const input1 = fixture.debugElement.query(By.css('#name')).nativeElement; // CSS Selector (https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Selectors)
    input1.value = testwert1;

			 const input2 = fixture.debugElement.query(By.css('#password')).nativeElement; 
    input2.value = testwert2;

				console.log(input1);
				console.log(input2);
    dispatchEvent(input1, 'input');
		  dispatchEvent(input2, 'input');
    tick();

    expect(fixture.componentInstance.name).toEqual(testwert1);
				expect(fixture.componentInstance.password).toEqual(testwert2);
  }));


// 		it('should render Textbox', async(() => {
// 		let fixture = TestBed.createComponent(LoginComponent);
// 		fixture.detectChanges();
// 		let comp = fixture.componentInstance;
//    comp.name = "test";
// 		fixture.detectChanges();
// 		let compiled = fixture.debugElement.nativeElement;

// console.log($("h2").text());
//  expect($('h2')).toHaveText('Benutzeranmeldung');

// console.log($("h2").text());

// 		// var de = fixture.debugElement.query("#name");
//   // var  el = de.nativeElement;

// 		console.log("#name:" +  comp.name +":" + ($('input#name2').val()));
// 		 expect($('#name2')).toHaveValue('test');
// 		 expect($('#password')).toHaveValue('')
// 	}));

});