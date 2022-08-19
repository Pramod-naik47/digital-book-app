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
    Price: 0,
    Author : '',
    Publisher : ''
  };

  constructor(private searchBooksService : SearchBooksService) { }

  ngOnInit(): void {
  }

  onSearchSubmit(){
      this.searchBooksService.SearchBook(this.criteria)
      .subscribe(
        response => {
           this.books = response;
          console.log(this.books);
        }
      );
  }
}
