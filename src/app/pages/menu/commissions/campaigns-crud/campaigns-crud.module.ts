import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampaignsCrudPageRoutingModule } from './campaigns-crud-routing.module';

import { CampaignsCrudPage } from './campaigns-crud.page';
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
    CampaignsCrudPageRoutingModule,
    CustomHeaderModule,
    CustomSubHeaderModule,
    CustomTabsModule,
    MaskModule,
    CustomTableModule,
  ],
  declarations: [CampaignsCrudPage]
})
export class CampaignsCrudPageModule {}
