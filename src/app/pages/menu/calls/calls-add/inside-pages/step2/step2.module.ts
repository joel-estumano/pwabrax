import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Step2Component } from './step2.component';
import { CustomProfileModule } from 'src/app/components/organism/profile/profile.module';

@NgModule({
  declarations: [Step2Component],
  imports: [CommonModule, IonicModule, FormsModule, CustomProfileModule],
  exports: [Step2Component],
  providers: [],
})
export class CustomStep2Module {}
