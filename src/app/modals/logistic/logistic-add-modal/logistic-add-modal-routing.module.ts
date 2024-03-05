import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogisticAddModalPage } from './logistic-add-modal.page';

const routes: Routes = [
  {
    path: '',
    component: LogisticAddModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogisticAddModalPageRoutingModule {}
