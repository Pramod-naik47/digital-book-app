import { HttpClient, HttpParams ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book-model';

@Injectable({
    providedIn: 'root'
  })
  
  export class BookService {
    token = localStorage.getItem('token');
    
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

    DeleteBook(url : string, bookId : Book):Observable<Book>{
        return this.http.post<Book>(url, bookId, {headers : this.httpheader});
    }

    GetBookById(url : string, bookId : number):Observable<Book> {
        let queryParams = new HttpParams();
        queryParams = queryParams.append("bookId", bookId);
        return this.http.get<Book>(url, {headers : this.httpheader, params : queryParams})
    }

    UpdateBook(book: Book, browseUrl : string):Observable<Book> {
        return this.http.put<Book>(browseUrl, book, {headers : this.httpheader});
      }
  }