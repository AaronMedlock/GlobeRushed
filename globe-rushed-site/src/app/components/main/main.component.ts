// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { JwtClientService } from 'src/app/services/jwt-client.service';
import { Component, OnInit } from '@angular/core';
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

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  GRusername: string = "";

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      //this.GRusername = this.tokenStorage.getUserInfo().sub;
    }
  }

  doLogin(): void{
    console.log(`Attempting login with...`);
    console.log(this.form);
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

  //
  // // User login
  // username: string = "";
  // password: string = "";
  //
  //// User Registration
  // newUsername: string = "";
  // newEmail: string = "";
  // newPassword: string = "";
  // newPasswordConfirm: string = "";
  //
  //
  //constructor(private jwtService: JwtClientService, private router: Router) { }
  //
  // ngOnInit() {
  //     this.href = this.router.url;
  //     console.log(this.router.url);
  // }
  //
  //
  // doLogin() {
  //   let resp = this.jwtService.login(this.username, this.password);
  //   resp.subscribe(data => {
  //     this.router.navigate(['/user']) // think of ways in which you would append this to the header
  //     console.log(data);
  //   },
  //   error => {
  //     this.router.navigate(['/'])
  //     console.log(error);
  //   });
  // }

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
