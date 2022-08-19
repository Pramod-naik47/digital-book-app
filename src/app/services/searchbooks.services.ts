import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReaderSearchCriteria } from '../models/searchmodel';

@Injectable({
  providedIn: 'root'
})
export class SearchBooksService {

  baseUrl = 'https://localhost:7151/api/v1/digitalbooks/books/search';

  constructor(private http: HttpClient) { }

  //Get all books
  SearchBook(serachCriteria: ReaderSearchCriteria):Observable<ReaderSearchCriteria[]>{

    let queryParams = new HttpParams();
      queryParams = queryParams.append("bookTitle",serachCriteria.BookTitle);
      queryParams = queryParams.append("category",serachCriteria.Category);
      queryParams = queryParams.append("author",serachCriteria.Author);
      queryParams = queryParams.append("price",serachCriteria.Price);
      queryParams = queryParams.append("publisher",serachCriteria.Publisher);

      return this.http.get<ReaderSearchCriteria[]>(this.baseUrl,{params:queryParams});
  }
}
