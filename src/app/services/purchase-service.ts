import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book-model';
import { User } from '../models/loginmodel';
import { Payment } from '../models/purchase';

@Injectable({
    providedIn: 'root'
  })
  
  export class PaymentService {
    constructor(private http: HttpClient) { }
    
    PurchaseBook(payment: Payment, url: string):Observable<Payment> {
        return this.http.post<Payment>(url, payment);
    }

    GetBookById(url : string, bookId : number):Observable<Book> {
      let queryParams = new HttpParams();
      queryParams = queryParams.append("bookId", bookId);
      return this.http.get<Book>(url, {params : queryParams})
  }
  }