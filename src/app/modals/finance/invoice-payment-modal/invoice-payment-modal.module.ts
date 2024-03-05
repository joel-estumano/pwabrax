import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoicePaymentModalPageRoutingModule } from './invoice-payment-modal-routing.module';

import { InvoicePaymentModalPage } from './invoice-payment-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoicePaymentModalPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [InvoicePaymentModalPage],
})
export class InvoicePaymentModalPageModule {}
