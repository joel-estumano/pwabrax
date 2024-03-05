import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewExpenseModalPageRoutingModule } from './new-expense-modal-routing.module';

import { NewExpenseModalPage } from './new-expense-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewExpenseModalPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [NewExpenseModalPage]
})
export class NewExpenseModalPageModule {}
