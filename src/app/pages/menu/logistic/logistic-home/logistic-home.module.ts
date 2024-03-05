import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogisticHomePageRoutingModule } from './logistic-home-routing.module';

import { LogisticHomePage } from './logistic-home.page';
import { CustomTabsModule } from 'src/app/components/common/custom-tabs/custom-tabs.module';
import { CustomHeaderModule } from 'src/app/components/common/header/header.component.module';
import { CustomPaginationModule } from 'src/app/components/common/pagination/pagination.module';
import { CustomSubHeaderModule } from 'src/app/components/common/sub-header/sub-header.component.module';
import { CustomTableModule } from 'src/app/components/common/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogisticHomePageRoutingModule,
    CustomHeaderModule,
    CustomSubHeaderModule,
    CustomTabsModule,
    CustomTableModule,
    CustomPaginationModule,
  ],
  declarations: [LogisticHomePage],
})
export class LogisticHomePageModule {}
