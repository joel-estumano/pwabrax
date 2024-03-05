import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupportPageRoutingModule } from './support-routing.module';

import { SupportPage } from './support.page';
import { CustomHeaderModule } from 'src/app/components/common/header/header.component.module';
import { CustomSubHeaderModule } from 'src/app/components/common/sub-header/sub-header.component.module';
import { CustomTabsModule } from 'src/app/components/common/custom-tabs/custom-tabs.module';
import { CustomTableModule } from 'src/app/components/common/table/table.module';
import { CustomPaginationModule } from 'src/app/components/common/pagination/pagination.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupportPageRoutingModule,
    CustomHeaderModule,
    CustomSubHeaderModule,
    CustomTabsModule,
    CustomTableModule,
    CustomPaginationModule,
  ],
  declarations: [SupportPage],
})
export class SupportPageModule {}
