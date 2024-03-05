import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserClass } from 'src/app/classes/user/user';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  comment = '';
  @Input() call;
  @Output() event: any = new EventEmitter();
  constructor(private screen: ScreenService, public user: UserClass) {}

  getDate(date) {
    const customDate = date.seconds ? date.seconds * 1000 : date;
    return (
      new Date(customDate).toLocaleDateString('pt-BR') +
      ' ' +
      new Date(customDate).toLocaleTimeString('pt-BR')
    );
  }

  send() {
    if (this.comment.length > 0) {
      this.event.emit(this.comment);
      this.comment = '';
    } else {
      this.screen.presentToast('Digite uma mensagem para enviar');
    }
  }

  del(item) {
    this.call.comments = this.call.comments
      .map((each, index) => {
        if (item !== index) return each;
      })
      .filter((e) => {
        if (e) return e;
      });
  }
}
