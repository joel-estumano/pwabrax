import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationsPage } from './registrations.page';

describe('RegistrationsPage', () => {
  let component: RegistrationsPage;
  let fixture: ComponentFixture<RegistrationsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistrationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
