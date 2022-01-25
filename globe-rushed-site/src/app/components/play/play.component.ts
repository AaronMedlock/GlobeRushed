import { apiKey } from './../../../environments/environment';
import { LocationsService } from './../../services/locations.service';
import { DialogBoxService } from './../../services/dialog-box.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import randomStreetView from 'random-streetview';
import { min } from 'rxjs';
import { stringify } from 'querystring';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  // Google API
  @ViewChild(GoogleMap) map!: GoogleMap;
  geocoder = new google.maps.Geocoder();

  // General Assets
  logoUrl = 'assets/grlogo.svg';
  demoimg = 'assets/demoimg.jpg';

  // Game Assets
  answerA: string = "Somewhere";
  answerB: string = "Somewhere";
  answerC: string = "Somewhere";
  answerD: string = "Somewhere";
  allLocations;
  correctLocation;
  streetView;
  answersContainer;

  @ViewChild("gametimersvg") gametimersvg: ElementRef;
  @ViewChild("gameTimerCountdown") gameTimerCountdown: ElementRef;
  gameTimeRemaining:number = 10;


  constructor(private dialogBoxService: DialogBoxService,
              private locationService: LocationsService) { }

  ngOnInit(): void {  }


  ngAfterViewInit(){

    // Set up locations
    this.allLocations = this.locationService.getGameRoundLocations();
    this.correctLocation = this.allLocations[Math.floor(Math.random() * 4)];

    // Set up street view map
    const streetView = this.map.getStreetView();
    streetView.setOptions({
        position: { lat: this.correctLocation["lat"], lng: this.correctLocation["lng"] },
        enableCloseButton: false,
        addressControl: false,
        fullscreenControl: false
     });

     // Add map to the page
     streetView.setVisible(true);

     this.generateGameOptions();

    // Display dialog box asking if game should be started or stopped
    this.gametimersvg.nativeElement.classList = "gameStarting";
    this.dialogBoxService.generateGameDialogBox(
      '<h3>How do I play?</h3>'
     + '<i class="fas fa-gamepad" style="background: linear-gradient(#EDAE41, #D7476D);background-clip: text; -webkit-background-clip: text; color: transparent; -webkit-text-fill-color: transparent; font-size: 50px;"></i>'
     + '<p>1.) Take a look around.<br/>2.) Figure out where you are<br/>3.) Choose one of the options before time runs out.</p>',
     this.gameTimerCountdown,
     this.gametimersvg
    );
 }




 generateGameOptions() {
  let char = 'A';
  this.allLocations.forEach((loc) => {
    console.log(loc);

    this.geocoder.geocode({ location: loc },  (results, status) =>{
    if (status !== google.maps.GeocoderStatus.OK) {
        console.log("NOT OKAY");
    }
    // This is checking to see if the Geoeode Status is OK before proceeding
    if (status == google.maps.GeocoderStatus.OK) {
      let addressCity ="", addressCounty= "", addressState="", addressCountry="";

      results[0].address_components.forEach((data) => {
          if(data.types.includes('locality')){
            addressCity = data.long_name;
          } else if(data.types.includes('administrative_area_level_1')){
            addressState =  data.long_name;
          } else if(data.types.includes('administrative_area_level_2')){
            addressCounty = data.long_name;
          } else if(data.types.includes('country')){
            addressCountry =  data.long_name;
          }
        });

          const answerButtonId = "answer" + char;
          document.getElementById(answerButtonId).innerHTML = "&nbsp;<b>"+char+"</b>&nbsp;&nbsp;";
          if(addressCity){
            document.getElementById(answerButtonId).innerHTML +=  `${addressCity}, `;
          } else {
            document.getElementById(answerButtonId).innerHTML += `${addressState}, `;
          }
          document.getElementById(answerButtonId).innerHTML += `  ${addressCountry}`;
          char = String.fromCharCode(char.charCodeAt(0) + 1);
          }
      });
    });
  }
}
