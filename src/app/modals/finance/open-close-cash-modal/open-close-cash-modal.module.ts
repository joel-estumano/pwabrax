import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenCloseCashModalPageRoutingModule } from './open-close-cash-modal-routing.module';

import { OpenCloseCashModalPage } from './open-close-cash-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenCloseCashModalPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [OpenCloseCashModalPage]
})
export class OpenCloseCashModalPageModule {}
