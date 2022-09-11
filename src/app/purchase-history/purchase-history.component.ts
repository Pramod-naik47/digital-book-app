import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Book } from '../models/book-model';
import { Payment } from '../models/purchase';
import { PaymentService } from '../services/purchase-service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { VBookPayment } from '../models/book-payment-model';
import { NotificationService } from '../services/notificationservice/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  payments: VBookPayment[] = [];
  paymentObject: VBookPayment = {
    bookId: 0,
    bookTitle: '',
    category: '',
    price: 0,
    content: '',
    active: false,
    createdDate: new Date,
    publishDate: new Date,
    publisher: '',
    paymentId: 0,
    email: '',
    paymentDate: new Date
  }
  message: any = '';

  displayedColumns: string[] = ['bookTitle', 'price', 'purchaseDate', 'actions'];
  modalRef!: BsModalRef;
  constructor(private purchaseService: PaymentService,
    private modalService: BsModalService,
    private notificationService: NotificationService) { }
  token = '';
  dataSource!: MatTableDataSource<any>;
  dataSourceWithPageSize = new  MatTableDataSource(this.payments);

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize!: MatPaginator;

  pageSizes = [3, 5, 7];

  ngAfterViewInit() {
    
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')!;
    this.GetPaymentHistory();
    
  }


  GetPaymentHistory() {
    this.purchaseService.GetPymemtHistory('https://localhost:7151/api/v1/digitalbooks/books/getPaymentHistory', this.token).
      subscribe(
        res => {
          this.payments = res;
          console.log(this.payments)
          this.dataSource = new MatTableDataSource(this.payments);
          this.dataSource.paginator = this.paginator;
          this.dataSourceWithPageSize.paginator = this.paginatorPageSize;
        }
      )
  }




  OpenInvoiceModel(template: TemplateRef<any>, bookId: number) {
    this.purchaseService.GetBookByIdForPayment('https://localhost:7151/api/v1/digitalbooks/books/getBookByIdForPayment', bookId, this.token).
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

  GetRefund(paymentId: number, paymentDate: Date) {
    let purchaseDate = new Date(paymentDate);
    let currentDate = new Date();
    let timedifferenceInSecond = Math.round((currentDate.getTime() - purchaseDate.getTime()) / 1000)

    if (timedifferenceInSecond < 86400) {
      this.purchaseService.GetRefund('https://localhost:7151/api/v1/digitalbooks/books/getRefund', paymentId, this.token)
        .subscribe(
          res => {
            this.message = res;
            this.notificationService.showSuccess(this.message.join(''), "Book App");
            this.GetPaymentHistory();
          }
        )
    } else {
      this.notificationService.showWarning("After 24 hours no refund will be given", "Book app");
    }
  }

  ReadBook(template: TemplateRef<any>, bookId: number) {
    this.purchaseService.GetBookByIdForPayment('https://localhost:7151/api/v1/digitalbooks/books/getBookByIdForPayment', bookId, this.token).
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
