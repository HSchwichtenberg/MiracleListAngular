import { Overlay } from 'angular2-modal';
import { MiracleListProxyV2 } from './../Services/MiracleListProxyV2';
import { MiracleListProxy } from './../Services/MiracleListProxy';
import { CommunicationService } from './../Services/CommunicationService';
import { Component, OnInit, ViewContainerRef, HostListener } from '@angular/core';
import * as moment from "moment";

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

 constructor(private miracleListProxy: MiracleListProxy, private miracleListProxyV2: MiracleListProxyV2, public communicationService: CommunicationService,  overlay: Overlay, vcr: ViewContainerRef) {
  overlay.defaultViewContainer = vcr;
  this.calcSizeInfo(window.screen.width);
 this.getServerStatus();



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
  let intervall  = 10000;
  // console.log("getServerStatus...");
   // Serverstatus ermitteln
   this.miracleListProxyV2.about().subscribe(x=>
    {
     this.serverAvailable = true;
     this.serverStatusDetails = x;
     this.serverStatus =  "Server verfügbar!";
    }, x=> { this.serverStatus = "Server NICHT verfügbar!"; this.serverStatusDetails = x;
    this.serverAvailable = false;
    intervall = 5000; });
console.log(this.serverStatusDetails);
     // alle x Sekunden aktualisieren
 setTimeout(() => {
  this.getServerStatus();
   },intervall);
 }



calcSizeInfo(width : number)
{
 var size = width;
 var sizeName = "";

  switch (true) {
   case (size >= 1170): sizeName = "lg"; break;
   case (size >= 970): sizeName = "md"; break;
   case (size >= 750): sizeName = "sm"; break;
   default: sizeName = "xs"; break;
  }

 this.sizeInfo =  size +  "px (" + sizeName + ")";
}

}
