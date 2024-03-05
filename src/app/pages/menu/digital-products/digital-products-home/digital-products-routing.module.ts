import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DigitalProductsPage } from './digital-products.page';

const routes: Routes = [
  {
    path: '',
    component: DigitalProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DigitalProductsPageRoutingModule {}
