import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public href: string = "";

  headerDecoImage = 'assets/index-header-map.png';
  headerLogoImage = 'assets/index-header-logo.png';
  siteUrl = this.router.url;

  constructor(private router: Router) {}

  ngOnInit() {
      this.href = this.router.url;
      console.log(this.router.url);
  }

}
