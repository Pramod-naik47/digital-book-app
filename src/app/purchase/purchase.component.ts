import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book-model';
import { Payment } from '../models/purchase';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseService } from '../services/purchase/purchase.service';
import { NotificationService } from '../services/notificationservice/notification.service';
import { LoginService } from '../services/login/login.service';

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
    bookId: 0,
    paymentDate : new Date
  };

  message : any = '';
  constructor(private router : Router, 
              private activatedRoute : ActivatedRoute, 
              private paymentService : PurchaseService,
              private notificationService : NotificationService,
              private loginService : LoginService ) { }

  ngOnInit(): void {
    if (!this.loginService.ValidateLoggedInReader()) {
      this.router.navigate([''])
    } else {
      this.paramBookId = this.activatedRoute.snapshot.params['bookId']
      this.token = localStorage.getItem('token')!;
      this.GetBookById();
    }
  }

  GetBookById(){
    this.paymentService.GetBookById('https://localhost:7151/api/v1/digitalbooks/books/getBookById', this.paramBookId, this.token).
    subscribe(
      res => {
        this.bookObject = res;
        this.paymentObject = {
          paymentId: 0,
          bookId: res.bookId,
          paymentDate : new Date
        };
      }
    )
  }

  PurchaseBook(): void {
    this.paymentService.PurchaseBook(this.paymentObject, 'https://localhost:7151/api/v1/digitalbooks/books/purchaseBook', this.token)
    .subscribe(
      res => {
        this.message = res;
        this.notificationService.showSuccess("Purchase successfull", "Book app");
        this.router.navigate(['purchase-history'])
      }
    )
  }
}
