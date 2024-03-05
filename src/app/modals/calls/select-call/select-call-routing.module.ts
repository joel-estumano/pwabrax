import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectCallPage } from './select-call.page';

const routes: Routes = [
  {
    path: '',
    component: SelectCallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectCallPageRoutingModule {}
