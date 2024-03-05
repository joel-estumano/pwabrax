import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommissionsCrudPage } from './commissions-crud.page';

const routes: Routes = [
  {
    path: '',
    component: CommissionsCrudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommissionsCrudPageRoutingModule {}
