// Angular-Standardkomponenten
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core'; 

/// Hilfsklasse für Angular ab Version 2.0
@Injectable()
export class ITV_AngularUtil {

 /// empfängt HTTP-Dienst per DI
 constructor(private http: Http) {
 }

 public GetHttp(url: string) {
  // Daten von HTTP-Dienst laden
  console.log("GetHttp: " + url);
  return this.http
   .get(url)
   .map(resp => { console.log("GetHttp: OK!"); return resp.json() })
   .catch((error: any) => {
    console.log("!!! GetHttp:Fehler", error);
    return Observable.throw(error.json().error || 'Server error');
   })
 }

 public PostHttp(url: string, body) {
  // Daten zum HTTP-Dienst senden
  console.log("PostHttp: " + url);
  return this.http
   .post(url, body)
   .map(resp => { console.log("PostHttp: OK!"); return resp.json() })
   .catch((error: any) => {
    console.log("!!! PostHttp:Fehler", error);
    return Observable.throw(error.json().error || 'Server error');
   })
 }
}