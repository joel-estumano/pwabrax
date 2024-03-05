import { Component, Input } from '@angular/core';
import { ContractClass } from 'src/app/classes/contract/contract';
import { NotificationsClass } from 'src/app/classes/notifications/notifications';
import { UserClass } from 'src/app/classes/user/user';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.scss'],
})
export class Step6Component {
  currentContract = 1;
  @Input() id: string;
  @Input() call;
  @Input() sign = false;
  constructor(
    public contract: ContractClass,
    public user: UserClass,
    private notification: NotificationsClass,
    private navigation: NavigationService
  ) {
    console.log("Contrato: ", this.contract);
  }

  signClick() {
    this.changeContract(1);
    if (this.currentContract === this.contract.value.length) {
      this.sign = true;
    }
  }

  changeContract(add) {
    this.currentContract += add;
  }

  approve() {
    this.contract.update({ approved: 2 }, this.id).then(() => {
      this.notification
        .add({
          user_id: this.call.user_id,
          client_id: this.call.client_id,
          type: 'Venda Aprovada',
          date: new Date(),
          read: false,
          text: `Parabéns! A venda do cliente ${this.call.client.name} foi aprovada.`,
        })
        .then(() => {
          this.navigation.goTo('calls-home');
        });
    });
  }

  reprove() {
    this.contract.update({ approved: 1 }, this.id).then(() => {
      this.notification
        .add({
          user_id: this.call.user_id,
          client_id: this.call.client_id,
          data_id: this.id,
          type: 'Venda Recusada',
          date: new Date(),
          read: false,
          text: `Que Pena! A venda do cliente ${
            this.call.client.name
          } foi recusada pelo Grupo Brax às ${
            new Date().toLocaleTimeString
          } do dia ${new Date().toLocaleDateString()}. Saiba Mais clicando aqui.`,
        })
        .then(() => {
          this.navigation.goTo('calls-home');
        });
    });
  }
}
