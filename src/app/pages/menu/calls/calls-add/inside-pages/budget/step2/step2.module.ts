import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Step2Component } from './step2.component';

@NgModule({
  declarations: [Step2Component],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [Step2Component],
  providers: [],
})
export class CustomBudgetStep2Module {}
