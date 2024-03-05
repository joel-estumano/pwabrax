import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCommissionModalPage } from './new-commission-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NewCommissionModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCommissionModalPageRoutingModule {}
