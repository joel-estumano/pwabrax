import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewReceivementsModalPage } from './new-receivements-modal.page';

describe('NewReceivementsModalPage', () => {
  let component: NewReceivementsModalPage;
  let fixture: ComponentFixture<NewReceivementsModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewReceivementsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
