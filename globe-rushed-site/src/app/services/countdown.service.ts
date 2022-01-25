import { PlayComponent } from './../components/play/play.component';
import { GameTimerService } from './../game-timer.service';
import { Injectable, ElementRef, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  gameTime: number = 10;
  gameStarting: number = 10;
  gameMiddle: number = 7;
  gameEnding: number = 4;

  constructor(){ }


  /**
   * GAME TIMER -
   * Create the game timer that informs the user of the time
   * remaining. Takes in the game timer text (where the count
   * goes) and the game timer icon (which changes color as
   * time draws nearer to zero)
   * @param gameTimerTextElement The time text
   * @param gameTimerIcon The icon to change colors
   */
  gameTimer(gameTimerTextElement: ElementRef, gameTimerIcon: ElementRef){

    // Determine the class to use based on time remaining
    if(this.gameTime > this.gameMiddle){
      gameTimerIcon.nativeElement.classList = "gameStarting";
    } else if(this.gameTime > this.gameEnding){
      gameTimerIcon.nativeElement.classList = "gameMiddle";
    } else {
      gameTimerIcon.nativeElement.classList = "gameEnding";
    }

    // Create the countdown
    setTimeout(() => {
      gameTimerTextElement.nativeElement.innerHTML = --this.gameTime;
      if(this.gameTime > 0){
        this.gameTimer(gameTimerTextElement, gameTimerIcon);
      }
      if(this.gameTime == 0){
        console.log("lost!");
      }
    }, 1000);
  }


  /**
   * STOP GAME TIMER -
   * Stop the game timer from counting down by
   * immediately setting it to zero.
   */
  stopGameTimer(){
    this.gameTime = 1;
  }


  /**
   * GET GAME TIME -
   * Get the game time remaining at
   * function call.
   * @returns number of seconds remaining in round.
   */
  getGameTime(){
    return this.gameTime;
  }


  /**
   * RESET START TIMER -
   * Reset the game's timer. Accepts custom round time in seconds.
   * @param startTime The amount of seconds in a round. Default is 10.
   */
  resetGameTimer(startTime: number = 10){
    this.gameTime = startTime;
  }
}
