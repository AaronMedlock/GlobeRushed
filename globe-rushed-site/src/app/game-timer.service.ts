import { Injectable } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameTimerService {

  gameTimeRemaining: number = 10000;

  countdown(){
    setTimeout(() => {
      this.gameTimeRemaining -= 1000;
      console.log(this.gameTimeRemaining);
    }, 1000);
  }
  //Countdown()
    // Every second, deduct one from param element ref
    // If game is interupted, trigger game decide.
    // If time left is > 75% then make green
    // If time left is < 75% then make yellow
    // If time left is < 25% then make red
    // If time left is 0 seconds then trigger game decide

  constructor() { }
}
