import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCampaignModalPageRoutingModule } from './new-campaign-modal-routing.module';

import { NewCampaignModalPage } from './new-campaign-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewCampaignModalPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [NewCampaignModalPage]
})
export class NewCampaignModalPageModule {}
