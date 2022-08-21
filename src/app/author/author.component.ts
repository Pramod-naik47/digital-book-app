import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book-model';
import { BookService } from '../services/book-service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  title = "Author list screen";
  books : Book[] = [];
  bookObject : Book = {
    bookId : 0,
    bookTitle : '',
    category: '',
    price : 0,
    publisher : '',
    content : '',
    active : false
  };

  constructor(private bookService : BookService) { }

  ngOnInit(): void {
    this.GetBookForAuthor();
  }
  
  GetBookForAuthor(){
    this.bookService.GetBookForAuthor('https://localhost:7151/api/v1/digitalbooks/author/getBooksForAuthor')
    .subscribe(
      response => {
        this.books = response;
      }
    )
  }

  DeleteBook(bookId : number) {
    this.bookService.DeleteBook('https://localhost:7151/api/v1/digitalbooks/author/deleteBook', bookId)
    .subscribe(
      response => {
      }
     )
  }
}
