import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-wide-chat',
  templateUrl: './wide-chat.page.html',
  styleUrls: ['./wide-chat.page.scss'],
})
export class WideChatPage {
  constructor(
    private menu: MenuService,
    private breadcrumb: BreadcrumbService
  ) {}

  ionViewWillEnter() {
    this.menu.items.forEach((e) => {
      e.selected = e.name == 'WideChat';
    });
    this.breadcrumb.add(
      {
        name: 'WideChat',
        path: 'widechat',
      },
      true
    );
  }
}
