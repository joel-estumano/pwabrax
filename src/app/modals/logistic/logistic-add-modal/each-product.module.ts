import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EachProductComponent } from './components/each-product/each-product.component';

@NgModule({
  declarations: [EachProductComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [EachProductComponent],
  providers: [],
})
export class CustomProductLogisticModalModule {}
