import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExclusionChatComponent } from './exclusion-chat.component';

@NgModule({
  declarations: [ExclusionChatComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [ExclusionChatComponent],
  providers: [],
})
export class CustomExclusionChatModule {}
