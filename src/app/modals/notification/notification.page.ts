import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage {
  cancel;
  confirm;
  dateChange;
  date;
  constructor() {}
}
