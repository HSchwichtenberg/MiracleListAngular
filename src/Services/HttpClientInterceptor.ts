// Interceptor für HttpClient zum Injizieren des Authentifizierungstokens
// läuft ab Angular 4.3 für HttpClient-Dienst
// https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { CommunicationService } from './CommunicationService';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  constructor(public communicationService: CommunicationService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

   // console.log("HTTP from ", request.url);
   request = request.clone({
    // url: request.url.replace("miraclelistbackend",this.communicationService.GetURL())
    });

   if (this.communicationService.token)
    {
     console.log("********* HttpInterceptor: Token injiziert: " + this.communicationService.token);
    request = request.clone({
      setHeaders: {
        "ML-AuthToken": `${this.communicationService.token}`
      }
    });
   }
   console.log("********* HttpInterceptor: Kein Token!");
    return next.handle(request);
  }
}
