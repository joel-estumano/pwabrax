import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageCore } from 'src/app/classes/core/page-core';
import { UserClass } from 'src/app/classes/user/user';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';
import { PeopleManagerService } from 'src/app/services/helpers/managers/people-manager.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.page.html',
  styleUrls: ['./registrations.page.scss'],
})
export class RegistrationsPage extends PageCore implements OnDestroy {
  order = 'asc';
  lastOrder = '';
  public headers;
  public data;
  public search = '';
  override tabs = [
    {
      name: 'Clientes',
      class: 'clients',
      selected: true,
      permission: ['3', '4', '7'],
    },
    {
      name: 'Parceiros',
      class: 'partners',
      selected: false,
      permission: ['7'],
    },
    {
      name: 'Colaboradores',
      class: 'colaborators',
      selected: false,
      permission: ['7'],
    },
    {
      name: 'Fornecedores',
      class: 'suppliers',
      selected: false,
      permission: ['7'],
    },
  ];

  ngOnDestroy(): void {
    this.tabs.forEach((e) => {
      e.selected = e.name === this.tabs[0].name;
    });
    this.setData();
    this.people.show = this.people.data;
    this.people.currentPage = 0;
  }

  constructor(
    public people: PeopleManagerService,
    public user: UserClass,
    private menu: MenuService,
    private navigation: NavigationService,
    private auth: AuthService,
    private screen: ScreenService,
    private pagination: PaginationService,
    private breadcrumb: BreadcrumbService
  ) {
    super();
  }

  async ionViewWillEnter() {
    this.menu.items.forEach((e) => {
      e.selected = e.name == 'Cadastros';
    });

    this.breadcrumb.add(
      {
        name: 'Cadastros',
        path: 'registrations',
      },
      true
    );
    this.setData();
  }

  add() {
    const selectedTab = this.findSelectedTab();
    this.navigation.goToParam('registrations-crud', {
      page: selectedTab.class,
    });
  }

  edit(event) {
    const selectedTab = this.findSelectedTab();
    const id = event.info[0];
    this.navigation.goToParam('registrations-crud', {
      page: selectedTab.class,
      who: id,
    });
  }

  async del(event) {
    if (this.user.value.level === '7') {
      await this.screen.presentLoading();
      const user = this.user.find(event.info[0]);
      const images = Object.keys(user)
        .map((e) => {
          if (
            (e === 'doc_cpf' || e === 'doc_company' || e === 'doc_residence') &&
            user[e].url
          )
            return user[e].url;
        })
        .filter((e) => {
          if (e) return e;
        });
      this.auth.deleteAdmin(user.id).then(() => {
        this.user.delete(event.info[0], images.length > 0, images).then(() => {
          this.user.setClassAll(true, false, 'all_users').then((res: any) => {
            this.user.allUsers = res;
            this.user.setUsersFromLevel();
            this.user.fill(res);
            this.setData();
            this.screen.dismissLoading();
          });
        });
      });
    } else {
      this.screen.presentToast('Você não tem permissão para excluir usuários.');
    }
  }

  share(event) {
    this.screen.navigationShare(
      'Titulo aqui',
      'Texto aqui',
      'http://localhost:8100/registrations-crud?params=' +
      event.extra[1] +
      '&params=' +
      event.info[0]
    );
  }

  override setData() {
    const tab = this.findSelectedTab();
    console.log('selected - ', tab);
    this.search = '';
    this.people.headers = this.people[tab.class].headers;
    this.people.data = this.people[tab.class].data;
    this.people.show = this.people.data;
    this.people.makePagination(this.people.data, true, this.user.value);
    if (this.search) this.searching();
  }

  searching(clear = false) {
    if (clear) this.search = '';
    const tab = this.findSelectedTab();
    const searched = this.people[tab.class].data.filter((e: any) => {
      return (
        e.info[0].toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
        e.info[1].toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
        e.extra[0].toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    });
    this.people.show = searched;
    this.people.makePagination(this.people.show, true, this.user.value);
  }

  clickHeader(item) {
    if (this.lastOrder === item) {
      this.order = this.order === 'asc' ? 'desc' : 'asc';
    }
    this.lastOrder = item;
    let data: any = [];
    this.people.show.forEach((e: any) => {
      data.push(...e);
    });
    this.people.makePagination(data, false, this.user.value, this.order, item);
  }
}
