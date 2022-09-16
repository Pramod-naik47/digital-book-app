import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book-model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

    CreateBook(book: Book, browseUrl : string, token : string):Observable<Book> {
        return this.http.post<Book>(browseUrl, book, {headers : this.GetHeader(token)});
      }

    DeleteBook(url : string, bookId : number, token : string):Observable<Book>{
      let queryParams = new HttpParams();
        queryParams = queryParams.append("bookId", bookId);
        return this.http.delete<Book>(url, {headers : this.GetHeader(token), params: queryParams});
    }

    GetBookById(url : string, bookId : number, token : string):Observable<Book> {
        let queryParams = new HttpParams();
        queryParams = queryParams.append("bookId", bookId);
        return this.http.get<Book>(url, {headers : this.GetHeader(token), params : queryParams})
    }

    UpdateBook(book: Book, browseUrl : string, token : string):Observable<Book> {
        return this.http.put<Book>(browseUrl, book, {headers : this.GetHeader(token)});
      }
      
    GetHeader(token: string): HttpHeaders {
        return (new HttpHeaders(
            {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }))
    }
}
