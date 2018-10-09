import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';

@Injectable()
export class AppLoadService {

 public static Settings :any;
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
   const filename = 'assets/appsettings.json';

    console.log(`getSettings: loading ${filename}...`);

   // AppLoadService.URL =environment[name];
   // console.log(`GetConfig: ${name} aus Environment=${AppLoadService.URL}`);
    const promise = this.httpClient.get('assets/appsettings.json')
      .toPromise()
      .then(settings => {
       console.log(`getSettings: loaded`, settings);
       // copy to static member!
        AppLoadService.Settings = JSON.parse(JSON.stringify(settings));
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
