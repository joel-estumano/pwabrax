import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataDistributionPageRoutingModule } from './data-distribution-routing.module';

import { DataDistributionPage } from './data-distribution.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataDistributionPageRoutingModule
  ],
  declarations: [DataDistributionPage]
})
export class DataDistributionPageModule {}
