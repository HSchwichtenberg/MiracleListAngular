import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../Services/CommunicationService'
import { Router } from '@angular/router';
import { MiracleListProxy, LoginInfo } from '../Services/MiracleListProxy';
import { Title }  from '@angular/platform-browser';
@Component({
 selector: 'Login',
 templateUrl: './Login.component.html'
})

export class LoginComponent implements OnInit {

 constructor(private miracleListProxy : MiracleListProxy, private communicationService: CommunicationService, private titleService: Title)
 {   
  //  console.log("======= LoginComponent:constructor");

}

    ngOnInit(){
  // Startaktion
  // console.log("======= LoginComponent:ngOnInit");

  }

 public name: string = "";
 public password: string;
 public errorMsg = '';

 login() {
  console.log("LOGIN",this.name, this.password);

  var li = new LoginInfo();
  li.clientID = "11111111-85f6-4079-ba87-24987637b042"; 
  //"11111111-85f6-4079-ba87-24987637b042" --> Electron
  //"11111112-85f6-4079-ba87-24987637b042" --> Web
  //TODO:"Ihre erhaltene ClientID, siehe http://miraclelistbackend.azurewebsites.net/";

  li.username = this.name;
  li.password = this.password;
  
  this.miracleListProxy.login(li).subscribe(x=> {

  if (x == null || x.message) {
   console.log("login NICHT ERFOLGREICH",x);
   this.errorMsg = x ? x.message : 'Ungültige Anmeldung!';
   this.communicationService.token = "";
  }
  else {
   console.log("login ERFOLGREICH",x);
   this.communicationService.token = x.token;
   this.communicationService.username = this.name;
   this.communicationService.navigate("/app"); // Ansicht aufrufen
   this.titleService.setTitle(`MiracleListClient [${this.name}]` );
  }
  })
 }
}