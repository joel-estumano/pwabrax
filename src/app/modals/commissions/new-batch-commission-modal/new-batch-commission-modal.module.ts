import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewBatchCommissionModalPageRoutingModule } from './new-batch-commission-modal-routing.module';

import { NewBatchCommissionModalPage } from './new-batch-commission-modal.page';
import { MaskModule } from 'src/app/directives/mask/mask.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewBatchCommissionModalPageRoutingModule,
    ReactiveFormsModule,
    MaskModule,
  ],
  declarations: [NewBatchCommissionModalPage]
})
export class NewBatchCommissionModalPageModule {}
