import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubHeaderComponent } from './sub-header.component';

@NgModule({
  declarations: [SubHeaderComponent],
  imports: [CommonModule, IonicModule],
  exports: [SubHeaderComponent],
  providers: [],
})
export class CustomSubHeaderModule {}
