import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentDistributionPage } from './payment-distribution.page';

describe('PaymentDistributionPage', () => {
  let component: PaymentDistributionPage;
  let fixture: ComponentFixture<PaymentDistributionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaymentDistributionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
