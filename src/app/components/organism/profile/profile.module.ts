import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { MaskModule } from 'src/app/directives/mask/mask.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, IonicModule, FormsModule, MaskModule],
  exports: [ProfileComponent],
  providers: [],
})
export class CustomProfileModule { }
