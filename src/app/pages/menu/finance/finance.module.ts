import { CustomPaginationModule } from 'src/app/components/common/pagination/pagination.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinancePageRoutingModule } from './finance-routing.module';

import { FinancePage } from './finance.page';
import { CustomHeaderModule } from 'src/app/components/common/header/header.component.module';
import { CustomSubHeaderModule } from 'src/app/components/common/sub-header/sub-header.component.module';
import { CustomTabsModule } from 'src/app/components/common/custom-tabs/custom-tabs.module';
import { CustomTableModule } from 'src/app/components/common/table/table.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinancePageRoutingModule,
    CustomHeaderModule,
    CustomSubHeaderModule,
    CustomTabsModule,
    CustomTableModule,
    CustomPaginationModule,
    NgxChartsModule,
  ],
  declarations: [FinancePage],
})
export class FinancePageModule {}
