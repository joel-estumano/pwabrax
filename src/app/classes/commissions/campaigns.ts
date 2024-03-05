import { Injectable } from '@angular/core';
import { Core } from '../core/core';
import { HelperGetterService } from 'src/app/services/helpers/helpers/helper-getter.service';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { OrderingService } from 'src/app/services/ordering/ordering.service';

@Injectable()
export class CampaignsClass extends Core {
  public headers = ['Data de Início', 'Data de Término', 'Status', 'Meta (R$)', 'Bônus (R$)', 'Data Criação', 'Ação'];
  override cachePath = 'Campaigns';
  override path = 'Campaigns';
  data: any = [];
  show: any = [];
  pages: any = [];
  currentPage = 0;

  constructor(public override getter: HelperGetterService,
    private pagination: PaginationService,
    private ordering: OrderingService) {
    super(getter);
    this.collection = this.getter.crud.collectionConstructor(this.path);
  }

  makeData(data) {
    const result: any = [];
    data.forEach((e, i) => {
      result.push({
        info: [
          e.start_date || new Date(e.createdAt.seconds * 1000).toLocaleDateString('pt-BR'),
          e.end_date || new Date(e.createdAt.seconds * 1000).toLocaleDateString('pt-BR'),
          e.status,
          e.goal,
          e.bonus,
          new Date(e.createdAt.seconds * 1000).toLocaleDateString('pt-BR'),
          'actions'
        ],
        actions: ['edit'],
        index: i,
        id: e.id,
        extra: ['Campaigns', e.type],
      });
    });
    this.data = result;
    this.show = result;
    return result;
  }

  makeSet(res) {
    this.fill(res);
    return this.makeData(res);
  }

  makePagination(res?, setter = true, customUser?, order?, orderType?) {
    let data = res ? res : this.data;
    const orderBy = this.orderBy(data, order, orderType);
    const pages = this.pagination.makeData(orderBy);
    this.show = pages;
    if (setter) this.data = pages;
    this.generateTabs();
  }

  changePage(event) {
    this.currentPage = event;
    this.generateTabs();
  }

  generateTabs() {
    this.pages = this.pagination.generateTabs(
      this.currentPage + 1,
      this.data.length
    );
    if (this.pages.length == 0) this.pages.push(1);
  }

  reset() {
    this.data = [];
    this.show = [];
  }

  private orderBy(data, order: 'desc' | 'asc' = 'desc', type?) {
    const index = this.getOrderIndex(type);
    return this.ordering.order(data, order, (n1, n2) => {
      return {
        s1: n1.info[index],
        s2: n2.info[index],
      };
    });
  }

  private getOrderIndex(type) {
    let index = 0;
    switch (type) {
      case 'Data de Início':
        index = 0;
        break;
      case 'Data de Término':
        index = 1;
        break;
      case 'Status':
        index = 2;
        break;
      case 'Meta (R$)':
        index = 3;
        break;
      case 'Bônus (R$)':
        index = 4;
        break;
      case 'Data Criação':
        index = 5;
        break;

      default:
        index = 5;
        break;
    }
    return index;
  }

}
