import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { CustomHeaderModule } from 'src/app/components/common/header/header.component.module';
import { CustomSubHeaderModule } from 'src/app/components/common/sub-header/sub-header.component.module';
import { CustomNotificationLineModule } from 'src/app/components/common/notification-line/notification-line.module';
import { CustomPaginationModule } from 'src/app/components/common/pagination/pagination.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    CustomHeaderModule,
    CustomSubHeaderModule,
    CustomNotificationLineModule,
    CustomPaginationModule,
    NgxChartsModule
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
