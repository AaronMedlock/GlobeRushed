import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  constructor(private http: HttpClient) { }


  /**
   * Hit the authentication end point of server and get
   * an auth token for login.
   *
   * @param request the body of the request
   * @returns string token
   */
  public generateToken(request: any){
    return this.http.post(`${url}/authenticate`, request, {responseType: 'text' as 'json'});
  }


  /**
   *
   * @param token
   * @returns
   */
  public accessLogin(token:string) {
    let tokenStr = `Bearer ${token}`;
    const headers = new HttpHeaders().set("Authorization", tokenStr);

    return this.http.get(url, {headers, responseType: 'text' as 'json'});
  }

  /**
   *
   * @param username The username entered by the user
   * @param password The password entered by the user
   * @returns response fr
   */
  public login(username:string, password:string) {

    let req: any = {
      "username" : username,
      "password" : password
    }

    return this.generateToken(req);
  }
}
