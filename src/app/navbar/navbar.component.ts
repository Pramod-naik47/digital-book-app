import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService : LoginService, private router : Router) { }
  
  ngOnInit(): void {
  }

  GetUserName() : any {
    return  this.loginService.GetUserName();
  }

  IsUserAuthenticated(): boolean {
    return this.loginService.IsUserAuthenticated() === "true" ? true : false;
  }

  GetUserType() {
    return this.loginService.GetUserType();
  }

  LogOutCurrentUser(){
    this.loginService.LogoutCurrentUser();
    this.router.navigate([''])
  }
}
