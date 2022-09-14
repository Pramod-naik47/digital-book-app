import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VBook2User } from '../models/book2-user-model';
import { LoginService } from '../services/loginservice';
import { SearchBooksService } from '../services/searchbooks.services';

@Component({
  selector: 'app-search-book-filter',
  templateUrl: './search-book-filter.component.html',
  styleUrls: ['./search-book-filter.component.css']
})

export class SearchBookFilterComponent implements OnInit {

  constructor(private searchBooksService: SearchBooksService, 
              private loginService : LoginService,
              private router : Router,) { }
  
  token = '';
  books: VBook2User[] = [];
  criteria: VBook2User = {
    bookId: 0,
    bookTitle: '',
    category: '',
    price: 0,
    content: '',
    active: false,
    createdDate: new Date,
    modifiedDate: new Date,
    publishDate: new Date,
    publisher: '',
    userName: '',
    userType: '',
    userId: 0,
    email: '',
    phoneNumber: 0
  };
@Output() booksResult = new EventEmitter<VBook2User[]>();

  ngOnInit(): void {
    // if (!this.loginService.ValidateLoggedInReader() || !this.loginService.ValidateLoggedInAuthor()){
    //   this.router.navigate([''])
    // } else {
    this.token = localStorage.getItem('token')!;
    this.onSearchSubmit()
    // }
  }

  onSearchSubmit() {
    this.searchBooksService.SearchBook(this.criteria, this.token)
      .subscribe(
        response => {
          this.books = response;
          this.booksResult.emit(this.books);
        }
      );
  }
}
