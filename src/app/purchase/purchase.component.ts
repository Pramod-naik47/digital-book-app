import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book-model';
import { Payment } from '../models/purchase';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from '../services/book-service';
import { PaymentService } from '../services/purchase-service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  paramBookId : number = 0;
  token : string = '';

  bookObject: Book = {
    bookId: 0,
    bookTitle: '',
    category: '',
    price: 0,
    publisher: '',
    content: '',
    active: false
  };

  paymentObject: Payment = {
    paymentId: 0,
    email: '',
    bookId: 0
  };

  constructor(private router : Router, 
              private activatedRoute : ActivatedRoute, 
              private bookService : BookService,
              private paymentService : PaymentService) { }

  ngOnInit(): void {
    this.paramBookId = this.activatedRoute.snapshot.params['bookId']
    this.token = localStorage.getItem('token')!; 
    this.GetBookById();
  }

  GetBookById(){
    this.bookService.GetBookById('https://localhost:7151/api/v1/digitalbooks/author/getBookById', this.paramBookId, this.token).
    subscribe(
      res => {
        this.bookObject = res;
        this.paymentObject = {
          paymentId: 0,
          email: '',
          bookId: res.bookId
        };
      }
    )
  }

  PurchaseBook(): void {
    this.paymentService.PurchaseBook(this.paymentObject, 'https://localhost:7151/api/v1/digitalbooks/books/purchaseBook')
    .subscribe(
      res => {
        console.log(JSON.stringify(res));
        this.router.navigate([''])
      }
    )
  }

}
