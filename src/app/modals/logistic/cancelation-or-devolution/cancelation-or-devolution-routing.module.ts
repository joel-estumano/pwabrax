import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelationOrDevolutionPage } from './cancelation-or-devolution.page';

const routes: Routes = [
  {
    path: '',
    component: CancelationOrDevolutionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelationOrDevolutionPageRoutingModule {}
