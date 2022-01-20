import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  headerDesktopDecoImg = 'assets/desktop_users-header-w-bg.svg';
  userAvatar: string = '';
  username: string = 'Username';
  userxplvl: string = "Level 0 - Newbie";
  userxp: number = 0;

  constructor() { }

  ngOnInit(): void {

  }

}
