import { Component, OnInit } from '@angular/core';
import { NotificationsClass } from 'src/app/classes/notifications/notifications';
import { UserClass } from 'src/app/classes/user/user';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-responsible-modal',
  templateUrl: './responsible-modal.page.html',
  styleUrls: ['./responsible-modal.page.scss'],
})
export class ResponsibleModalPage {
  responsibles: any = [];
  responsible;
  ticket;
  id;
  constructor(
    public user: UserClass,
    private screen: ScreenService,
    private navigation: NavigationService,
    private notificationClass: NotificationsClass
  ) {
    this.responsibles = [];
    this.loadResponsibles();
  }

  loadResponsibles() {
    this.responsibles = this.user.finderLevel([5]);
  }

  dismiss() {
    this.screen.dismissModal();
  }

  async sendNotification() {
    this.notificationClass
      .add({
        user_id: this.responsible,
        type: 'Ajuda e Suporte',
        url: 'support-crud?params=' + this.id,
        date: new Date().toLocaleString(),
        read: false,
        status: 'PENDENTE',
        responsible: this.user.value,
        text: `${this.user.value.nome ? this.user.value.nome : this.user.displayEmail
          } solicitou que você entre em contato com ${this.ticket.user.nome
          } às ${new Date().toLocaleTimeString()} do dia ${new Date().toLocaleDateString()}
      .`,
      })
      .then(() => {
        this.notificationClass.setClassAll().then((res) => {
          this.screen.dismissModal();
          // this.notificationClass.getMyNotifications();
          this.notificationClass.getAllNotifications();
          this.notificationClass.makePagination();
          this.notificationClass.setUnread();
          this.navigation.goTo('support');
        });
      });
  }
}
