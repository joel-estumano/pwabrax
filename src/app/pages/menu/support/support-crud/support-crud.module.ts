import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupportCrudPageRoutingModule } from './support-crud-routing.module';

import { SupportCrudPage } from './support-crud.page';
import { CustomTabsModule } from 'src/app/components/common/custom-tabs/custom-tabs.module';
import { CustomTableModule } from 'src/app/components/common/table/table.module';
import { CustomHeaderModule } from 'src/app/components/common/header/header.component.module';
import { CustomSubHeaderModule } from 'src/app/components/common/sub-header/sub-header.component.module';
import { MaskModule } from 'src/app/directives/mask/mask.module';
import { CustomDatePickerModule } from 'src/app/components/common/date-picker/date-picker.module';
import { CustomChatModule } from '../../calls/calls-add/inside-pages/chat/chat.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupportCrudPageRoutingModule,
    CustomHeaderModule,
    CustomSubHeaderModule,
    MaskModule,
    CustomTableModule,
    CustomDatePickerModule,
    CustomTabsModule,
    CustomChatModule,
  ],
  declarations: [SupportCrudPage],
})
export class SupportCrudPageModule {}
