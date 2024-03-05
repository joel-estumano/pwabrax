import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoicePaymentModalPage } from './invoice-payment-modal.page';

const routes: Routes = [
  {
    path: '',
    component: InvoicePaymentModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicePaymentModalPageRoutingModule {}
