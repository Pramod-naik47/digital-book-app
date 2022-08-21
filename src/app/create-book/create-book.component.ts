import { Component, OnInit } from '@angular/core';
import { Book  } from '../models/book-model';
import { BookService } from '../services/book-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {
  title = "Create book";
  book : Book[] =[];
  bookObject : Book = {
    bookId : 0,
    bookTitle : '',
    category : '',
    price : 0,
    publisher : '',
    content : '',
    active : false
  }
  constructor(private bookSerive : BookService, private router : Router) { }

  ngOnInit(): void {
  }

  CreateBook() {
    this.bookSerive.CreateBook(this.bookObject, 'https://localhost:7151/api/v1/digitalbooks/author/createBook').
    subscribe(
      resposnse => {
        JSON.stringify(resposnse);
        this.router.navigate(['/author'])
      }
    )
  }
}
