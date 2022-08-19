import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReaderSearchCriteria } from '../models/searchmodel';

@Injectable({
  providedIn: 'root'
})
export class SearchBooksService {

  baseUrl = 'https://localhost:7151/api/v1/digitalbooks/books/search';

  constructor(private http: HttpClient) { }

  //Get all cards
  SearchBook():Observable<ReaderSearchCriteria[]>{
      return this.http.get<ReaderSearchCriteria[]>(this.baseUrl);
  }
}
