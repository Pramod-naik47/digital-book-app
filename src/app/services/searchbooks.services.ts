import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/searchmodel';

@Injectable({
  providedIn: 'root'
})
export class SearchBooksService {

  baseUrl = 'https://localhost:7151/api/v1/digitalbooks/books/search';

  constructor(private http: HttpClient) { }

  //Get all books
  SearchBook(serachCriteria: Book):Observable<Book[]>{

    let queryParams = new HttpParams();
      queryParams = queryParams.append("bookTitle",serachCriteria.bookTitle);
      queryParams = queryParams.append("category",serachCriteria.category);
      queryParams = queryParams.append("author",serachCriteria.author);
      queryParams = queryParams.append("price",serachCriteria.price);
      queryParams = queryParams.append("publisher",serachCriteria.publisher);

      return this.http.get<Book[]>(this.baseUrl,{params:queryParams});
  }
}
