import { HttpClient, HttpParams ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book-model';

@Injectable({
    providedIn: 'root'
  })
  
  export class BookService {
    token = localStorage.getItem('token');
    // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IkphY2siLCJVc2VyVHlwZSI6IkF1dGhvciIsIlVzZXJJZCI6IjIiLCJhdWQiOlsiYXBpLmdhdGV3YXkuY29tIiwiYXBpLmF1dGhvci5jb20iLCJhcGkucmVhZGVyLmNvbSIsImFwaS5hdXRoc2VydmVyLmNvbSJdLCJuYmYiOjE2NjEwNzM0ODgsImV4cCI6MTY2MTE0NzI4OCwiaXNzIjoiYXBpLmF1dGhzZXJ2ZXIuY29tIn0.1RkytQBqkQbLaFbTG7V8nJAicNEJFu3dcSWqBCmPqaE'
    
    httpheader = new HttpHeaders(
        {
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        })

    constructor(private http: HttpClient) { }

    CreateBook(book: Book, browseUrl : string):Observable<Book> {
        return this.http.post<Book>(browseUrl, book, {headers : this.httpheader});
      }

    GetBookForAuthor(url : string):Observable<Book[]> {
        return this.http.get<Book[]>(url, {headers : this.httpheader})
    }

    DeleteBook(url : string, bookId : number):Observable<Book>{
        return this.http.post<Book>(url, bookId, {headers : this.httpheader});
    }
  }