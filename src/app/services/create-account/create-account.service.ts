import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/loginmodel';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {

  constructor(private http: HttpClient) { }

  CreateAccount(user: User, url : string):Observable<User> {
      return this.http.post<User>(url, user);
  }

  ValidateExistingUser(user: User, url : string):Observable<User> {
    return this.http.post<User>(url, user);
}
}
