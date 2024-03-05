import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogisticAddPage } from './logistic-add.page';

const routes: Routes = [
  {
    path: '',
    component: LogisticAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogisticAddPageRoutingModule {}
