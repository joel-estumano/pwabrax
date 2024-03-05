import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentDistributionPageRoutingModule } from './payment-distribution-routing.module';

import { PaymentDistributionPage } from './payment-distribution.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentDistributionPageRoutingModule
  ],
  declarations: [PaymentDistributionPage]
})
export class PaymentDistributionPageModule {}
