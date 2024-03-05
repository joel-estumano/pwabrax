import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectCallPageRoutingModule } from './select-call-routing.module';

import { SelectCallPage } from './select-call.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectCallPageRoutingModule
  ],
  declarations: [SelectCallPage]
})
export class SelectCallPageModule {}
