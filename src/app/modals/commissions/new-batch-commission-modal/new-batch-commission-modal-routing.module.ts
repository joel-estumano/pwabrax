import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewBatchCommissionModalPage } from './new-batch-commission-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NewBatchCommissionModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewBatchCommissionModalPageRoutingModule {}
