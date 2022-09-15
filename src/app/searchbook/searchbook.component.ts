import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { VBook2User } from '../models/book2-user-model';
import { LoginService } from '../services/login/login.service';
import { SearchBookService } from '../services/search-book/search-book.service';

@Component({
  selector: 'app-OnSearchSubmitted',
  templateUrl: './searchbook.component.html',
  styleUrls: ['./searchbook.component.css']
})
export class SearchbookComponent implements OnInit {
  title = "Search books";
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

  displayedColumns: string[] = ['bookLogo','bookTitle', 'category', 'price', 'publisher', 'userName',  'publishDate', 'createdDate', 'actions'];
  dataSource!: MatTableDataSource<any>;
  token = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;
  constructor(private searchBooksService: SearchBookService, 
             private loginService : LoginService,
             private router : Router) { }

  ngOnInit(): void {
    if (!this.loginService.ValidateLoggedInReader()){
      this.router.navigate([''])
    } else {
      this.token = localStorage.getItem('token')!;
    }
  }

  OnSearchSubmitted(books : VBook2User[]){
    if (books !== null) {
      this.books = books;
      this.dataSource = new MatTableDataSource(this.books);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.dataSource = new MatTableDataSource(this.books);
    }
   
  }
}
