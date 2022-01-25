import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  template: `
  <ng-template>
        <div class="profile_friend-trophy"><i class="fas fa-trophy"></i></div>
        <div class="profile_friend-ranking">##</div>
        <div class="profile_friend-avatar"><i class="fas fa-user-astronaut"></i></div>
        <div class="profile_friend-username">{{  }}</div>
        <div class="profile_friend-rank">Newbie</div> <!-- create function to return rank -->
        <div class="profile_friend-xp">x points</div> <!-- lifetime score value as xp -->
  </ng-template>`
})




export class UserComponent implements OnInit
{

  headerDesktopDecoImg = 'assets/desktop_users-header-w-bg.svg';
  userAvatar: string = '';
  GRusername: string = 'Username';
  userxplvl: string = "Level 0 - Newbie";
  userxp: number = 0;
  isLoggedIn = false;
  friendList;


  constructor(private tokenStorage: TokenStorageService,private authService: AuthService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.GRusername = this.tokenStorage.getUserInfo().sub;
      //get friendlist from service

      this.authService.getFriendLeaderboard(this.GRusername,this.friendList).subscribe(data =>
      {
        this.friendList = data;
      });

      this.authService.getScore(this.GRusername).subscribe(data => this.userxp = data);
    }
  }

}
