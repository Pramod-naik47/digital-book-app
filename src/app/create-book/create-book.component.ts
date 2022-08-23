import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book-model';
import { BookService } from '../services/book-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {
  title = "Create book";
  id: number = 0
  isAddMode: boolean = false
  book: Book[] = [];
  bookObject: Book = {
    bookId: 0,
    bookTitle: '',
    category: '',
    price: 0,
    publisher: '',
    content: '',
    active: false
  }
  constructor(private bookSerive: BookService, private router: Router, private activatedRout: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRout.snapshot.params['bookId']
    this.isAddMode = !this.id;
    console.log(this.isAddMode)
    this.GetBookById()
  }

  CreateBook() {
    if (this.isAddMode) {
      console.log(this.bookObject)
      this.bookSerive.CreateBook(this.bookObject, 'https://localhost:7151/api/v1/digitalbooks/author/createBook').
        subscribe(
          resposnse => {
            this.router.navigate(['/author'])
          }
        )
    } else {
      this.UpdateBook();
    }
  }

  GetBookById() {
    if (!this.isAddMode) {
      this.bookSerive.GetBookById('https://localhost:7151/api/v1/digitalbooks/author/getBookById', this.id)
      .subscribe(
        response => {
          this.bookObject = response;
        }
      )
    }
  }

  UpdateBook() {
    this.bookSerive.UpdateBook(this.bookObject, 'https://localhost:7151/api/v1/digitalbooks/author/EditBook')
    .subscribe(
      res => {
        this.bookObject  = {
          bookId: 0,
          bookTitle: '',
          category: '',
          price: 0,
          publisher: '',
          content: '',
          active: false
        };

        this.router.navigate(['/author']);
      }
    )
  }
}
