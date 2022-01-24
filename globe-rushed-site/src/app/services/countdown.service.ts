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

  constructor() { }



  gameTimer(gameTimerTextElement: ElementRef, gameTimerIcon: ElementRef){
    if(this.gameTime > this.gameMiddle){
      gameTimerIcon.nativeElement.classList = "gameStarting";
    } else if(this.gameTime > this.gameEnding){
      gameTimerIcon.nativeElement.classList = "gameMiddle";
    } else {
      gameTimerIcon.nativeElement.classList = "gameEnding";
    }


    setTimeout(() => {
      gameTimerTextElement.nativeElement.innerHTML = --this.gameTime;



      if(this.gameTime > 0){
        this.gameTimer(gameTimerTextElement, gameTimerIcon);
      }
    }, 1000);
  }
}
