import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }


  /**
   * LOGIN -
   * Validate the user's credentials against the backend
   * @param credentials An object containing input collected from user
   * @returns observable as a result of POST request to api
   */
  login(credentials): Observable<any>{
    return this.http.post(
      `${url}/authenticate`, {
        username: credentials.username,
        password: credentials.password
      }, {responseType: 'text'});//httpOptions);//{responseType: 'text' as 'json'});
  }


  /**
   * REGISTER -
   * Attempt to register the user in the DB
   * @param user An object containing input collected from user
   * @returns observable as a result of POST request to api
   */
  register(user): Observable<any>{
    console.log(user);
    return this.http.post(
      `${url}/register`, {
        username: user.username,
        email: user.email,
        password: user.passone
      }, {responseType: 'text'} );
  }


  /**
   * IS USER LOGGED IN -
   * Determine whether the visitor is in possession of a JWT from a
   * previous login. This is particularly used with route guarding.
   * @returns boolean value of whether or not the visitor is already logged in.
   */
  isUserLoggedIn(): boolean{
    let token = this.tokenStorage.getToken();
    return (token) ? true : false;
  }

  getFriendLeaderboard(user,friendList): Observable<any>
  {
    //let token = this.tokenStorage.getUser();
    //let tokenStr = `Bearer ${token}`;
    //console.log(tokenStr);

    return this.http.get(
      `${url}/score/friendlist/${user}`,
      {responseType: 'json'}
    );
  }

  getGlobalLeaderboard():Observable<any>
  {
    return this.http.get(
      `${url}/score/global`,
      {responseType:'json'}
    );
  }

  addFriend(friendToAdd): Observable<any>{
    return this.http.post(`${url}/user/add/friend`, {
      username: this.tokenStorage.getUserInfo().sub,
      "friend_name": friendToAdd
    });
  }


  addScore(scoreToAdd) : Observable<any>
  {
    return this.http.post(`${url}/score/add`,
    {
      username: this.tokenStorage.getUserInfo().sub,
      score_value: scoreToAdd
    });
  }


  getScore(userToGet): Observable<any>{
    return this.http.get(`${url}/score/user/${userToGet}`,
    {responseType: 'text'} );
  }
}
