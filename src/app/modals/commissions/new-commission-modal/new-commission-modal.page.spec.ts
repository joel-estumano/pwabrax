import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCommissionModalPage } from './new-commission-modal.page';

describe('NewCommissionModalPage', () => {
  let component: NewCommissionModalPage;
  let fixture: ComponentFixture<NewCommissionModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewCommissionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
