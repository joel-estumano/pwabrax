import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewBatchCommissionModalPage } from './new-batch-commission-modal.page';

describe('NewBatchCommissionModalPage', () => {
  let component: NewBatchCommissionModalPage;
  let fixture: ComponentFixture<NewBatchCommissionModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewBatchCommissionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
