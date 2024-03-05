import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogisticHomePage } from './logistic-home.page';

describe('LogisticHomePage', () => {
  let component: LogisticHomePage;
  let fixture: ComponentFixture<LogisticHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LogisticHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
