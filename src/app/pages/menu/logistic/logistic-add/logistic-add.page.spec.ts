import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogisticAddPage } from './logistic-add.page';

describe('LogisticAddPage', () => {
  let component: LogisticAddPage;
  let fixture: ComponentFixture<LogisticAddPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LogisticAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
