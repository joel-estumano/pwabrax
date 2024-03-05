import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewReceivementsModalPageRoutingModule } from './new-receivements-modal-routing.module';

import { NewReceivementsModalPage } from './new-receivements-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewReceivementsModalPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [NewReceivementsModalPage]
})
export class NewReceivementsModalPageModule {}
