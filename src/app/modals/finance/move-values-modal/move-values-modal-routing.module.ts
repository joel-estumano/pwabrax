import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoveValuesModalPage } from './move-values-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MoveValuesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoveValuesModalPageRoutingModule {}
