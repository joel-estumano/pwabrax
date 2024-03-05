import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinanceSellModalPageRoutingModule } from './finance-sell-modal-routing.module';

import { FinanceSellModalPage } from './finance-sell-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinanceSellModalPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [FinanceSellModalPage],
})
export class FinanceSellModalPageModule {}
