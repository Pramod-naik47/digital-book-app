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
    queryParams.append("bookTitle", serachCriteria.BookTitle);
    // queryParams.append("category", serachCriteria.Category);
    // queryParams.append("author", serachCriteria.Author);
    // queryParams.append("publisher", serachCriteria.Publisher);
    // queryParams.append("price", serachCriteria.Price);
    console.log(serachCriteria.BookTitle);
    console.log(queryParams);
   return this.http.get<ReaderSearchCriteria[]>(this.baseUrl, {params : queryParams});
  }
}
