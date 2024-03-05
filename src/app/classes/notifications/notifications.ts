import { Injectable } from '@angular/core';
import { Core } from '../core/core';
import { HelperGetterService } from 'src/app/services/helpers/helpers/helper-getter.service';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { UserClass } from '../user/user';

@Injectable()
export class NotificationsClass extends Core {
  override cachePath = 'Notifications';
  override path = 'Notifications';
  public show;
  public currentPage = 0;
  public pages: any = [];
  public unread;
  constructor(
    public override getter: HelperGetterService,
    public user: UserClass,
    private pagination: PaginationService
  ) {
    super(getter);
    this.collection = this.getter.crud.collectionConstructor(this.path);
  }

  getAllNotifications() {
    // pegar todas as notificações e mostrar apenas para admin
    this.value = this.value.map((e) => {
      if (this.user.value.level === '7' &&
        (!e.reminder || this.getReminder(e.reminder)))
        return e;
    }).filter((e) => {
      if (e) return e;
    }).sort((a, b) => {
      return b.createdAt.seconds - a.createdAt.seconds;
    });
  }

  getMyNotifications() {
    this.value = this.value.map((e) => {
      if (e.user_id === this.user.value.id) { }
      if (e.user_id === this.user.value.id &&
        (!e.reminder || this.getReminder(e.reminder)))
        return e;
    }).filter((e) => {
      if (e) return e;
    }).sort((a, b) => {
      return b.createdAt.seconds - a.createdAt.seconds;
    });
  }

  setUnread() {
    const unread = this.value.map((page) => {
      return page
        .map((e) => {
          if (e.read === false) return e;
        })
        .filter((e) => {
          if (e) return e;
        });
    });

    this.unread = unread[0];
  }

  getReminder(date: string) {
    const d = date.split(',');
    const dates = d[0].split('/');
    const when = new Date(dates[1] + '/' + dates[0] + '/' + dates[2] + d[1]);
    return when.getTime() < new Date().getTime();
  }

  /*
  PAGINAÇÃO 
  */

  makePagination(res?, setter = true) {
    const pages = this.pagination.makeData(res ? res : this.value, 4);
    if (setter) this.value = pages;
    this.show = pages;
    this.generateTabs();
  }

  changePage(event) {
    this.currentPage = event;
    this.generateTabs();
  }

  generateTabs() {
    this.pages = this.pagination.generateTabs(
      this.currentPage + 1,
      this.show.length
    );
    if (this.pages.length == 0) this.pages.push(1);
  }
}
