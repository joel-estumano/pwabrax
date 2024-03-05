import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicContractComponent } from './dynamic-contract.component';

@NgModule({
  declarations: [DynamicContractComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [DynamicContractComponent],
  providers: [DatePipe],
})
export class CustomDynamicContractModule {}
