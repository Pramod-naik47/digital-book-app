import { Component, OnInit } from '@angular/core';
import { User } from '../models/loginmodel';
import { LoginService } from '../services/loginservice';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  title = "Login user";
  user: User[] = [];
  userObject: User = {
    userName: '',
    password: '',
    userType: ''
  }

  token : any = {
    token : '',
    isAuthenticated : false,
    message : ''
  };

  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
  }

  OnLoginFormSubmit() {
   this.loginService.ValidateUser(this.userObject)
   .subscribe(
    response => {
      this.token = response;
      localStorage.setItem('token', this.token.token);
    }
   )
  }
}
