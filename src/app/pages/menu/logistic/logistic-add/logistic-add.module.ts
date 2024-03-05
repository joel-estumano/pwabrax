import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogisticAddPageRoutingModule } from './logistic-add-routing.module';

import { LogisticAddPage } from './logistic-add.page';
import { CustomHeaderModule } from 'src/app/components/common/header/header.component.module';
import { CustomSubHeaderModule } from 'src/app/components/common/sub-header/sub-header.component.module';
import { MaskModule } from 'src/app/directives/mask/mask.module';
import { CustomDatePickerModule } from 'src/app/components/common/date-picker/date-picker.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogisticAddPageRoutingModule,
    CustomHeaderModule,
    CustomSubHeaderModule,
    CustomDatePickerModule,
    MaskModule,
  ],
  declarations: [LogisticAddPage],
})
export class LogisticAddPageModule {}
