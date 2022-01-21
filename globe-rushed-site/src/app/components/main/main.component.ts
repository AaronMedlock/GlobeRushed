// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { JwtClientService } from 'src/app/services/jwt-client.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public href: string = "";

  // Site setup
  headerDecoImage = 'assets/index-header-map.png';
  headerLogoImage = 'assets/index-header-logo.png';
  footerDecoImage = 'assets/footer-map.png';
  //siteUrl = this.router.url;

  // Registration
  regForm: any = {};
  @ViewChild("regUsernameMsg") regUsernameMsg: ElementRef;
  @ViewChild("regEmailMsg") regEmailMsg: ElementRef;
  @ViewChild("regPasswordMsg") regPasswordMsg: ElementRef;
  @ViewChild("regPasswordConfirmMsg") regPasswordConfirmMsg: ElementRef;
  @ViewChild("newPassword") newPasswordInputField: ElementRef
  @ViewChild("newPasswordConfirm") newPasswordConfirmInputField: ElementRef

  // Login
  form: any = {};

  // General
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  GRusername: string = "";

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  /**
   * DO LOGIN -
   * Collect user input from the login form and
   * attempt to log the user in (issuing a JWT
   * in the process).
   */
  doLogin(): void{
    this.authService.login(this.form).subscribe(
      data => {
        // Save JWT Token
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        // Save local state
        this.isLoginFailed = false;
        this.isLoggedIn = true;

        // Take user to user page
        this.router.navigate(['/user']);
      },
      err => {
        //this.errorMessage = err.error.message;
        console.log("ERROR!");
        console.log(err);
        this.isLoginFailed = true;
      }
    );
  }


  /**
   * DO REGISTER -
   * Attempt to register a new
   * user in the system.
   */
  doRegister(): void{
    console.log(`Attempting register with...`);
    console.log(this.regForm);
    const passwordOne: string = this.regForm.passone,
          passwordTwo: string = this.regForm.passtwo;
    if(passwordOne == passwordTwo){
      console.log(`${passwordOne} == ${passwordTwo}`);
    }

  }



  /**
   * TEST INPUT
   * Tests registration input at each
   * input entry in order to provide live
   * feedback to user of its validity.
   *
   * @todo IMPROVE PASSWORD VALIDATION
   * @param event An input field receiving input
   */
  testInput(event): void{
    // Create function variables
    let isEventTargetValid: boolean;
    let messageElement: any;
    let messagePrompt: string;

    // Determine what is calling this function and
    // validate its input
    switch(event.target.id){
      case "newUsername":
        isEventTargetValid = event.target.checkValidity();
        messageElement = this.regUsernameMsg.nativeElement;
        messagePrompt = "(Enter at least 5 characters)";
        break;

      case "newEmail":
        isEventTargetValid = event.target.checkValidity();
        messageElement = this.regEmailMsg.nativeElement;
        messagePrompt = "(Must be a valid email)";
        break;

      case "newPassword":
        isEventTargetValid = event.target.checkValidity();
        messageElement = this.regPasswordMsg.nativeElement;
        messagePrompt = "(Enter at least 5 characters)";
        break;

      case "newPasswordConfirm":
        if( event.target.value == this.newPasswordInputField.nativeElement.value
            && event.target.value.length >= 5){
          isEventTargetValid = true;
        } else {
          isEventTargetValid = false;
        }
        messageElement = this.regPasswordConfirmMsg.nativeElement;
        messagePrompt = "(Make this match)";

        break;
    }

    // Test the input for validity using
    // collected info
    this.testInputValidity(
      isEventTargetValid,
      messageElement,
      messagePrompt
    );

  }



    /**
   * TEST INPUT VALIDITY -
   * Test input validity in order to send it back to the user.
   * @param isEventTargetValid boolean value of whether event is valid
   * @param messageElement The HTML element to write a message to
   * @param messagePrompt The message to write to the HTML element
   */
     testInputValidity(isEventTargetValid: boolean, messageElement, messagePrompt){
      if(isEventTargetValid){
        messageElement.innerHTML = `<i class="fas fa-check-circle"></i>`;
        if( !(messageElement.style.color == "#80DECD") ){
          messageElement.style.color = "#80DECD";
        }
      } else {
        messageElement.innerHTML = messagePrompt;
        if( !(messageElement.style.color == "#D7476D") ){
          messageElement.style.color = "#D7476D";
        }
      }
    }


  toggleMenu(event: any){
    let mainLogin = document.getElementById("main-login"),
        mainReg = document.getElementById("main-registration");

    if(mainLogin && mainReg){
      mainLogin.classList.toggle("hide_index-container");
      mainReg.classList.toggle("hide_index-container");
    }
  }


  toggleAccordion(eventTarget: any){
    eventTarget.classList.toggle("active");
    let panel = eventTarget.nextElementSibling;
    panel.style.maxHeight = (panel.style.maxHeight) ?
      null : panel.scrollHeight + "px";
  }

}
