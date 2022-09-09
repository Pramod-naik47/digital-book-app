import { Component, OnInit } from '@angular/core';
import { User } from '../models/loginmodel';
import { CreateAccountService } from '../services/create-account-service';
import { Router } from '@angular/router';
import { UserTypes } from '../models/user-type';

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

  userTypes: UserTypes[] = [
    {value : "Author", displayLabel : "Author"},
    {value: "Reader", displayLabel : "Reader"}
  ]
  constructor(private createAccountService : CreateAccountService, private route : Router) { }

  ngOnInit(): void {
  }

  onCreateAccountFormSubmit(){
    this.createAccountService.CreateAccount(this.userObject, 'https://localhost:7151/api/v1/digitalbooks/author/CreateAuthorAccount')
    .subscribe(
      response => {
        this.route.navigate(['/sign-in'])
      }
     )
  }
}
