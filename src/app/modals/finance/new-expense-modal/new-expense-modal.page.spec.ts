import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewExpenseModalPage } from './new-expense-modal.page';

describe('NewExpenseModalPage', () => {
  let component: NewExpenseModalPage;
  let fixture: ComponentFixture<NewExpenseModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewExpenseModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
