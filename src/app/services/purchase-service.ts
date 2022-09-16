import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book-model';
import { VBookPayment } from '../models/book-payment-model';
import { User } from '../models/loginmodel';
import { Payment } from '../models/purchase';

@Injectable({
  providedIn: 'root'
})

export class PaymentService {
  constructor(private http: HttpClient) { }

  PurchaseBook(payment: Payment, url: string, token : string): Observable<Payment> {
    return this.http.post<Payment>(url, payment, { headers : this.GetHeader(token) });
  }

  GetBookById(url: string, bookId: number, token : string): Observable<Book> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("bookId", bookId);
    return this.http.get<Book>(url, { params: queryParams, headers : this.GetHeader(token) });
  }

  GetBookByIdForPayment(url: string, bookId: number, token : string): Observable<VBookPayment> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("bookId", bookId);
    return this.http.get<VBookPayment>(url, { params: queryParams, headers : this.GetHeader(token) });
  }


  GetPymemtHistory(url: string, token : string): Observable<VBookPayment[]> {
    return this.http.get<VBookPayment[]>(url, {headers : this.GetHeader(token)});
  }

  
  GetRefund(url: string, paymentId: number, token : string): Observable<Payment> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("paymentId", paymentId);
    return this.http.delete<Payment>(url, { params: queryParams, headers : this.GetHeader(token) });
  }

  GetHeader(token: string): HttpHeaders {
    return (new HttpHeaders(
        {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }))
}
}