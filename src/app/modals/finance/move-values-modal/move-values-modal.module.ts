import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoveValuesModalPageRoutingModule } from './move-values-modal-routing.module';

import { MoveValuesModalPage } from './move-values-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoveValuesModalPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [MoveValuesModalPage],
})
export class MoveValuesModalPageModule {}
