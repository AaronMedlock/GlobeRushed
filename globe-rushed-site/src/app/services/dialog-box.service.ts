import { CountdownService } from './countdown.service';
import { Injectable, ElementRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
//import randomStreetView from 'random-streetview';

@Injectable({
  providedIn: 'root'
})
export class DialogBoxService {
  constructor(private router: Router, private countdownService: CountdownService) { }

  /**
   * Generate dialog box
   * Create a custom dialog box that will display on the screen.
   * @param contents The HTML contents of the dialog box as a string.
   */
  generateGameDialogBox(contents: string, countdownEl: ElementRef, countdownIcon: ElementRef){
    const container = document.createElement("div"),
          dialogBox = document.createElement("div"),
          dialogNotReadyButton = document.createElement("a"),
          dialogGotItButton = document.createElement("a");

          // Set up container
          container.classList.add("dialogBox");
          container.id = "focused_notice";

          // Set box contents and buttons
          dialogNotReadyButton.innerHTML = "I'm not ready yet";
          dialogGotItButton.innerHTML = "Got it!";
          dialogBox.innerHTML += contents;
          dialogNotReadyButton.addEventListener('click', (e:Event) => {
            this.router.navigate(['/', 'user']);
            document.getElementById("focused_notice").remove();
          })
          dialogGotItButton.addEventListener('click', (e:Event) => {
            this.countdownService.gameTimer(countdownEl, countdownIcon);
            document.getElementById("focused_notice").remove();
          });
          dialogBox.appendChild(dialogNotReadyButton);
          dialogBox.appendChild(dialogGotItButton);
          container.appendChild(dialogBox);




          //Listen if outside the box was clicked, and close the dialog if so.
          document.onclick = function(offscreen) {
            if (offscreen.target == document.getElementById("focused_notice")){
              document.getElementById("focused_notice").remove();
            }
          }
          window.onclick = function(offscreen) {
            if (offscreen.target == document.getElementById("focused_notice")){
              document.getElementById("focused_notice").remove();
            }
          }

          // Append the dialog box to the document
          document.body.appendChild(container);
  }


}
