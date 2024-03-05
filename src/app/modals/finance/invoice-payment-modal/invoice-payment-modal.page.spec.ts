import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoicePaymentModalPage } from './invoice-payment-modal.page';

describe('InvoicePaymentModalPage', () => {
  let component: InvoicePaymentModalPage;
  let fixture: ComponentFixture<InvoicePaymentModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InvoicePaymentModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
