import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CouponBudgetPage } from './coupon-budget.page';

describe('CouponBudgetPage', () => {
  let component: CouponBudgetPage;
  let fixture: ComponentFixture<CouponBudgetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CouponBudgetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
