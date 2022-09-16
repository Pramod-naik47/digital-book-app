import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { VBook2User } from '../models/book2-user-model';
import { SearchBookFilterComponent } from '../search-book-filter/search-book-filter.component';
import { BookService } from '../services/book/book.service';
import { LoginService } from '../services/login/login.service';
import { NotificationService } from '../services/notificationservice/notification.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  expectedData(expectedData: any) {
    throw new Error('Method not implemented.');
  }
  title = "Author list screen";
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

  token: string = '';
  message: any = '';
  displayedColumns: string[] = ['bookLogo', 'bookTitle', 'category', 'price', 'content', 'publisher',  'publishDate', 'createdDate', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(SearchBookFilterComponent) searchBookComponent! : SearchBookFilterComponent

  constructor(private bookService: BookService,
    private notificationService: NotificationService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.loginService.ValidateLoggedInAuthor()) {
      this.router.navigate([''])
    } else {
      this.token = localStorage.getItem('token')!;
    }
  }

  OnSearchSubmitted(books: VBook2User[]) {
    if (books !== null) {
      this.books = books;
      this.dataSource = new MatTableDataSource(this.books);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.dataSource = new MatTableDataSource(this.books);
    }
  }

  DeleteBook(bookId: number) {
    this.bookService.DeleteBook('https://localhost:7151/api/v1/digitalbooks/author/deleteBook', bookId, this.token)
      .subscribe(
        response => {
          this.message = response;
          this.notificationService.showSuccess(this.message.join(''), "Book app")
          this.searchBookComponent.onSearchSubmit();
        }
      )
  }
}
