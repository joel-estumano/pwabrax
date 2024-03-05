import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsShowcaseComponent } from './products-showcase.component';
import { CustomProductCardModule } from '../../cards/product-card/product-card.module';

@NgModule({
  declarations: [ProductsShowcaseComponent],
  imports: [CommonModule, IonicModule, FormsModule, CustomProductCardModule],
  exports: [ProductsShowcaseComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomProductsShowcaseModule {}
