import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommissionsCrudPageRoutingModule } from './commissions-crud-routing.module';

import { CommissionsCrudPage } from './commissions-crud.page';
import { CustomTabsModule } from 'src/app/components/common/custom-tabs/custom-tabs.module';
import { CustomHeaderModule } from 'src/app/components/common/header/header.component.module';
import { CustomSubHeaderModule } from 'src/app/components/common/sub-header/sub-header.component.module';
import { CustomTableModule } from 'src/app/components/common/table/table.module';
import { MaskModule } from 'src/app/directives/mask/mask.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommissionsCrudPageRoutingModule,
    CustomHeaderModule,
    CustomSubHeaderModule,
    CustomTabsModule,
    MaskModule,
    CustomTableModule,
  ],
  declarations: [CommissionsCrudPage]
})
export class CommissionsCrudPageModule {}
