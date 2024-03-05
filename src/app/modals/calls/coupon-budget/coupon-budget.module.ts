import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CouponBudgetPageRoutingModule } from './coupon-budget-routing.module';

import { CouponBudgetPage } from './coupon-budget.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CouponBudgetPageRoutingModule
  ],
  declarations: [CouponBudgetPage]
})
export class CouponBudgetPageModule {}
