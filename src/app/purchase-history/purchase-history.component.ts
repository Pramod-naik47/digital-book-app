import { Component, OnInit, TemplateRef } from '@angular/core';
import { Book } from '../models/book-model';
import { Payment } from '../models/purchase';
import { PaymentService } from '../services/purchase-service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';  

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  payments : Payment[] = [];
  paymentObject : Payment = {
    paymentId : 0,
    email : '',
    bookId : 0,
    paymentDate : new Date
  };

  bookObject : Book = {
    bookId : 0,
    bookTitle : '',
    category: '',
    price : 0,
    publisher : '',
    content : '',
    active : false
  };


  modalRef!: BsModalRef; 
  constructor(private purchaseService : PaymentService,
             private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  GetPaymentHistory(){
    this.purchaseService.GetPymemtHistory('https://localhost:7151/api/v1/digitalbooks/books/getPaymentHistory', this.paymentObject.email).
    subscribe( 
      res => {
        this.payments = res;
      }
    )
  }

  OpenInvoiceModel(template: TemplateRef<any>, bookId: number) {
    this.purchaseService.GetBookById('https://localhost:7151/api/v1/digitalbooks/books/getBookById', bookId).
      subscribe(
        res => {
          this.bookObject = res;

          this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-lg' })
          );
        }
      )
  }
}
