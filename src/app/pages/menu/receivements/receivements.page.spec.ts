import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceivementsPage } from './receivements.page';

describe('ReceivementsPage', () => {
  let component: ReceivementsPage;
  let fixture: ComponentFixture<ReceivementsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReceivementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
