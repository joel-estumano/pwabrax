import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResponsibleModalPageRoutingModule } from './responsible-modal-routing.module';

import { ResponsibleModalPage } from './responsible-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResponsibleModalPageRoutingModule
  ],
  declarations: [ResponsibleModalPage]
})
export class ResponsibleModalPageModule {}
