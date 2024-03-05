import { Component, OnDestroy } from '@angular/core';
import { PageCore } from 'src/app/classes/core/page-core';
import { UserClass } from 'src/app/classes/user/user';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { MasterService } from 'src/app/services/master/master.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { CommissionsClass } from 'src/app/classes/commissions/commissions';
import { NewBatchCommissionModalPage } from 'src/app/modals/commissions/new-batch-commission-modal/new-batch-commission-modal.page';
import { NewCampaignModalPage } from 'src/app/modals/commissions/new-campaign-modal/new-campaign-modal.page';
import { NewCommissionModalPage } from 'src/app/modals/commissions/new-commission-modal/new-commission-modal.page';
import { CampaignsClass } from 'src/app/classes/commissions/campaigns';

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.page.html',
  styleUrls: ['./commissions.page.scss'],
})
export class CommissionsPage extends PageCore implements OnDestroy {
  order = 'asc';
  lastOrder = '';
  public current_tab = 'Comissões';
  public filterOption = 0;
  public search = '';
  public class = 'general';
  override tabs = [
    {
      name: 'Comissões',
      class: 'commissions',
      selected: true,
    },
    {
      name: 'Campanhas',
      class: 'campaigns',
    },
  ];

  constructor(
    public campaigns: CampaignsClass,
    public commissions: CommissionsClass,
    public pagination: PaginationService,
    private navigation: NavigationService,
    private menu: MenuService,
    private screen: ScreenService,
    private breadcrumb: BreadcrumbService,
    private master: MasterService
  ) {
    super();
  }

  async ionViewWillEnter() {
    this.master.setCommissions();
    this.master.setCampaigns();

    this.menu.items.forEach((e) => {
      e.selected = e.name == 'Comissões e Campanhas';
    });

    this.breadcrumb.add(
      {
        name: 'Comissões e Campanhas',
        path: 'commissions',
      },
      true
    );
    this.resetTabs();
    this.commissions.makePagination(this.commissions.show);
  }

  ngOnDestroy(): void {
    this.commissions.show = this.commissions.data;
    this.campaigns.show = this.campaigns.data;
  }

  override resetTabs() {
    this.tabs.forEach((e) => {
      e.selected = false;
    });
    this.tabs[0].selected = true;
    this.tabEvent();
  }

  editCommission(event) {
    // const id = event.id;
    this.navigation.goToParam('commissions-crud', event.id);
  }

  editCampaign(event) {
    this.navigation.goToParam('campaigns-crud', event.id);
    // const selectedTab = this.findSelectedTab();
    // const status = event.info[0];
    // const goal = event.info[1];
    // const bonus = event.info[2];
    // this.navigation.goToParam('campaigns-crud', {
    //   page: selectedTab.class,
    //   who: { id: null, status: status, goal: goal, bonus: bonus },
    // });
  }

  async del(event) {
    await this.screen.presentLoading();
    const id = event.info[0];
    await this.commissions.delete(id);
    this.commissions.setClassAll().then(async (res) => {
      this.commissions.makeSet(res);
      this.commissions.makePagination();
      await this.screen.dismissLoading();
    });
  }

  new_comission() {
    this.screen.openModal(NewCommissionModalPage, 'is70 large', {
      fixed: true,
      done: () => {
        this.resetTabs();
      },
    });
  }

  new_batch_comission() {
    this.screen.openModal(NewBatchCommissionModalPage, 'is90 large', {
      fixed: true,
      done: () => {
        this.resetTabs();
      },
    });
  }

  new_campaign() {
    this.screen.openModal(NewCampaignModalPage, 'is50 large', {
      fixed: true,
      done: () => {
        this.resetTabs();
      },
    });
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
    this.class = tab.class;

    // this.financeManager.data = this.financeManager[tab.class].data;
    // this.financeManager.show = this.financeManager.data;
    // this.commissions.tabsFilter(tab, this.tabs, filterOption);
    // this.commissions.makePagination(this.commissions.show, true);
    // const items = this.financeManager.show;
    // this.financeManager.makePagination(this.financeManager.show, true);
  }

  clickHeader(item) {
    //   if (this.lastOrder === item) {
    //     this.order = this.order === 'asc' ? 'desc' : 'asc';
    //   }
    //   this.lastOrder = item;
    //   let data: any = [];
    //   this.financeManager.show.forEach((e: any) => {
    //     data.push(...e);
    //   });
    //   this.financeManager.makePagination(
    //     data,
    //     false,
    //     this.order,
    //     item
    //   );
  }

  onFilterChoose($event: any) {
    if ($event.type === 0) {
      const filtered: any = [];
      const array = this.current_tab === 'Comissões' ? this.commissions.data : this.campaigns.data;

      array.forEach((element) => {
        const a = element.filter((e) => {
          const dataParts = e.info[5].split('/');
          const dataInfo = new Date(`${dataParts[2]}-${dataParts[1]}-${dataParts[0]}`);
          const dataHoje = new Date();
          const diffEmMilissegundos = dataHoje.getTime() - dataInfo.getTime();
          const diffEmDias = diffEmMilissegundos / (1000 * 60 * 60 * 24);
          return diffEmDias <= 30;
        });
        filtered.push(...a);
      });

      // this.current_tab === 'Comissões' ? this.commissions.show = filtered : this.campaigns.show = filtered;
      this.current_tab === 'Comissões' ? this.commissions.data = filtered : this.campaigns.data = filtered;
      this.current_tab === 'Comissões' ? this.commissions.makePagination(this.commissions.data) : this.campaigns.makePagination(this.campaigns.data);
    }

    else if ($event.type === 3) {
      this.master.setCommissions();
      this.master.setCampaigns();
    }
  }
}
