import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewReceivementsModalPage } from './new-receivements-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NewReceivementsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewReceivementsModalPageRoutingModule {}
