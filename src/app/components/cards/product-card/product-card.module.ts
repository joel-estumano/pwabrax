import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from './product-card.component';

@NgModule({
  declarations: [ProductCardComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [ProductCardComponent],
  providers: [],
})
export class CustomProductCardModule {}
