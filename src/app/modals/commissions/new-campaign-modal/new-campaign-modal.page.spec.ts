import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCampaignModalPage } from './new-campaign-modal.page';

describe('NewCampaignModalPage', () => {
  let component: NewCampaignModalPage;
  let fixture: ComponentFixture<NewCampaignModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewCampaignModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
