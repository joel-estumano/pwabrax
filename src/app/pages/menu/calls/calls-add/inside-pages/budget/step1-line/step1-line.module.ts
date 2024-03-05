import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Step1LineComponent } from './step1-line.component';
import { MaskModule } from 'src/app/directives/mask/mask.module';

@NgModule({
  declarations: [Step1LineComponent],
  imports: [CommonModule, IonicModule, FormsModule, MaskModule],
  exports: [Step1LineComponent],
  providers: [],
})
export class CustomBudgetStep1LineModule {}
