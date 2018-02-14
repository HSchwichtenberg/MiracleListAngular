import { LoginComponent } from "./Login.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement, NgZone } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';
import { MiracleListProxy } from "Services/MiracleListProxy";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { CommunicationService } from "Services/CommunicationService";
import { Router } from "@angular/router";
import { RoutingModule } from "Util/RoutingModule";
import { AppModule } from "app.module";
import { APP_BASE_HREF } from "@angular/common";
// Das sind bisher nur Dummy-Tests. Siehe https://angular.io/guide/testing


export function CommunicationServiceFactory(router: Router, zone: NgZone)
{ return new CommunicationService(router, zone); }

describe('AppComponent Test', () => {

 let comp:    LoginComponent;
 let fixture: ComponentFixture<LoginComponent>;
 let de:      DebugElement;
 let el:      HTMLElement;
 beforeEach(() => {
   TestBed.configureTestingModule({
     declarations: [ LoginComponent  ], // declare the test component
     imports: [AppModule, FormsModule, RoutingModule], // used Angular Modules
     providers: [ // Services / Dependency Injection
      MiracleListProxy, HttpClient, HttpHandler, {
       provide: CommunicationService,
       useFactory: CommunicationServiceFactory,
       deps: [Router, NgZone]
      }, {provide: APP_BASE_HREF, useValue : '/' }] 
   });

   fixture = TestBed.createComponent(LoginComponent);

   comp = fixture.componentInstance; // BannerComponent test instance

   // query for the title <h1> by CSS element selector

 });

 it('should display title', () => {
  fixture.detectChanges();
   el = fixture.debugElement.query(By.css('h2')).nativeElement;
  expect(el.textContent).toContain("Benutzeranmeldung");
 });

 it('should name and password be empty', () => {
  fixture.detectChanges();
  var tb1 = fixture.debugElement.query(By.css('#name')).nativeElement;
  expect(tb1.value).toEqual("");
  var tb2 = fixture.debugElement.query(By.css('#password')).nativeElement;
  expect(tb2.value).toEqual("");
 });

 it('should missing name cause error', () => {
  checkError("test","");
 });

 it('should missing password cause error', () => {
  checkError("","test");
 });

 function checkError(name:string, password:string)
 {
  fixture.detectChanges();
  comp.name = name;
  comp.password = password;
  comp.login();
  fixture.detectChanges();
  var errorMsg = fixture.debugElement.query(By.css('#errorMsg')).nativeElement;
  expect(errorMsg.textContent).toContain("Benutzername und Kennwort müssen ausgefüllt sein!");
 }


});


