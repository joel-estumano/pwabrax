import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataDistributionPage } from './data-distribution.page';

describe('DataDistributionPage', () => {
  let component: DataDistributionPage;
  let fixture: ComponentFixture<DataDistributionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DataDistributionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
