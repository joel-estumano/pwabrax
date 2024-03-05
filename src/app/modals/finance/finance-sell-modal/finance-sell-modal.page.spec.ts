import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinanceSellModalPage } from './finance-sell-modal.page';

describe('FinanceSellModalPage', () => {
  let component: FinanceSellModalPage;
  let fixture: ComponentFixture<FinanceSellModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FinanceSellModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
