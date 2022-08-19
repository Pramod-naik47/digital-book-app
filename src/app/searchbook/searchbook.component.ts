import { Component, OnInit } from '@angular/core';
import { ReaderSearchCriteria } from '../models/searchmodel';
import { SearchBooksService } from '../services/searchbooks.services';

@Component({
  selector: 'app-searchbook',
  templateUrl: './searchbook.component.html',
  styleUrls: ['./searchbook.component.css']
})
export class SearchbookComponent implements OnInit {
  title = "Search books";
  books:ReaderSearchCriteria[] = [];
  criteria : ReaderSearchCriteria = {
    BookTitle :'',
    Category :'',
    Price: '',
    UserId : '',
    Publisher : ''
  };

  constructor(private searchBooksService : SearchBooksService) { }

  ngOnInit(): void {
  }

  SearchBook() {
    this.searchBooksService.SearchBook()
    .subscribe(
      response => { this.books = response}
    );
  }

}
