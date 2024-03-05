import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenCloseCashModalPage } from './open-close-cash-modal.page';

describe('OpenCloseCashModalPage', () => {
  let component: OpenCloseCashModalPage;
  let fixture: ComponentFixture<OpenCloseCashModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OpenCloseCashModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
