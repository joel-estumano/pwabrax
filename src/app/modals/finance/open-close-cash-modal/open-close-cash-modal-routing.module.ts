import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenCloseCashModalPage } from './open-close-cash-modal.page';

const routes: Routes = [
  {
    path: '',
    component: OpenCloseCashModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenCloseCashModalPageRoutingModule {}
