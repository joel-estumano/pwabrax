import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinanceSellModalPage } from './finance-sell-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FinanceSellModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceSellModalPageRoutingModule {}
