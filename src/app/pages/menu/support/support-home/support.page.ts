import { Component, OnInit } from '@angular/core';
import { SupportClass } from 'src/app/classes/[calls]/support/support';
import { UserClass } from 'src/app/classes/user/user';
import { Support } from 'src/app/interfaces/support';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage {
  order = 'asc';
  lastOrder = '';
  public search = '';
  constructor(
    public support: SupportClass,
    private user: UserClass,
    private screen: ScreenService,
    private menu: MenuService,
    private navigation: NavigationService,
    private breadcrumb: BreadcrumbService
  ) {}

  ionViewWillEnter() {
    this.menu.items.forEach((e) => {
      e.selected = e.name == 'Ajuda e Suporte';
    });
    this.breadcrumb.add(
      {
        name: 'Ajuda e Suporte',
        path: 'support',
      },
      true
    );
    this.support.setClassAll().then((res) => {
      this.support.makeSet(res);
      this.support.makePagination();
    });
  }

  ngOnDestroy(): void {
    this.support.show = this.support.value;
  }

  searching(clear = false) {
    if (clear) this.search = '';
    const searched = this.support.value.filter((e: any) => {
      return (
        e.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
        e.type.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
        e.description.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    });
    this.support.show = searched;
  }

  add() {
    this.navigation.goTo('support-crud');
  }

  edit(event) {
    const id = event.info[0];
    this.navigation.goToParam('support-crud', id);
  }

  del(event) {
    if (this.user.value.level !== '7') {
      this.screen.presentToast(
        'Você não tem permissão para realizar essa ação'
      );
      return;
    }
    const id = event.info[0];
    this.support.delete(id).then(() => {
      this.support.setClassAll<Support>().then((res) => {
        this.support.makeSet(res);
      });
    });
  }

  clickHeader(item) {
    if (this.lastOrder === item) {
      this.order = this.order === 'asc' ? 'desc' : 'asc';
    }
    this.lastOrder = item;
    let data: any = [];
    this.support.show.forEach((e: any) => {
      data.push(...e);
    });
    this.support.makePagination(data, false, this.user.value, this.order, item);
  }
}
