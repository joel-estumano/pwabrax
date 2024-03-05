import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceivementsPage } from './receivements.page';

const routes: Routes = [
  {
    path: '',
    component: ReceivementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceivementsPageRoutingModule {}
