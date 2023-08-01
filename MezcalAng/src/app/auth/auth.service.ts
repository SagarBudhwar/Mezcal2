import { Injectable } from '@angular/core';
import {Router} from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  userMenu:boolean = true;
  token:any;


  constructor(private myRoute: Router) { }
  // sendToken(token: string) {
  //   sessionStorage.setItem("LoggedInUser", token)
  // }
  // getToken() {
  //   return sessionStorage.getItem("LoggedInUser")
  // }

  getUserData() {
    return JSON.parse(localStorage.getItem('LoggedInUser') || '{}');
  }

  isLoggednIn() {
   // return this.getToken();
     //const token = localStorage.getItem('token');

     this.token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(this.token);
  }
  logout() {
    //localStorage.clear();
    localStorage.removeItem("LoggedInUser");
   localStorage.removeItem("userName");
   localStorage.removeItem("UserID");
   localStorage.removeItem("user"); 
   localStorage.removeItem("token");
    this.myRoute.navigate(['/login']);
    this.userMenu = true;
  }
}

