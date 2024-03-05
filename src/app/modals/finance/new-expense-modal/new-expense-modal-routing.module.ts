import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewExpenseModalPage } from './new-expense-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NewExpenseModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewExpenseModalPageRoutingModule {}
