import { Component, Input } from '@angular/core';
import { NotificationsClass } from 'src/app/classes/notifications/notifications';
import { Notification } from 'src/app/interfaces/notification';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-notification-line',
  templateUrl: './notification-line.component.html',
  styleUrls: ['./notification-line.component.scss'],
})
export class NotificationLineComponent {
  @Input() notification: Notification;
  constructor(
    private navigation: NavigationService,
    private notificationClass: NotificationsClass
  ) {}

  getDate() {
    if (this.notification.date)
      return new Date(this.notification.date).toLocaleDateString();
  }

  goTo() {
    if (this.notification.url) {
      this.navigation.goTo(this.notification.url);
    }
    this.notification.read = true;
    this.notificationClass
      .update(this.notification, this.notification.id)
      .then(() => {
        this.notificationClass.setUnread();
      });
  }
}
