import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogisticAddModalPage } from './logistic-add-modal.page';

describe('LogisticAddModalPage', () => {
  let component: LogisticAddModalPage;
  let fixture: ComponentFixture<LogisticAddModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LogisticAddModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
