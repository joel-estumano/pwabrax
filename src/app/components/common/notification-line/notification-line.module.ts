import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationLineComponent } from './notification-line.component';

@NgModule({
  declarations: [NotificationLineComponent],
  imports: [CommonModule, IonicModule],
  exports: [NotificationLineComponent],
  providers: [],
})
export class CustomNotificationLineModule {}
