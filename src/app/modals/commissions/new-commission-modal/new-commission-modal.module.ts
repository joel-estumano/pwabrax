import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCommissionModalPageRoutingModule } from './new-commission-modal-routing.module';

import { NewCommissionModalPage } from './new-commission-modal.page';
import { MaskModule } from 'src/app/directives/mask/mask.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewCommissionModalPageRoutingModule,
    ReactiveFormsModule,
    MaskModule,
  ],
  declarations: [NewCommissionModalPage]
})
export class NewCommissionModalPageModule {}
