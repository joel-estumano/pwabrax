import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Step1Component } from './step1.component';

@NgModule({
  declarations: [Step1Component],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [Step1Component],
  providers: [],
})
export class CustomStep1Module {}
