import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationsCrudPageRoutingModule } from './registrations-crud-routing.module';

import { RegistrationsCrudPage } from './registrations-crud.page';
import { CustomHeaderModule } from 'src/app/components/common/header/header.component.module';
import { CustomSubHeaderModule } from 'src/app/components/common/sub-header/sub-header.component.module';
import { CustomTabsModule } from 'src/app/components/common/custom-tabs/custom-tabs.module';
import { MaskModule } from 'src/app/directives/mask/mask.module';
import { CustomTableModule } from 'src/app/components/common/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationsCrudPageRoutingModule,
    CustomHeaderModule,
    CustomSubHeaderModule,
    CustomTabsModule,
    MaskModule,
    CustomTableModule,
  ],
  declarations: [RegistrationsCrudPage],
})
export class RegistrationsCrudPageModule {}
