import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupportClass } from 'src/app/classes/[calls]/support/support';
import { UserClass } from 'src/app/classes/user/user';
import { ResponsibleModalPage } from 'src/app/modals/support/responsible-modal/responsible-modal.page';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-support-crud',
  templateUrl: './support-crud.page.html',
  styleUrls: ['./support-crud.page.scss'],
})
export class SupportCrudPage {
  ticket: any = {
    client: '',
    client_id: '',
    user: {},
    status: '',
    category: '',
    description: '',
    date: new Date().toLocaleDateString(),
    comments: [],
  };
  id = '';
  public openDate = false;
  constructor(
    public user: UserClass,
    public support: SupportClass,
    private navigation: NavigationService,
    private screen: ScreenService,
    private menu: MenuService,
    private breadcrumb: BreadcrumbService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(async (params: any) => {
      this.id = params.params;
      if (this.id) {
        const find = this.support.find(this.id);
        this.ticket = find ? find : await this.support.getHttp(this.id);
        if (!this.ticket.date) {
          this.ticket.date = new Date().toLocaleDateString();
        }
      }
    });
  }

  pickDate() {
    this.openDate = !this.openDate;
  }

  comment(event) {
    const comment = {
      date: new Date(),
      text: event,
      user: this.user.value,
      isNew: true,
    };
    if (!this.ticket.comments) this.ticket.comments = [];
    this.ticket.comments.push(comment);
  }

  ionViewWillEnter() {
    this.menu.items.forEach((e) => {
      e.selected = e.name == 'Ajuda e Suporte';
    });
    this.breadcrumb.add(
      {
        name: 'Novo',
        path: 'support-crud',
      },
      true
    );
  }

  goBack() {
    this.navigation.goTo('support');
  }

  validation() {
    if (!this.ticket.client_id) {
      this.screen.presentToast('É obrigatório selecionar um cliente');
      return false;
    }
    if (!this.ticket.category) {
      this.screen.presentToast('É obrigatório selecionar uma categoria');
      return false;
    }
    if (!this.ticket.description) {
      this.screen.presentToast('É obrigatório preencher a descrição');
      return false;
    }
    return true;
  }

  async send() {
    if (!this.validation()) return;
    await this.screen.presentLoading();
    const user = this.user.find(this.ticket.client_id);
    this.ticket.user = user;
    if (this.id) {
      this.support.update(this.ticket, this.id).then(() => {
        this.set();
      });
    } else {
      this.support.add(this.ticket).then(() => {
        this.set();
      });
    }
  }

  share() {
    this.screen.openModal(ResponsibleModalPage, 'is35 default', {
      ticket: this.ticket,
      id: this.id,
    });
  }

  set() {
    this.support.setClassAll().then((res) => {
      this.support.makeSet(res);
      this.screen.dismissLoading();
      this.goBack();
    });
  }

  dateChange(event) {
    const date = event.detail.value;
    this.ticket.date = new Date(date).toLocaleDateString();
  }

  select(event) {
    const { value } = event.detail;
    this.ticket.client_id = value;
  }

  selectCategories(event) {
    const { value } = event.detail;
    this.ticket.category = value;
  }
}
