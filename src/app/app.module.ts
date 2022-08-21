import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchbookComponent } from './searchbook/searchbook.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { Route, RouterModule } from '@angular/router';
import { AuthorComponent } from './author/author.component'; 

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchbookComponent,
    SignInComponent,
    AuthorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: SearchbookComponent},
      {path: 'sign-in', component: SignInComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
