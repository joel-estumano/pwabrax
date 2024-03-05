import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataDistributionPage } from './data-distribution.page';

const routes: Routes = [
  {
    path: '',
    component: DataDistributionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataDistributionPageRoutingModule {}
