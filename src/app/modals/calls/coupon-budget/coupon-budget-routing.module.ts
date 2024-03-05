import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouponBudgetPage } from './coupon-budget.page';

const routes: Routes = [
  {
    path: '',
    component: CouponBudgetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouponBudgetPageRoutingModule {}
