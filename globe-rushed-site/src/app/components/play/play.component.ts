import { DialogBoxService } from './../../services/dialog-box.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { apiKey } from 'src/environments/environment';
import randomStreetView from 'random-streetview';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  @ViewChild(GoogleMap) map!: GoogleMap;
  logoUrl = 'assets/grlogo.svg';
  demoimg = 'assets/demoimg.jpg';

  answerA: string = "Somewhere";
  answerB: string = "Somewhere";
  answerC: string = "Somewhere";
  answerD: string = "Somewhere";
  allLocations;
  correctLocation;
  apiKey = apiKey;


  @ViewChild("gametimersvg") gametimersvg: ElementRef;
  @ViewChild("gameTimerCountdown") gameTimerCountdown: ElementRef;
  gameTimeRemaining:number = 10;


  constructor(private dialogBoxService: DialogBoxService) { }

  ngOnInit(): void {
   // this.gametimersvg.classList.add("gameStarting")

  }

  // ngAfterViewInit(){
  //   this.gametimersvg.nativeElement.classList = "gameStarting";
  //   this.dialogBoxService.generateGameDialogBox(
  //     '<h3>How do I play?</h3>'
  //    + '<i class="fas fa-gamepad" style="background: linear-gradient(#EDAE41, #D7476D);background-clip: text; -webkit-background-clip: text; color: transparent; -webkit-text-fill-color: transparent; font-size: 50px;"></i>'
  //    + '<p>1.) Take a look around.<br/>2.) Figure out where you are<br/>3.) Choose one of the options before time runs out.</p>',
  //    this.gameTimerCountdown,
  //    this.gametimersvg
  //   );
  // }



// TODO - Uncomment this after styling and initial coding to test
  ngAfterViewInit(){
    // const streetView = this.map.getStreetView();
    this.newRound();
    // streetView.setOptions({
    //    position: { lat: 35.7040744, lng: 139.5577317 },
    //    enableCloseButton: false,
    //    addressControl: false,
    //    fullscreenControl: false
    //    //pov: { heading: 70, pitch: -10 },
    // });

    // streetView.setVisible(true);

    this.gametimersvg.nativeElement.classList = "gameStarting";
    this.dialogBoxService.generateGameDialogBox(
      '<h3>How do I play?</h3>'
     + '<i class="fas fa-gamepad" style="background: linear-gradient(#EDAE41, #D7476D);background-clip: text; -webkit-background-clip: text; color: transparent; -webkit-text-fill-color: transparent; font-size: 50px;"></i>'
     + '<p>1.) Take a look around.<br/>2.) Figure out where you are<br/>3.) Choose one of the options before time runs out.</p>',
     this.gameTimerCountdown,
     this.gametimersvg
    );
 }



 newRound(){
   console.log("Attempting to get random locations...");
  // let locations = Array(4);
  //  for(let i = 0; i < 4; i++){
  //     randomStreetView.getRandomLocation().then((result) => {
  //     locations[i] = result;
  //   });
  //  }
  //
  //  let randNum = Math.floor(Math.random() * 4);
  //  this.correctAnswer = locations[Math.floor(Math.random() * 4)];
  //  console.log(locations);
  //  console.log("Trying: " + randNum);
  //  console.log(locations[randNum])
  //  console.log(locations[2]);
  //  console.log(this.correctAnswer);
  const streetView = this.map.getStreetView();

  let locations = randomStreetView.getRandomLocations(4).then((data) => {
    this.allLocations = data;
    //console.log(locations);
    this.correctLocation = data[Math.floor(Math.random() * 4)];
    console.log(this.correctLocation);



    streetView.setOptions({
     position: { lat: this.correctLocation[0], lng: this.correctLocation[1] },
     enableCloseButton: false,
     addressControl: false,
     fullscreenControl: false
    });

    streetView.setVisible(true);
  });



  // let locations = randomStreetView.getRandomLocations(4).then((data) => {
  //   console.log(data);
  // });
  //this.correctAnswer = locations[Math.floor(Math.random() * 4)];
  // const streetView = this.map.getStreetView();

  // streetView.setOptions({
  //    position: { lat: this.correctAnswer[0], lng: this.correctAnswer[1] },
  //    enableCloseButton: false,
  //    addressControl: false,
  //    fullscreenControl: false
  //    //pov: { heading: 70, pitch: -10 },
  // });
  }
}

