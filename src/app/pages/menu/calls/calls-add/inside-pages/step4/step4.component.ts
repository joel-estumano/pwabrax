import { Component, Input } from '@angular/core';
import { SaleClass } from 'src/app/classes/[calls]/sale/sale';
import { PaymentsClass } from 'src/app/classes/payments/payments';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss'],
})
export class Step4Component {
  openDate = false;
  @Input() call;
  constructor(public sales: SaleClass, public payments: PaymentsClass) {}

  pickDate() {
    this.openDate = !this.openDate;
  }

  setDate(event) {
    const date = event.detail.value;
    this.call.date = new Date(date).toLocaleDateString();
  }

  select(event) {
    this.call.payment_method = event.detail.value;
  }

  //   pickDateDelivery() {
  //     this.openDateDelivery = !this.openDateDelivery;
  //   }

  //   setDateDelivery(event) {
  //     const date = event.detail.value;
  //     this.sale.delivery_date = new Date(date).toLocaleDateString();
  //   }
}
