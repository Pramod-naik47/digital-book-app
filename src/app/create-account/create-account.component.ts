import { Component, OnInit } from '@angular/core';
import { User } from '../models/loginmodel';
import { CreateAccountService } from '../services/create-account-service';
import { Router } from '@angular/router';
import { UserTypes } from '../models/user-type';
import { NotificationService } from '../services/notificationservice/notification.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
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
  constructor(private createAccountService : CreateAccountService,
              private route : Router,
              private notificationService : NotificationService) { }

  ngOnInit(): void {
  }

  onCreateAccountFormSubmit() {
    this.createAccountService.ValidateExistingUser(this.userObject, 'https://localhost:7151/api/v1/digitalbooks/checkExistingUser')
      .subscribe(
        response => {
          this.token = response;
          if (this.token.statusCode == 1) {
            this.createAccountService.CreateAccount(this.userObject, 'https://localhost:7151/api/v1/digitalbooks/author/CreateAuthorAccount')
              .subscribe(
                response => {
                  this.notificationService.showSuccess("User created sucessfully", "Book app")
                  this.route.navigate([''])
                }
              )
          } else {
            debugger;
            this.notificationService.showError(this.token.message, "Book app")
          }
        }
      )


  }
}
