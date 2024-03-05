import { Component, OnDestroy } from '@angular/core';
import { ReceivementsClass } from 'src/app/classes/receivements/receivements';
import { PageCore } from 'src/app/classes/core/page-core';
import { UserClass } from 'src/app/classes/user/user';
import { NewReceivementsModalPage } from 'src/app/modals/finance/new-receivements-modal/new-receivements-modal.page';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { MasterService } from 'src/app/services/master/master.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { PaginationService } from 'src/app/services/pagination/pagination.service';

@Component({
  selector: 'app-receivements',
  templateUrl: './receivements.page.html',
  styleUrls: ['./receivements.page.scss'],
})
export class ReceivementsPage extends PageCore implements OnDestroy {
  public search = '';
  public class = 'receivements';
  override tabs = [
    {
      name: 'A Receber',
      selected: true,
    },
  ];

  constructor(
    public user: UserClass,
    private menu: MenuService,
    public receivements: ReceivementsClass,
    private screen: ScreenService,
    private pagination: PaginationService,
    private breadcrumb: BreadcrumbService) {
    super();
  }

  async ionViewWillEnter() {
    this.menu.items.forEach((e) => {
      e.selected = e.name == 'A receber';
    });

    this.breadcrumb.add(
      {
        name: 'A receber',
        path: 'receivement',
      },
      true
    );
  }

  ngOnDestroy(): void {
    this.receivements.show = this.receivements.data;
  }  

  override setData(): void {
    const tab = this.findSelectedTab();
    const active = this.receivements.filterActive(tab === this.tabs[0]);
    const data = this.receivements.makeData(active);
    this.receivements.makePagination(data);
  }

  onFilterChoose($event) {
    console.log('onFilterChoose', $event);
  }

  searching(clear = false) {
    if (clear) this.search = '';
    const searched: any = [];
    this.receivements.data.forEach((element) => {
      const a = element.filter((e) => {
        console.log(e);
        return (e.info[0].toLowerCase().indexOf(this.search.toLowerCase()) > -1);
      });
      searched.push(...a);
    });
    this.receivements.show = this.pagination.makeData(searched);
    this.receivements.makePagination();
  }

  new_receivement() {
    this.screen.openModal(NewReceivementsModalPage, 'is60 large', {
      done: () => {
        this.resetTabs();
      },
    });
  }

  download(item) {
    console.log('item a ser baixado:', item);
    this.screen.presentToast('Função indisponível nesta versão.', 'warning');
  }
}
