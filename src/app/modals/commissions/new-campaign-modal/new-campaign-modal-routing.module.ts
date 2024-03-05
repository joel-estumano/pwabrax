import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCampaignModalPage } from './new-campaign-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NewCampaignModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCampaignModalPageRoutingModule {}
