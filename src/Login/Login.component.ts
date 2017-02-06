import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../Services/CommunicationService'
import { Router } from '@angular/router';
import { MiracleListProxy, LoginInfo } from '../Services/MiracleListProxy';

@Component({
 selector: 'Login',
 templateUrl: './Login.component.html'
})

export class LoginComponent implements OnInit {

 constructor(private miracleListProxy : MiracleListProxy, private communicationService: CommunicationService)
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
  li.clientID = "TODO: Ihre erhaltene ClientID";
  li.username = this.name;
  li.password = this.password;
  
  this.miracleListProxy.login(li).subscribe(x=> {

  if (x == null) {
   console.log("login NICHT ERFOLGREICH",x);
   this.errorMsg = 'Ungültige Anmeldung!';
   this.communicationService.token = "";
  }
  else {
   console.log("login ERFOLGREICH",x);
   this.communicationService.token = x.token;
   this.communicationService.username = this.name;
   this.communicationService.navigate("/app"); // Ansicht aufrufen
  }
  })
 }
}