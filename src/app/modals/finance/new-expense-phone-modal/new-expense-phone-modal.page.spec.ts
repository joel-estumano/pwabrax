import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewExpensePhoneModalPage } from './new-expense-phone-modal.page';

describe('NewExpensePhoneModalPage', () => {
  let component: NewExpensePhoneModalPage;
  let fixture: ComponentFixture<NewExpensePhoneModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewExpensePhoneModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
