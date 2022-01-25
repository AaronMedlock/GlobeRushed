import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService, public router: Router){}

  logoUrl = 'assets/grlogo.svg';
  //isUserLoggedIn = this.authService.isUserLoggedIn();


  // Slide out the menu and turn the hamburger into an x
  // also vice versa
  toggleClass(event: any){
    let navIcon = document.getElementById("nav-icon-btn"),
        navLinks = document.getElementById("navlinks");

    if(navIcon && navLinks){
      navIcon.classList.toggle("close-icon");
      navLinks.classList.toggle("show_nav");
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  ngOnInit(): void {

  }


}
