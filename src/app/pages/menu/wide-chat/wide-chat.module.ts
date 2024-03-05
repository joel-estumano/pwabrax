import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WideChatPageRoutingModule } from './wide-chat-routing.module';

import { WideChatPage } from './wide-chat.page';
import { CustomHeaderModule } from 'src/app/components/common/header/header.component.module';
import { CustomSubHeaderModule } from 'src/app/components/common/sub-header/sub-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WideChatPageRoutingModule,
    CustomHeaderModule,
    CustomSubHeaderModule,
  ],
  declarations: [WideChatPage],
})
export class WideChatPageModule {}
