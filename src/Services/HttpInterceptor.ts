// HttpInterceptor für Http zum Injizieren des Authentifizierungstokens durch Ableiten von der Http-Klasse
// für die MiracleListProxy-Klasse, die NSwagGenerator erzeugt
// Diese Klasse HttpInterceptor wird dann in app.module.ts per DI anstelle von Http verwendet
// läuft ab Angular 2.0 
// https://scotch.io/@kashyapmukkamala/using-http-interceptor-with-angular2

import { CommunicationService } from './CommunicationService';
import { Injectable } from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class HttpInterceptor extends Http {
 constructor(private communicationService: CommunicationService, backend: ConnectionBackend, defaultOptions: RequestOptions) {
  super(backend, defaultOptions);
 }

 request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
  // console.log("---------> request");
  return super.request(url, this.getRequestOptionArgs(options));
 }

 get(url: string, options?: RequestOptionsArgs): Observable<Response> {
  url = this.updateUrl(url);
  // console.log("---------> get");
  return super.get(url, this.getRequestOptionArgs(options));
 }

 post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
  url = this.updateUrl(url);
  return super.post(url, body, this.getRequestOptionArgs(options));
 }

 put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
  url = this.updateUrl(url);
  return super.put(url, body, this.getRequestOptionArgs(options));
 }

 delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
  url = this.updateUrl(url);
  return super.delete(url, this.getRequestOptionArgs(options));
 }

 // keine Funktion aktuell. Könnte aber die Url verändern :-)
 private updateUrl(req: string) {
  req = req.replace("miraclelistbackend",this.communicationService.GetURL())
  return req;
 }

 // Erweitert die http-Anfrage um Token
 private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {

  if (options == null) {
   options = new RequestOptions();
  }
  if (options.headers == null) {
   options.headers = new Headers();
  }

  if (this.communicationService.token) {
   // console.log("********* HttpInterceptor: Token injiziert: " + this.communicationService.token);
   options.headers.set('ML-AuthToken', this.communicationService.token);
  }
  else {
   // console.log("********* HttpInterceptor: Kein Token!");
  }

  return options;
 }
}