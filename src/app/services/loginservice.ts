import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/loginmodel';

@Injectable({
    providedIn: 'root'
  })
  
  export class LoginService {
    baseUrl = 'https://localhost:7151/api/v1/digitalbooks/genarateToken'

    currentUserType = localStorage.getItem('currentUserType');
    currentUserName  = localStorage.getItem('currentUserName');
    isAuthenticated = localStorage.getItem('isUserAuthenticated');
    constructor(private http: HttpClient) { }
    
    ValidateUser(user: User):Observable<User> {
        return this.http.post<User>(this.baseUrl, user);
      }

    LogoutCurrentUser(){
        localStorage.clear();
    }

    GetUserName() {
        return this.currentUserName;
    }

    IsUserAuthenticated() {
        return this.isAuthenticated;
    }

    GetUserType() {
        return this.currentUserType;
    }

  }