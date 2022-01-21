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
    return this.http.post(
      `${url}/register`, {
        username: user.username,
        email: user.email,
        password: user.password
      }, httpOptions );
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
}
