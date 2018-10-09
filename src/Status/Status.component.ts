
import { MiracleListProxyV2, API_BASE_URL } from './../Services/MiracleListProxyV2';
import { MiracleListProxy } from './../Services/MiracleListProxy';
import { CommunicationService } from './../Services/CommunicationService';
import { Component, OnInit, ViewContainerRef, HostListener, Inject } from '@angular/core';
import * as moment from "moment";
import { AppLoadService } from 'Services/AppLoadService';

@Component({
	selector: 'Status',
	templateUrl: 'Status.component.html'
})

export class StatusComponent implements OnInit {
 sizeInfo: string;
 serverStatusDetails: any;
 serverAvailable?: boolean = null;
 serverStatus: string = "...lädt...";
 currentTime: string;
 serverStatusCount: number = 0;
 public released = "";

 constructor(private miracleListProxy: MiracleListProxy, private miracleListProxyV2: MiracleListProxyV2, public communicationService: CommunicationService,  @Inject(API_BASE_URL) public baseUrl) {
  this.serverStatus = "Verbindungsaufbau zu " + this.baseUrl + "...";
  this.calcSizeInfo(window.screen.width);
  this.getServerStatus();
console.log("Released", AppLoadService.Settings, AppLoadService.Settings["ReleaseDate"]);
  if (AppLoadService.Settings["ReleaseDate"])
  {
  this.released = " / Released: "+ AppLoadService.Settings["ReleaseDate"];
  }

 }
 ngOnInit() { }

// Reaktion auf Fenstergrößenänderung
 @HostListener('window:resize', ['$event'])
 onResize(event) {
  this.calcSizeInfo(event.target.innerWidth);
 }

 get isLoggedIn(): boolean {
  return (this.communicationService.username != null && this.communicationService.username !== "")
 }

 getServerStatus()
 {
  this.currentTime = moment().format('LTS');
  this.serverStatusCount++;
  let intervall  = 10000;
  // console.log("getServerStatus...");
   // Serverstatus ermitteln
   this.miracleListProxyV2.about().subscribe(x=>
    {
     this.serverAvailable = true;
     this.serverStatusDetails = this.baseUrl + ": " + x;
     this.serverStatus =  "Server OK!";
    }, x=> { this.serverStatus = "Server " + this.baseUrl + ": NICHT verfügbar!"; this.serverStatusDetails = this.baseUrl + ": " + x;
    this.serverAvailable = false;
    intervall = 5000; });

console.log("Serverstatus #" + this.serverStatusCount +":", this.baseUrl + ": " + this.serverStatusDetails);
     // alle x Sekunden aktualisieren
 // setTimeout(() => {
 //  this.getServerStatus();
 //   },intervall);
 }

calcSizeInfo(width : number)
{
 let size = width;
 let sizeName = "";

  switch (true) {
   case (size >= 1170): sizeName = "lg"; break;
   case (size >= 970): sizeName = "md"; break;
   case (size >= 750): sizeName = "sm"; break;
   default: sizeName = "xs"; break;
  }

 this.sizeInfo =  size +  "px (" + sizeName + ")";
}

}
