import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-exclusion-chat',
  templateUrl: './exclusion-chat.component.html',
  styleUrls: ['./exclusion-chat.component.scss'],
})
export class ExclusionChatComponent {
  comment = '';
  @Input() justifications;
  @Output() event: any = new EventEmitter();

  constructor(private screen: ScreenService) {}
  send() {
    if (this.comment.length > 0) {
      this.event.emit(this.comment);
      this.comment = '';
    } else {
      this.screen.presentToast('Digite uma mensagem para enviar');
    }
  }

  del(item) {
    this.justifications = this.justifications
      .map((each, index) => {
        if (item !== index) return each;
      })
      .filter((e) => {
        if (e) return e;
      });
  }
}
