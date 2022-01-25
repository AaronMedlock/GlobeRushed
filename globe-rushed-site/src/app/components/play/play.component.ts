import { CountdownService } from './../../services/countdown.service';
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
  answerAVal: string = "Newport United Kingdom";
  answerBVal: string = "Toledo, OH USA";
  answerCVal: string = "Fukui, Japan";
  answerDVal: string = "Reston, VA USA";
  allLocations;
  correctLocation;
  shownLocations = [];
  streetView;
  answersContainer;

  @ViewChild("gametimersvg") gametimersvg: ElementRef;
  @ViewChild("gameTimerCountdown") gameTimerCountdown: ElementRef;
  @ViewChild("answerA") answerA: ElementRef;
  @ViewChild("answerB") answerB: ElementRef;
  @ViewChild("answerC") answerC: ElementRef;
  @ViewChild("answerD") answerD: ElementRef;


  @ViewChild("gameInfoMessageBox") gameInfoMessageBox: ElementRef;
  a: number = 10;


  constructor(private dialogBoxService: DialogBoxService,
              private locationService: LocationsService,
              private countdownService: CountdownService) {
              }

  ngOnInit(): void {
  }


  ngAfterViewInit(){
    this.startNewRound();


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

 /**
  * START NEW ROUND -
  * Begin a new round of the Globe
  * Rushed game. Determine the locations,
  * create the user choices, and initialize
  * the map.
  */
startNewRound(){
  // Set the timer
  this.countdownService.resetGameTimer();

  // Set up locations
  this.allLocations = this.locationService.getGameRoundLocations();
  this.correctLocation = this.allLocations[Math.floor(Math.random() * 4)];
  console.log("DEBUGGING: Attempting round for: ");
  console.log(this.correctLocation);
  console.log("...using the options of:")
  console.log(this.allLocations);

  // Assign them to the game choices
  this.answerA.nativeElement.style.opacity = 1;
  this.answerA.nativeElement.style.pointerEvents = "auto";
  this.answerAVal = this.allLocations[0].name;
  this.answerB.nativeElement.style.opacity = 1;
  this.answerB.nativeElement.style.pointerEvents = "auto";
  this.answerBVal = this.allLocations[1].name;
  this.answerC.nativeElement.style.opacity = 1;
  this.answerC.nativeElement.style.pointerEvents = "auto";
  this.answerCVal = this.allLocations[2].name;
  this.answerD.nativeElement.style.opacity = 1;
  this.answerD.nativeElement.style.pointerEvents = "auto";
  this.answerDVal = this.allLocations[3].name;

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

}

checkAnswer(answer){
  // Hide and disable buttons
  this.answerA.nativeElement.style.opacity = 0;
  this.answerA.nativeElement.style.pointerEvents = "none";
  this.answerB.nativeElement.style.opacity = 0;
  this.answerB.nativeElement.style.pointerEvents = "none";
  this.answerC.nativeElement.style.opacity = 0;
  this.answerC.nativeElement.style.pointerEvents = "none";
  this.answerD.nativeElement.style.opacity = 0;
  this.answerD.nativeElement.style.pointerEvents = "none";


  // Inform user of win or loss
  let gameInfoMessageBox = this.gameInfoMessageBox.nativeElement;
  if(answer == this.correctLocation.name){ // Win condition
    gameInfoMessageBox.innerHTML = '<i class="fas fa-laugh-beam" style="font-size: 25px;"></i></i><br/>Way to go, Superstar!<br/>';
    gameInfoMessageBox.innerHTML += `You've gained ${this.countdownService.getGameTime() * 10} points!`;
    gameInfoMessageBox.style.background = "linear-gradient(rgb(91,226,238, 0.95),rgb(145,238,152, 0.95))";
  } else { // Lose condition
    gameInfoMessageBox.innerHTML = '<i class="far fa-frown-open" style="font-size:20px;"></i><br/>Sorry, try again!';
    gameInfoMessageBox.style.background = "linear-gradient(rgb(237, 53, 107, 0.95), rgb(251,171,22, 0.95))";
  }
  this.dialogBoxService.addSnackbar(gameInfoMessageBox, 3000, "sbright");

  // Stop the timer
  this.countdownService.stopGameTimer();

  // Start new round
  this.resetRound();



}

/**
 * RESET ROUND -
 * Reset the round after 1 second.
 */
resetRound(){
  setTimeout(() => {
    this.countdownService.gameTimer( this.gameTimerCountdown,this.gametimersvg );
    this.startNewRound();
  }, 1000);
}

 generateGameOptions() {
  let char = 'A';
  let i = 0;

  this.allLocations.forEach((loc) => {
    console.log(loc);

    this.geocoder.geocode({ location: loc },  (results, status) =>{
    if (status !== google.maps.GeocoderStatus.OK) {
        console.log("NOT OKAY");
    }
    // This is checking to see if the Geoeode Status is OK before proceeding
    if (status == google.maps.GeocoderStatus.OK) {
      let addressCity="", addressCounty= "",
          addressState="", addressCountry="";
      console.log("I'm OKAY")
      console.log(results);
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
        console.log("Looking at the result, I found: "+addressCity+" "+addressState+" "+addressCounty+" "+addressCountry)
        if(addressCountry != "" && i < 4){
          const answerButtonId = "answer" + char;
          console.log(char);
          if(addressCity){
            document.getElementById(answerButtonId).innerHTML =  `${addressCity}, `;
          } else {
            document.getElementById(answerButtonId).innerHTML = `${addressState}, `;
          }
          document.getElementById(answerButtonId).innerHTML += `  ${addressCountry}`;
          char = String.fromCharCode(char.charCodeAt(0) + 1);
          this.shownLocations.push()
          i++;
          }
        }
      });
    });
    console.log(this.shownLocations);
    this.correctLocation = this.shownLocations[Math.floor(Math.random() * this.shownLocations.length)];
    console.log("Setting correct location to: " + this.correctLocation);

        // Set up street view map
        const streetView = this.map.getStreetView();
        console.log("Setting street view!")
        streetView.setOptions({
            position: { lat: this.correctLocation["lat"], lng: this.correctLocation["lng"] },
            enableCloseButton: false,
            addressControl: false,
            fullscreenControl: false
         });

         // Add map to the page
         streetView.setVisible(true);
  }
}
