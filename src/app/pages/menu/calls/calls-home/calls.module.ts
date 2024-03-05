import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CallsPageRoutingModule } from './calls-routing.module';

import { CallsPage } from './calls.page';
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
    CallsPageRoutingModule,
    CustomHeaderModule,
    CustomSubHeaderModule,
    CustomTabsModule,
    CustomTableModule,
    CustomPaginationModule,
  ],
  declarations: [CallsPage],
})
export class CallsPageModule {}
