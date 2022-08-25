import { Component, OnInit, TemplateRef } from '@angular/core';
import { Book } from '../models/book-model';
import { Payment } from '../models/purchase';
import { PaymentService } from '../services/purchase-service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';  
import { VBookPayment } from '../models/book-payment-model';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  payments : VBookPayment[] = [];
  paymentObject : VBookPayment = {
    bookId: 0,
    bookTitle: '',
    category: '',
    price: 0,
    content: '',
    active: false,
    createdDate: new Date,
    publishDate: new Date,
    publisher: '',
    paymentId:0,
    email: '',
    paymentDate: new Date
}

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
    this.purchaseService.GetBookByIdForPayment('https://localhost:7151/api/v1/digitalbooks/books/getBookByIdForPayment', bookId).
      subscribe(
        res => {
          this.paymentObject = res;

          this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-lg' })
          );
        }
      )
  }
}
