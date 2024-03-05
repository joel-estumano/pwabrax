import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelationOrDevolutionPage } from './cancelation-or-devolution.page';

describe('CancelationOrDevolutionPage', () => {
  let component: CancelationOrDevolutionPage;
  let fixture: ComponentFixture<CancelationOrDevolutionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CancelationOrDevolutionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
