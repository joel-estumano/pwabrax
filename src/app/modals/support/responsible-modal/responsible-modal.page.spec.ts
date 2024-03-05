import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponsibleModalPage } from './responsible-modal.page';

describe('ResponsibleModalPage', () => {
  let component: ResponsibleModalPage;
  let fixture: ComponentFixture<ResponsibleModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ResponsibleModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
