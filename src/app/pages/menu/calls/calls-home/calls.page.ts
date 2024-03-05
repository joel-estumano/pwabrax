import { Component, OnDestroy } from '@angular/core';
import { BudgetClass } from 'src/app/classes/[calls]/budget/budget';
import { SaleClass } from 'src/app/classes/[calls]/sale/sale';
import { PageCore } from 'src/app/classes/core/page-core';
import { UserClass } from 'src/app/classes/user/user';
import { SelectCallPage } from 'src/app/modals/calls/select-call/select-call.page';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { CallsManagerService } from 'src/app/services/helpers/managers/calls-manager.service';
import { MasterService } from 'src/app/services/master/master.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.page.html',
  styleUrls: ['./calls.page.scss'],
})
export class CallsPage extends PageCore implements OnDestroy {
  order = 'asc';
  lastOrder = '';
  public search = '';
  public class = 'sale';
  override tabs = [
    {
      name: 'Abertos',
      selected: true,
    },
    {
      name: 'Histórico',
    },
    {
      name: 'Solicitações',
      permission: ['5', '7'],
    },
  ];
  constructor(
    public callsManager: CallsManagerService,
    public pagination: PaginationService,
    public user: UserClass,
    private navigation: NavigationService,
    private menu: MenuService,
    private screen: ScreenService,
    private master: MasterService,
    private breadcrumb: BreadcrumbService
  ) {
    super();
  }

  ionViewWillEnter() {
    this.resetTabs();
    this.menu.items.forEach((e) => {
      e.selected = e.name == 'Atendimentos';
    });
    this.breadcrumb.add(
      {
        name: 'Atendimentos',
        path: 'calls',
      },
      true
    );
  }

  ngOnDestroy(): void {
    this.callsManager.show = this.callsManager.data;
  }

  override tabEvent(event) {
    this.tabs.forEach((e, i) => {
      e.selected = i == event;
      if (e.selected) {
        this.setData();
      }
    });
    const tab = this.findSelectedTab();
    this.callsManager.show = [];
    if (tab.name === this.tabs[0].name) {
      this.callsManager.data.forEach((element) => {
        const a = element.filter((e) => {
          if (e.extra[1] === true) e.disabled = true;
          else e.disabled = false;
          if (e.info[2] !== 'Fechado') return e;
        });
        this.callsManager.show.push(...a);
      });
    } else if (tab.name === this.tabs[1].name) {
      this.callsManager.data.forEach((element) => {
        const a = element.filter((e) => {
          e.disabled = true;
          if (e.info[2] === 'Fechado') return e;
        });

        this.callsManager.show.push(...a);
      });
    } else if (tab.name === this.tabs[2].name) {
      this.callsManager.data.forEach((element) => {
        const a = element.filter((e) => {
          e.disabled = false;
          if (e.extra[1] === true) return e;
        });

        this.callsManager.show.push(...a);
      });
    }
    this.callsManager.makePagination(this.callsManager.show);
    if (this.search) this.searching();
  }

  searching(clear = false) {
    if (clear) this.search = '';
    const searched: any = [];
    this.callsManager.data.forEach((element) => {
      const a = element.filter((e) => {
        return (
          e.info[0].toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
          e.info[1].toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
      searched.push(...a);
    });
    this.callsManager.show = this.pagination.makeData(searched);
    this.callsManager.makePagination(this.callsManager.data, true);
  }

  onFilterChoose($event: any) {
    if ($event.type === 0) {
      const filtered: any = [];

      this.callsManager.data.forEach((element) => {
        const a = element.filter((e) => {
          const dataParts = e.info[4].split('/');
          const dataInfo = new Date(`${dataParts[2]}-${dataParts[1]}-${dataParts[0]}`);
          const dataHoje = new Date();
          const diffEmMilissegundos = dataHoje.getTime() - dataInfo.getTime();
          const diffEmDias = diffEmMilissegundos / (1000 * 60 * 60 * 24);
          return diffEmDias <= 30;
        });
        filtered.push(...a);
      });
      
      this.callsManager.show = this.pagination.makeData(filtered);
      this.callsManager.makePagination(this.callsManager.data, true);
    }

    else if ($event.type === 3) {
      this.callsManager.show = this.callsManager.data;
      this.callsManager.makePagination(this.callsManager.data, true);
    }
  }

  add() {
    this.screen.openModal(SelectCallPage, 'is35 default');
  }

  edit(event) {
    const id = event.info[0];
    let call = this.callsManager.find(id);
    this.callsManager.data.forEach((element) => {
      element.forEach((e) => {
        if (e.info[0] === id) call = e;
      });
    });
    this.navigation.goToParam('calls-add', {
      class: call.extra[0],
      id: call.info[0],
    });
  }

  del(event) {
    const id = event.info[0];
    const callClass = this.callsManager.find(id).extra[0];
    const userLevel = this.user.value.level;
    if (userLevel === '5' || userLevel === '7') {
      this.callsManager[callClass]
        .update(
          {
            exclude: true,
            excluded_by: this.user.value,
          },
          id
        )
        .then(() => {
          this.master.setCalls();
        });
    } else if (userLevel === '3' || userLevel === '4') {
      this.callsManager[callClass]
        .update({ excludeSolicitation: true }, id)
        .then(() => {
          this.master.setCalls();
          this.screen.presentToast(
            'Foi enviado uma solicitação de exclusão',
            'info'
          );
        });
    } else {
      this.screen.presentToast(
        'Você não tem permissão para realizar esta ação.'
      );
    }
  }

  clickHeader(item) {
    if (this.lastOrder === item) {
      this.order = this.order === 'asc' ? 'desc' : 'asc';
    }
    this.lastOrder = item;
    let data: any = [];
    this.callsManager.show.forEach((e: any) => {
      data.push(...e);
    });
    this.callsManager.makePagination(
      data,
      false,
      this.user.value,
      this.order,
      item
    );
  }
}
