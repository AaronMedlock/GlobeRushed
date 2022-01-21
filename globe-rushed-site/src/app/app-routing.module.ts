import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { UserComponent } from './components/user/user.component';
import { PlayComponent } from './components/play/play.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { UserAlreadyLoggedInGuard } from './guards/user-already-logged-in.guard';
import { UserNotLoggedInGuard } from './guards/user-not-logged-in.guard';

const routes: Routes = [
 // {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path:'', component: MainComponent, canActivate: [UserAlreadyLoggedInGuard]},
  {path:'home', component: MainComponent, canActivate: [UserAlreadyLoggedInGuard]},
  {path: 'user', component: UserComponent, canActivate: [UserNotLoggedInGuard]},
  {path: 'play', component: PlayComponent},//, canActivate: [UserNotLoggedInGuard]},
  {path: 'leaderboard', component: LeaderboardComponent},
  {path: 'leaders', component: LeaderboardComponent},

  {path: '**', component: MainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
