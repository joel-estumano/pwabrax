import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancelationOrDevolutionPageRoutingModule } from './cancelation-or-devolution-routing.module';

import { CancelationOrDevolutionPage } from './cancelation-or-devolution.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancelationOrDevolutionPageRoutingModule
  ],
  declarations: [CancelationOrDevolutionPage]
})
export class CancelationOrDevolutionPageModule {}
