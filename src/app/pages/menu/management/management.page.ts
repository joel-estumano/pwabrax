import { Component, OnDestroy } from '@angular/core';
import { PageCore } from 'src/app/classes/core/page-core';
import { ManagementClass } from 'src/app/classes/management/management';
import { NotificationsClass } from 'src/app/classes/notifications/notifications';
import { UserClass } from 'src/app/classes/user/user';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.page.html',
  styleUrls: ['./management.page.scss'],
})
export class ManagementPage extends PageCore implements OnDestroy {
  order = 'asc';
  lastOrder = '';
  public current_tab = 'Aprovações';
  public filterOption = 0;
  public search = '';
  override tabs = [
    {
      name: 'Aprovações',
      selected: true,
    },
    {
      name: 'Relatórios',
    },
  ];

  public goals;
  public profitForecast;
  public totalMonthlyRevenue;
  public totalMonthlyExpenses;
  public delinquencyValue;

  constructor(
    public user: UserClass,
    public management: ManagementClass,
    public pagination: PaginationService,
    private menu: MenuService,
    private screen: ScreenService,
    private breadcrumb: BreadcrumbService
  ) {
    super();
    this.menu.items.forEach((e) => {
      e.selected = e.name == 'Gestão';
    });
  }

  ionViewWillEnter() {
    this.getChartData();
    this.breadcrumb.add(
      {
        name: 'Gestão',
        path: 'management',
      },
      true
    );
    this.management.setClassAll().then(async (res) => {
      this.management.makeSet(res);
      this.management.makePagination();
      await this.screen.dismissLoading();
    });
  }

  ngOnDestroy(): void {
    this.management.show = this.management.data;
  }

  async getChartData() {
    this.goals = [
      { name: 'Meta 1', value: 10 },
      { name: 'Meta 2', value: 21 },
      { name: 'Meta 3', value: 15 },
      { name: 'Meta 4', value: 5 },
    ]
    this.profitForecast = [
      { name: 'Meta 1', value: 10 },
      { name: 'Meta 2', value: 18 },
      { name: 'Meta 3', value: 15 },
      { name: 'Meta 4', value: 10 },
      { name: 'Meta 5', value: 22 },
      { name: 'Meta 6', value: 15 }
    ]
    this.totalMonthlyRevenue = [
      { name: 'Meta 1', value: 10 },
      { name: 'Meta 2', value: 20 },
      { name: 'Meta 3', value: 15 },
      { name: 'Meta 4', value: 10 },
      { name: 'Meta 5', value: 20 },
    ]
    this.totalMonthlyExpenses = [
      { name: 'Meta 1', value: 3 },
      { name: 'Meta 2', value: 20 },
      { name: 'Meta 3', value: 15 },
      { name: 'Meta 4', value: 10 },
    ]
    this.delinquencyValue = [
      { name: 'Meta 1', value: 13 },
      { name: 'Meta 2', value: 20 },
      { name: 'Meta 3', value: 15 },
      { name: 'Meta 4', value: 10 },
      { name: 'Meta 5', value: 22 },
      { name: 'Meta 6', value: 15 },
      { name: 'Meta 7', value: 12 }
    ]
  }

  override setData(): void {
    const tab = this.findSelectedTab();
    const active = this.management.filterActive(tab === this.tabs[0]);
    const data = this.management.makeData(active);
    this.management.makePagination(data);
  }

  override tabEvent(event = 0, tabName = '') {
    var filterOption = 0;
    if (tabName.length > 0) {
      this.tabs.forEach((e, i) => {
        e.selected = e.name == tabName;
        if (e.selected) {
          this.setData();
        }
      });

      var filterOption = event;
    } else {
      this.tabs.forEach((e, i) => {
        e.selected = i == event;
        if (e.selected) {
          this.setData();
        }
      });
    }

    const tab = this.findSelectedTab();

    if (filterOption >= 0 && tab.options) {
      tab.options.forEach((e, i) => {
        e.selected = i == filterOption;
      });
    }

    this.current_tab = tab.name;
    this.filterOption = filterOption;
    // this.management.data = this.financeManager[tab.class].data;
    // this.management.show = this.financeManager.data;
    // this.management.makePagination(this.financeManager.show, true);
    // this.management.tabsFilter(tab, this.tabs, filterOption);
    // const items = this.financeManager.show;
    // this.management.makePagination(this.financeManager.show, true);
  }

  clickHeader(item) {
    if (this.lastOrder === item) {
      this.order = this.order === 'asc' ? 'desc' : 'asc';
    }
    this.lastOrder = item;
    let data: any = [];
    this.management.show.forEach((e: any) => {
      data.push(...e);
    });
    this.management.makePagination(
      data,
      false,
      this.user.value,
      this.order,
      item
    );
  }

  onFilterChoose($event: any) {
    // if ($event.type === 0) {
    //   const filtered: any = [];

    //   this.callsManager.data.forEach((element) => {
    //     const a = element.filter((e) => {
    //       const dataParts = e.info[4].split('/');
    //       const dataInfo = new Date(`${dataParts[2]}-${dataParts[1]}-${dataParts[0]}`);
    //       const dataHoje = new Date();
    //       const diffEmMilissegundos = dataHoje.getTime() - dataInfo.getTime();
    //       const diffEmDias = diffEmMilissegundos / (1000 * 60 * 60 * 24);
    //       return diffEmDias <= 30;
    //     });
    //     filtered.push(...a);
    //   });
      
    //   this.callsManager.show = this.pagination.makeData(filtered);
    //   this.callsManager.makePagination(this.callsManager.data, true);
    // }

    // else if ($event.type === 3) {
    //   this.callsManager.show = this.callsManager.data;
    //   this.callsManager.makePagination(this.callsManager.data, true);
    // }
  }

  export_pdf() {
    this.screen.presentToast('Função indisponível nesta versão.', 'warning');
  }

  export_csv() {
    this.screen.presentToast('Função indisponível nesta versão.', 'warning');
  }
}
