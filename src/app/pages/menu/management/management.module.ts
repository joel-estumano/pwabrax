import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagementPageRoutingModule } from './management-routing.module';

import { ManagementPage } from './management.page';
import { CustomHeaderModule } from 'src/app/components/common/header/header.component.module';
import { CustomSubHeaderModule } from 'src/app/components/common/sub-header/sub-header.component.module';
import { CustomTabsModule } from 'src/app/components/common/custom-tabs/custom-tabs.module';
import { CustomTableModule } from 'src/app/components/common/table/table.module';
import { CustomPaginationModule } from 'src/app/components/common/pagination/pagination.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagementPageRoutingModule,
    CustomHeaderModule,
    CustomSubHeaderModule,
    CustomTabsModule,
    CustomTableModule,
    CustomPaginationModule,
    NgxChartsModule,
  ],
  declarations: [ManagementPage],
})
export class ManagementPageModule {}
