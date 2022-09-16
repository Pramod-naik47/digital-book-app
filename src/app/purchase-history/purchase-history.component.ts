import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PurchaseService } from '../services/purchase/purchase.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { VBookPayment } from '../models/book-payment-model';
import { NotificationService } from '../services/notificationservice/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
import { jsPDF} from 'jspdf'
import html2canvas from 'html2canvas';
import { MatSort } from '@angular/material/sort';

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
    paymentDate: new Date,
    email :  '',
    userName : '',
    phoneNumber : 0
  }
  message: any = '';

  displayedColumns: string[] = ['bookLogo','bookTitle', 'publisher', 'price', 'purchaseDate', 'actions'];
  modalRef!: BsModalRef;
  constructor(private purchaseService: PurchaseService,
    private modalService: BsModalService,
    private notificationService: NotificationService,
    private loginService : LoginService,
    private router : Router) { }
  token = '';
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

  pageSizes = [3, 5, 7];

  ngOnInit(): void {
    if (!this.loginService.ValidateLoggedInReader()){
       this.router.navigate([''])
    } else {
      this.token = localStorage.getItem('token')!;
      this.GetPaymentHistory();
    }
  }

  GetPaymentHistory() {
    this.purchaseService.GetPymemtHistory('https://localhost:7151/api/v1/digitalbooks/books/getPaymentHistory', this.token).
      subscribe(
        res => {
          debugger;
          if (res != null) {
            this.payments = res;
            this.dataSource = new MatTableDataSource(this.payments);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
            this.dataSource = new MatTableDataSource(this.payments)
          }
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

  DownloadInvoice() {
    let pdf = new jsPDF();
    let data = document.getElementById("divInvoice");
    if (data != null) {
      html2canvas(data).then(
        canvas => {
          const contentDataURL = canvas.toDataURL('image/png')
          let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
          var width = pdf.internal.pageSize.getWidth();
          var height = canvas.height * width / canvas.width;
          pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
          pdf.save('invoice.pdf'); // Generated PDF
        }
      )
    }
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
