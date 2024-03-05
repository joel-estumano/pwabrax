import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationsCrudPage } from './registrations-crud.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationsCrudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationsCrudPageRoutingModule {}
