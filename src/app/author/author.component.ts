import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Book } from '../models/book-model';
import { VBook2User } from '../models/book2-user-model';
import { BookService } from '../services/book-service';
import { LoginService } from '../services/loginservice';
import { NotificationService } from '../services/notificationservice/notification.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
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

  constructor(private bookService: BookService,
    private notificationService: NotificationService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.loginService.ValidateLoggedInAuthor()) {
      this.router.navigate([''])
    } else {
      this.token = localStorage.getItem('token')!;
      this.GetBookForAuthor();
    }
  }

  GetBookForAuthor() {
    this.bookService.GetBookForAuthor('https://localhost:7151/api/v1/digitalbooks/author/getBooksForAuthor', this.token)
      .subscribe(
        response => {
          this.books = response;
          this.dataSource = new MatTableDataSource(this.books);
          this.dataSource.paginator = this.paginator;
        }
      )
  }

  DeleteBook(bookId: number) {
    this.bookService.DeleteBook('https://localhost:7151/api/v1/digitalbooks/author/deleteBook', bookId, this.token)
      .subscribe(
        response => {
          this.message = response;
          this.GetBookForAuthor();
          this.notificationService.showSuccess(this.message.join(''), "Book app")
        }
      )
  }

  // LockOrUnlockBook(bookId : number, isActive : boolean){
  //   debugger;
  //   console.log(isActive);
  //   this.bookService.LockOrUnLockBook(bookId, isActive, "https://localhost:7151/api/v1/digitalbooks/author/LockOrUnlock", this.token)
  //   .subscribe (
  //     response => {
  //       this.message = response;
  //       this.notificationService.showSuccess(this.message.join(''), "Book app")
  //     }
  //   )
  // }
}
