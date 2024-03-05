import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Step4Component } from './step4.component';

@NgModule({
  declarations: [Step4Component],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [Step4Component],
  providers: [],
})
export class CustomStep4Module {}
