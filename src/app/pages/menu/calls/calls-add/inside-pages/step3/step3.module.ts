import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Step3Component } from './step3.component';
import { CustomProductsShowcaseModule } from 'src/app/components/organism/products-showcase/products-showcase.module';

@NgModule({
  declarations: [Step3Component],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CustomProductsShowcaseModule,
  ],
  exports: [Step3Component],
  providers: [],
})
export class CustomStep3Module {}
