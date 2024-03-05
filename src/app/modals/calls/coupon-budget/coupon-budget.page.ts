import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-coupon-budget',
  templateUrl: './coupon-budget.page.html',
  styleUrls: ['./coupon-budget.page.scss'],
})
export class CouponBudgetPage implements OnDestroy {
  code: string;
  send;
  constructor() {}

  ngOnDestroy(): void {
    this.code = '';
  }
}
