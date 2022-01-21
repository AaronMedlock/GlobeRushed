import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  @ViewChild(GoogleMap) map!: GoogleMap;
  logoUrl = 'assets/grlogo.svg';


  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    const streetView = this.map.getStreetView();

    streetView.setOptions({
       position: { lat: 38.9938386, lng: -77.2515373 },
       enableCloseButton: false,
       addressControl: false,
       fullscreenControl: false
       //pov: { heading: 70, pitch: -10 },
    });

    streetView.setVisible(true);
 }

}
