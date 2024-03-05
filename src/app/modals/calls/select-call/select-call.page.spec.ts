import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectCallPage } from './select-call.page';

describe('SelectCallPage', () => {
  let component: SelectCallPage;
  let fixture: ComponentFixture<SelectCallPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SelectCallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
