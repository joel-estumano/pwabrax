import { Component, OnDestroy } from '@angular/core';
import { PageCore } from 'src/app/classes/core/page-core';
import { UserClass } from 'src/app/classes/user/user';
import { LogisticAddModalPage } from 'src/app/modals/logistic/logistic-add-modal/logistic-add-modal.page';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { LogisticManagerService } from 'src/app/services/helpers/managers/logistic-manager.service';
import { MasterService } from 'src/app/services/master/master.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { ScreenService } from 'src/app/services/screen/screen.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-logistic-home',
  templateUrl: './logistic-home.page.html',
  styleUrls: ['./logistic-home.page.scss'],
})
export class LogisticHomePage extends PageCore implements OnDestroy {
  order = 'asc';
  lastOrder = '';
  public search = '';
  public class = 'stock';
  override tabs = this.logisticManager.tabs;
  constructor(
    public logisticManager: LogisticManagerService,
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
    this.menu.items.forEach((e) => {
      e.selected = e.name == 'Logística';
    });
    this.breadcrumb.add(
      {
        name: 'Logística',
        path: 'logistic',
      },
      true
    );
    this.resetTabs();
    this.logisticManager.makePagination(this.logisticManager.show);
  }

  ngOnDestroy(): void {
    this.logisticManager.show = this.logisticManager.data;
  }

  export_xlsx() {
    this.screen.presentToast('Exportando arquivo...', 'success');
    let organizedData: any[] = [];
    const logisticData = [];

    this.logisticManager.show.forEach((array: any) => {
      logisticData.push(...array);
    });

    logisticData.forEach((data: any) => {
      organizedData.push({
        'ID': data.info[0], 'Produto': data.info[1], 'Categoria': data.info[2],
        'Quantidade': data.info[3], 'Status': data.info[4]
      });
    });

    const tab = this.findSelectedTab();
    const ws = XLSX.utils.json_to_sheet(organizedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `Logística - ${tab.name}.xlsx`);
  }

  override tabEvent(event) {
    this.tabs.forEach((e, i) => {
      e.selected = i == event;
      if (e.selected) {
        this.setData();
      }
    });
    const tab = this.findSelectedTab();
    this.logisticManager.tabsFilter(tab, this.tabs);
    this.logisticManager.makePagination(this.logisticManager.show);
    // TODO: ARRUMAR AS CLASSES DEPOIS, POR ENQUANTO SÓ TÁ TRAZENDO DOIS
    tab.name === 'Serviços Cancelados' ? this.class = 'cancelledServices' : this.class = 'stock';
    if (this.search) this.searching();
  }

  searching(clear = false) {
    if (clear) this.search = '';
    const searched: any = [];
    this.logisticManager.data.forEach((element) => {
      const a = element.filter((e) => {
        return (
          e.info[0].toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
          e.info[1].toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
      searched.push(...a);
    });
    this.logisticManager.show = this.pagination.makeData(searched);
    this.logisticManager.makePagination(this.logisticManager.data, true);
  }

  add() {
    this.screen.openModal(LogisticAddModalPage, 'is60 large', {
      done: () => {
        this.resetTabs();
      },
    });
  }

  edit(event) {
    const id = event.info[0];
    let call = this.logisticManager.find(id);
    this.logisticManager.data.forEach((element) => {
      element.forEach((e) => {
        if (e.info[0] === id) call = e;
      });
    });
    this.navigation.goToParam('logistic-add', {
      id: call.info[0],
    });
  }

  del(event) {
    const id = event.info[1];
    this.logisticManager.stock
      .update(
        {
          exclude: true,
          excluded_by: this.user.value.id,
        },
        id
      )
      .then(() => {
        this.master.setLogistic();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  clickHeader(item) {
    if (this.lastOrder === item) {
      this.order = this.order === 'asc' ? 'desc' : 'asc';
    }
    this.lastOrder = item;
    let data: any = [];
    this.logisticManager.show.forEach((e: any) => {
      data.push(...e);
    });
    this.logisticManager.makePagination(
      data,
      false,
      this.user.value,
      this.order,
      item
    );
  }
}
