import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DigitalProductsCrudPageRoutingModule } from './digital-products-crud-routing.module';

import { DigitalProductsCrudPage } from './digital-products-crud.page';
import { CustomHeaderModule } from 'src/app/components/common/header/header.component.module';
import { CustomSubHeaderModule } from 'src/app/components/common/sub-header/sub-header.component.module';
import { CustomTableModule } from 'src/app/components/common/table/table.module';
import { MaskModule } from 'src/app/directives/mask/mask.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DigitalProductsCrudPageRoutingModule,
    CustomHeaderModule,
    CustomSubHeaderModule,
    MaskModule,
    CustomTableModule,
  ],
  declarations: [DigitalProductsCrudPage],
})
export class DigitalProductsCrudPageModule {}
