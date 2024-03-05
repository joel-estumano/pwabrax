import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CallsAddPageRoutingModule } from './calls-add-routing.module';

import { CallsAddPage } from './calls-add.page';
import { CustomHeaderModule } from 'src/app/components/common/header/header.component.module';
import { CustomSubHeaderModule } from 'src/app/components/common/sub-header/sub-header.component.module';
import { CustomTableModule } from 'src/app/components/common/table/table.module';
import { MaskModule } from 'src/app/directives/mask/mask.module';
import { CustomTabsModule } from 'src/app/components/common/custom-tabs/custom-tabs.module';
import { CustomProfileModule } from 'src/app/components/organism/profile/profile.module';
import { CustomProductsShowcaseModule } from 'src/app/components/organism/products-showcase/products-showcase.module';
import { CustomStep1Module } from './inside-pages/step1/step1.module';
import { CustomStep2Module } from './inside-pages/step2/step2.module';
import { CustomStep3Module } from './inside-pages/step3/step3.module';
import { CustomStep4Module } from './inside-pages/step4/step4.module';
import { CustomStep5Module } from './inside-pages/step5/step5.module';
import { CustomStep6Module } from './inside-pages/step6/step6.module';
import { CustomChatModule } from './inside-pages/chat/chat.module';
import { CustomBudgetStep1Module } from './inside-pages/budget/step1/step1.module';
import { CustomBudgetStep2Module } from './inside-pages/budget/step2/step2.module';
import { CustomExclusionChatModule } from './inside-pages/exclusion-chat/exclusion-chat.module';
import { CustomDynamicContractModule } from './inside-pages/dynamic-contract/dynamic-contract.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CallsAddPageRoutingModule,
    CustomHeaderModule,
    CustomSubHeaderModule,
    MaskModule,
    CustomTableModule,
    CustomTabsModule,
    CustomProfileModule,
    CustomProductsShowcaseModule,
    CustomStep1Module,
    CustomStep2Module,
    CustomStep3Module,
    CustomStep4Module,
    CustomStep5Module,
    CustomStep6Module,
    CustomChatModule,
    CustomBudgetStep1Module,
    CustomBudgetStep2Module,
    CustomExclusionChatModule,
    CustomDynamicContractModule
  ],
  declarations: [CallsAddPage],
})
export class CallsAddPageModule {}
