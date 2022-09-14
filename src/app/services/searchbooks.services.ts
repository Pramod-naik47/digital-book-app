import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VBook2User } from '../models/book2-user-model';
import { LoginService } from './loginservice';

@Injectable({
  providedIn: 'root'
})
export class SearchBooksService {
  
 

  constructor(private http: HttpClient, 
    private loginService : LoginService) { }
    baseUrl = '';
    

  //Get all books
  SearchBook(serachCriteria: VBook2User, token : string):Observable<VBook2User[]>{
    let queryParams = new HttpParams();
      queryParams = queryParams.append("bookTitle",serachCriteria.bookTitle);
      queryParams = queryParams.append("category",serachCriteria.category);
      queryParams = queryParams.append("author",serachCriteria.userName);
      queryParams = queryParams.append("price",serachCriteria.price);
      queryParams = queryParams.append("publisher",serachCriteria.publisher);

      let header = new HttpHeaders(
        {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        })

        if (this.loginService.GetUserType() == "Author") {
          this.baseUrl = 'https://localhost:7151/api/v1/digitalbooks/author/getBooksForAuthor'
        } else if (this.loginService.GetUserType() == "Reader") {
          this.baseUrl = 'https://localhost:7151/api/v1/digitalbooks/books/search';
        }

      return this.http.get<VBook2User[]>(this.baseUrl,{params:queryParams, headers : header});
  }
}
