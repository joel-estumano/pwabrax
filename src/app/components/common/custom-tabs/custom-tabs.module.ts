import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTabsComponent } from './custom-tabs.component';

@NgModule({
  declarations: [CustomTabsComponent],
  imports: [CommonModule, IonicModule],
  exports: [CustomTabsComponent],
  providers: [],
})
export class CustomTabsModule {}
