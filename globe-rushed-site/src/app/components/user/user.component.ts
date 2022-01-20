import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  headerDesktopDecoImg = 'assets/desktop_users-header-w-bg.svg';
  userAvatar: string = '';
  GRusername: string = 'Username';
  userxplvl: string = "Level 0 - Newbie";
  userxp: number = 0;
  isLoggedIn = false;

  constructor(private tokenStorage: TokenStorageService,) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.GRusername = this.tokenStorage.getUserInfo().sub;
    }
  }

}
