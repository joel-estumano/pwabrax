import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewExpensePhoneModalPage } from './new-expense-phone-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NewExpensePhoneModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewExpensePhoneModalPageRoutingModule {}
