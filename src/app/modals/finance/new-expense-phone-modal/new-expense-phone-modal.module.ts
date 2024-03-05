import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewExpensePhoneModalPageRoutingModule } from './new-expense-phone-modal-routing.module';

import { NewExpensePhoneModalPage } from './new-expense-phone-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewExpensePhoneModalPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [NewExpensePhoneModalPage],
})
export class NewExpensePhoneModalPageModule {}
