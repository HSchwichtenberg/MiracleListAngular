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
    var name = "API_BASE_URL";
    AppLoadService.URL =environment[name];
    console.log(`GetConfig: ${name} aus Environment=${   AppLoadService.URL}`);
    const promise = this.httpClient.get('assets/settings.json')
      .toPromise()
      .then(settings => {
        console.log(`Settings from API: `, settings);


        AppLoadService.URL = settings[name];
        console.log(`GetConfig: ${name} aus Config=${AppLoadService.URL}`);
      
        console.log(`APP_SETTINGS: `, settings);
 
        return settings;
      }).catch(function(e) {  return null });
      // .finally(
      //  function() {  
      //   if (!baseURL){
      //    baseURL = environment["name"];
      //    console.log(`GetConfig: ${name} aus Environment=${baseURL}`);
      //    }
      //    AppLoadService.URL = baseURL;
      //   }
      // );
 
    return promise;
  }
}