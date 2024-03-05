import { CustomTableModule } from 'src/app/components/common/table/table.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Step5Component } from './step5.component';

@NgModule({
  declarations: [Step5Component],
  imports: [CommonModule, IonicModule, FormsModule, CustomTableModule],
  exports: [Step5Component],
  providers: [],
})
export class CustomStep5Module {}
