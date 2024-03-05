import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotComponent } from './forgot.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ForgotComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [ForgotComponent],
  providers: [],
})
export class CustomForgotModule {}
