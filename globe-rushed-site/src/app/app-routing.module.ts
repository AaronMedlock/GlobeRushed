import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { UserComponent } from './components/user/user.component';
import { PlayComponent } from './components/play/play.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { UserPageGuard } from './guards/user-page.guard';

const routes: Routes = [
 // {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path:'', component: MainComponent},
  {path:'home', component: MainComponent},
  {path: 'user', component: UserComponent, canActivate: [UserPageGuard]},
  {path: 'play', component: PlayComponent},
  {path: 'leaderboard', component: LeaderboardComponent},
  {path: 'leaders', component: LeaderboardComponent},

  {path: '**', component: MainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
