import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';
 
@Injectable()
export class AppLoadService {
 
 public static URL : string = "";
  constructor(private httpClient: HttpClient) { }
 
  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
          console.log(`initializeApp:: inside promise`);
 
          setTimeout(() => {
            console.log(`initializeApp:: inside setTimeout`);
            // doing something
 
            resolve();
          }, 3000);
        });
  }
 
  getSettings(): Promise<any> {
    console.log(`getSettings:: before http.get call`);
    
    const promise = this.httpClient.get('assets/config.json')
      .toPromise()
      .then(settings => {
        console.log(`Settings from API: `, settings);

  var name = "API_BASE_URL";
       var  baseURL = settings[name];
        console.log(`GetConfig: ${name} aus Config=${baseURL}`);
        if (!baseURL){
        baseURL = environment["name"];
        console.log(`GetConfig: ${name} aus Environment=${baseURL}`);
        }
        AppLoadService.URL = baseURL;
        console.log(`APP_SETTINGS: `,  AppLoadService.URL);
 
        return settings;
      });
 
    return promise;
  }
}