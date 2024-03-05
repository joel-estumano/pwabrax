import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignsCrudPage } from './campaigns-crud.page';

describe('CampaignsCrudPage', () => {
  let component: CampaignsCrudPage;
  let fixture: ComponentFixture<CampaignsCrudPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CampaignsCrudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
