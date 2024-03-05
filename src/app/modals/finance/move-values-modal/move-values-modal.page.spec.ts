import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoveValuesModalPage } from './move-values-modal.page';

describe('MoveValuesModalPage', () => {
  let component: MoveValuesModalPage;
  let fixture: ComponentFixture<MoveValuesModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MoveValuesModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
