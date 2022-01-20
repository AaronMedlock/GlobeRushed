import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public router: Router){}

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

  ngOnInit(): void {

  }

}
