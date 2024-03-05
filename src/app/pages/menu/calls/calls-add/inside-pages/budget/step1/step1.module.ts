import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Step1Component } from './step1.component';
import { CustomBudgetStep1LineModule } from '../step1-line/step1-line.module';

@NgModule({
  declarations: [Step1Component],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CustomBudgetStep1LineModule,
  ],
  exports: [Step1Component],
  providers: [],
})
export class CustomBudgetStep1Module {}
