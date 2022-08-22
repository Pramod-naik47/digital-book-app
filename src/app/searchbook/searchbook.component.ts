import { Component, OnInit } from '@angular/core';
import { Book } from '../models/searchmodel';
import { SearchBooksService } from '../services/searchbooks.services';

@Component({
  selector: 'app-searchbook',
  templateUrl: './searchbook.component.html',
  styleUrls: ['./searchbook.component.css']
})
export class SearchbookComponent implements OnInit {
  title = "Search books";
  books: Book[] = [];
  criteria : Book = {
    bookTitle :'',
    category :'',
    price: 0,
    author : '',
    publisher : '',
    content : '',
    active : false
  };

  constructor(private searchBooksService : SearchBooksService) { }

  ngOnInit(): void {
  }

  onSearchSubmit(){
      this.searchBooksService.SearchBook(this.criteria)
      .subscribe(
        response => {
           this.books = response;
        }
      );
  }
}
