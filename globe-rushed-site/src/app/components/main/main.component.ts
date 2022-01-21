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
  @ViewChild("mainregistration") mainRegistration: ElementRef;
  @ViewChild("regUsernameMsg") regUsernameMsg: ElementRef;
  @ViewChild("regEmailMsg") regEmailMsg: ElementRef;
  @ViewChild("regPasswordMsg") regPasswordMsg: ElementRef;
  @ViewChild("regPasswordConfirmMsg") regPasswordConfirmMsg: ElementRef;
  @ViewChild("newPassword") newPasswordInputField: ElementRef;
  @ViewChild("newPasswordConfirm") newPasswordConfirmInputField: ElementRef;
  @ViewChild("registrationMessageBox") registrationMessageBox: ElementRef;
  @ViewChild("registrationButton") registrationButton: ElementRef;
  isUsernameValid: boolean;
  isEmailValid: boolean;
  isPasswordValid: boolean;

  // Login
  form: any = {};
  @ViewChild("loginMessageBox") loginMessageBox: ElementRef;

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
        let loginSnackbar = this.loginMessageBox.nativeElement;
        loginSnackbar.classList.add("login-failed");
        loginSnackbar.innerHTML = "Oops!<br/>Might want to double check your login.";
        this.addSnackbar(loginSnackbar);
      }
    );
  }


  /**
   * DO REGISTER -
   * Attempt to register a new
   * user in the system.
   */
  doRegister(): void{
    // Test username for validity
    let usernameValidity = this.giveTrueOrMessage(
      (this.regForm.username !== undefined &&
        this.regForm.username.length >= 5),
      "Oops, might want to double check your username.");

    // Test email for validity
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    let emailValidity = this.giveTrueOrMessage(
      ( this.regForm.email !== undefined &&
        regexp.test(this.regForm.email)),
      "Oops, might want to double check your email."
    );

    // Test password for validity
    let passwordValidity = this.giveTrueOrMessage(
      (this.regForm.passone !== undefined &&
       this.regForm.passtwo !== undefined &&
       this.regForm.passone.length >= 5 &&
       this.regForm.passtwo.length >= 5 &&
       this.regForm.passone == this.regForm.passtwo),
      "Oops!<br/> You might want to double check your passwords. "
      + "Make sure they're more than 5 characters and match exactly."
    );
    // Create
    let registerMessageBox = this.registrationMessageBox.nativeElement;
    registerMessageBox.classList = "snackbar";

    //Ensure that all input is valid
    if( usernameValidity === true &&
        emailValidity === true &&
        passwordValidity === true
    ){

      // register user
      this.authService.register(this.regForm).subscribe(
        data => {
          this.authService.login({
            username: this.regForm.username,
            password: this.regForm.passone
          }).subscribe(
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
              console.log("ERROR: Unable to process login!");
              console.error(err);
              this.isLoginFailed = true;
              registerMessageBox.classList.add("login-failed");
              registerMessageBox.innerHTML = "Uh oh, looks like we can't automatically log you in. Try manually logging in with your new account."
              this.addSnackbar(registerMessageBox);
            }
          );
        },
        err => {
          registerMessageBox.classList.add("register-falied");
          registerMessageBox.innerHTML = "Uh oh,our system encountered an error registering you. Please try again later.";
          this.addSnackbar(registerMessageBox);
        }
      );
    } else {
      registerMessageBox.classList.add("register-falied");
      if(usernameValidity !== true){
        registerMessageBox.innerHTML = usernameValidity;

      } else if(emailValidity !== true){
        registerMessageBox.innerHTML = emailValidity;

      } else if (passwordValidity !== true){
        registerMessageBox.innerHTML = passwordValidity;
      } else {
        registerMessageBox.innerHTML = "An unknown error has occured";
      }
      this.addSnackbar(registerMessageBox);
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
    let eventTarget = event.target;

    // Determine what is calling this function and
    // validate its input
    switch(eventTarget.id){
      case "newUsername":
        this.isUsernameValid = event.target.checkValidity();
        this.testInputValidity(
          this.isUsernameValid ,
          this.regUsernameMsg.nativeElement,
          "(Enter at least 5 characters)",
          eventTarget
        );
        break;

      case "newEmail":
        const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        this.isEmailValid = regexp.test(event.target.value)
        this.testInputValidity(
          this.isEmailValid,
          this.regEmailMsg.nativeElement,
          "(Must be a valid email)",
          eventTarget
        );
        break;

      case "newPassword":
      case "newPasswordConfirm":
        let passwordFieldOne = this.newPasswordInputField.nativeElement;
        let passwordFieldTwo = this.newPasswordConfirmInputField.nativeElement;
        this.isPasswordValid = (passwordFieldOne.value == passwordFieldTwo.value
                                      && event.target.checkValidity());

        // Test input 1
        this.testInputValidity(
          (this.isPasswordValid),
          this.regPasswordMsg.nativeElement,
          "(Enter at least 5 characters...)",
          passwordFieldOne
        );

        // Test input 2
        this.testInputValidity(
          this.isPasswordValid,
          this.regPasswordConfirmMsg.nativeElement,
          "(...and make this match)",
          passwordFieldTwo
        )
        break;
    }

    if(this.isUsernameValid &&
       this.isEmailValid &&
       this.isPasswordValid){
        this.registrationButton.nativeElement.style.background = "#80DECD";
    }
  }



   /**
   * TEST INPUT VALIDITY -
   * Test input validity in order to send it back to the user.
   * @param isEventTargetValid boolean value of whether event is valid
   * @param messageElement The HTML element to write a message to
   * @param messagePrompt The message to write to the HTML element
   * @param inputElement The input element being referenced. This allows visual feedback on validity of input.
   */
     testInputValidity(isEventTargetValid: boolean, messageElement, messagePrompt: string, inputElement: Element){
      if(isEventTargetValid){
        // ADD a green check mark to communicate field is valid
        messageElement.innerHTML = `<i class="fas fa-check-circle"></i>`;
        if( !(messageElement.style.color == "#80DECD") ){
          messageElement.style.color = "#80DECD";
        }

        // REMOVE red "Field NOT Valid" class if it is applied to the element
        if( inputElement.classList.contains("fieldIsNotValid") ){
          inputElement.classList.remove("fieldIsNotValid");
        }

        // ADD green to border of input field to communicate it's valid
        if( !inputElement.classList.contains("fieldIsValid") ){
          inputElement.classList.add("fieldIsValid");
        }
      } else {
        // ADD red prompt text to communicate field is NOT valid
        messageElement.innerHTML = messagePrompt;
        if( !(messageElement.style.color == "#D7476D") ){
          messageElement.style.color = "#D7476D";
        }

        // REMOVE green check mark if it was applied to the field
        if( inputElement.classList.contains("fieldIsValid") ){
          inputElement.classList.remove("fieldIsValid");
        }

        // ADD red border to input field to communicate it is NOT valid
        if( !inputElement.classList.contains("fieldIsNotValid") ){
          inputElement.classList.add("fieldIsNotValid");
        }
      }
    }


  toggleMenu(event: any){
    let mainLogin = document.getElementById("main-login"),
        mainReg = document.getElementById("mainregistration");

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

  /**
   *
   * @param condition
   * @param message
   */
   giveTrueOrMessage(condition: boolean, message: string){
    if(condition){
      return true;
    } else {
      return message;
    }
  }


/**
 * ADD SNACKBAR
 * Add a snackbar to the bottom of the page
 * @param element The snackbar element on the page
 * @param timeout The timeout desired. Default is 3000ms
 */
  addSnackbar(element: Element, timeout: number = 3000){
    element.classList.add("show");
    setTimeout(() => {
      element.classList.remove("show");
    }, timeout);
  }
}



/*

function initMap() {
    var styledMapType = new google.maps.StyledMapType([{
        "elementType": "geometry",
        "stylers": [{
            "color": "#d4c8b6"
        }]
    }, {
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#523735"
        }]
    }, {
        "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "#f5f1e6"
        }]
    }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#c9b2a6"
        }]
    }, {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#dcd2be"
        }]
    }, {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#ae9e90"
        }]
    }, {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [{
            "color": "#caba9c"
        }]
    }, {
        "featureType": "poi",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
            "color": "#caba9c"
        }]
    }, {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#93817c"
        }]
    }, {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#a5b076"
        }]
    }, {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#447530"
        }]
    }, {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
            "color": "#f5f1e6"
        }]
    }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
            "color": "#fdfcf8"
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
            "color": "#f8c967"
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#0b9446"
        }, {
            "visibility": "simplified"
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#0b9446"
        }, {
            "visibility": "on"
        }, {
            "weight": 1
        }]
    }, {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#cf1c44"
        }, {
            "weight": 2.5
        }]
    }, {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#806b63"
        }]
    }, {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{
            "color": "#caba9c"
        }]
    }, {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#8f7d77"
        }]
    }, {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "#d4c8b6"
        }]
    }, {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{
            "color": "#caba9c"
        }]
    }, {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#b9d3c2"
        }]
    }, {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#92998d"
        }]
    }], {
        name: 'Styled Map'
    });
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 69.040493,
            lng: -69.456758
        },
        zoom: 14,
        gestureHandling: 'cooperative',
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
        }
    });
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(69.040493, -69.456758),
        animation: google.maps.Animation.DROP,
        map: map,
    });
    marker.setMap(map);
}


<div class="map" style="background: url(images/contact-map-bg.jpg) no-repeat;">
	<div id="map" class="map"></div>
  <script type="e3e7be4ed7f9b0623c997289-text/javascript">function initMap(){
      var styledMapType = new google.maps.StyledMapType([{
        * Custom styling went here *
      }]);
        var map = new google.maps.Map(document.getElementById('map'), {
              center: {
                  lat: 69.040493,
                  lng: -69.456758
              },
              zoom: 14,
              gestureHandling: 'cooperative',
              mapTypeControlOptions: {
                  mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
              }
          });
          map.mapTypes.set('styled_map', styledMapType);
          map.setMapTypeId('styled_map');
          marker = new google.maps.Marker({
              position: new google.maps.LatLng(69.040493, -69.456758),
              animation: google.maps.Animation.DROP,
              map: map,
          });
          marker.setMap(map);
  </script>
</div>


*/
