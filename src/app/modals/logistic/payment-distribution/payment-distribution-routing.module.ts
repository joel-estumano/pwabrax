import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentDistributionPage } from './payment-distribution.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentDistributionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentDistributionPageRoutingModule {}
