import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogisticAddModalPageRoutingModule } from './logistic-add-modal-routing.module';

import { LogisticAddModalPage } from './logistic-add-modal.page';
import { CustomProductLogisticModalModule } from './each-product.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogisticAddModalPageRoutingModule,
    CustomProductLogisticModalModule,
  ],
  declarations: [LogisticAddModalPage],
})
export class LogisticAddModalPageModule {}
