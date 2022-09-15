import { Component, OnInit } from '@angular/core';
import { User } from '../models/loginmodel';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationService } from '../services/notificationservice/notification.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserTypes } from '../models/user-type';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {
  isAuthenticated : boolean = false;
  currentUserName: string = '';
  currentUserId : string = '';
  currentUserType : string = '';
  user: User[] = [];
  userObject: User = {
    userId : 0,
    userName: '',
    password: '',
    userType: '',
    email : '',
    phoneNumber : 0
  }

  token : any = {
    token : '',
    isAuthenticated : false,
    message : '',
    statusCode : 0
  };
  
  userTypes: UserTypes[] = [
    {value : "Author", displayLabel : "Author"},
    {value: "Reader", displayLabel : "Reader"}
  ]

  constructor(private loginService : LoginService, 
              private router : Router,
              private notificationService : NotificationService) { }

  jwtHelper = new JwtHelperService();
  
  ngOnInit(): void {
  }
  
  OnLoginFormSubmit() {
   this.loginService.ValidateUser(this.userObject)
   .subscribe(
    response => {
      this.token = response;
       if (this.token.statusCode == 1) {
         this.notificationService.showSuccess(this.token.message, "Book app");
         const decodedToken = this.jwtHelper.decodeToken(this.token.token);

         this.isAuthenticated = this.token.isAuthenticated;
         this.currentUserId = decodedToken.userId;
         this.currentUserName = decodedToken.userName;
         this.currentUserType = decodedToken.userType;
         localStorage.setItem('token', this.token.token);
         localStorage.setItem('currentUserId', this.currentUserId);
         localStorage.setItem('currentUserType', this.currentUserType);
         localStorage.setItem('currentUserName', this.currentUserName);
         localStorage.setItem('currentUserName', this.currentUserName);
         localStorage.setItem('isUserAuthenticated', this.isAuthenticated ? "true" : "false");
         if (this.currentUserType === 'Author') {
           this.router.navigate(['/author']);
         } else {
           this.router.navigate(['/searchbook'])
         }
       } else {
        this.notificationService.showError(this.token.message, "Book app");
       }
    },
    error => {
      
    }
   )
  }
}
