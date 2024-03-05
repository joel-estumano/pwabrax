import { Injectable } from '@angular/core';
import { GeneralClass } from 'src/app/classes/[finance]/general/general';
import { CashierClass } from 'src/app/classes/[finance]/cashier/cashier';
import { BillsToPayClass } from 'src/app/classes/[finance]/billsToPay/billsToPay';
import { MovementsClass } from 'src/app/classes/[finance]/movements/movements';
import { PaginationService } from '../../pagination/pagination.service';
import { OrderingService } from '../../ordering/ordering.service';
import { ReceivementsClass } from 'src/app/classes/receivements/receivements';
import { StockClass } from 'src/app/classes/[logistic]/stock/stock';

@Injectable({
  providedIn: 'root',
})
export class CommissionsManagerService {
  data: any = [];
  show: any = [];
  pages: any = [];
  currentPage = 0;

  headers = ['Vendedor', 'Comissão por produto', 'Meta Produto R$', 'Comissão por serviço', 'Meta Serviço R$', 'Ação'];

  constructor(
    public general: GeneralClass,
    public cashier: CashierClass,
    public billsToPay: BillsToPayClass,
    public movements: MovementsClass,
    public stock: StockClass,
    public receivements: ReceivementsClass,
    private pagination: PaginationService,
    private ordering: OrderingService
  ) {}

  find(id) {
    let call;
    this.data.forEach((element) => {
      element.forEach((e) => {
        if (e.info[0] === id) call = e;
      });
    });
    return call;
  }

  add(res: any) {
    const data = res.map((e) => {
      if (e.extra[1]) e.disabled = true;
      return e;
    });
    this.data.push(...data);
    this.show.push(...data);
  }

  reset() {
    this.data = [];
    this.show = [];
  }

  /*
  PAGINAÇÃO 
  */

  makePagination(res?, setter = true, user?, order?, orderType?) {
    let data = res ? res : this.data;
    if (user && user.level === '3') {
      data = data.filter((e) => {
        if (e.extra[2] === user.id) return e;
      });
    }

    const orderBy = this.orderBy(data, order, orderType);
    const pages = this.pagination.makeData(orderBy);
    if (setter) this.data = pages;
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
      this.data.length
    );
    if (this.pages.length == 0) this.pages.push(1);
  }

  tabsFilter(tab, tabs, filterOption = 0) {
    this.show = [];

    if (tab.name === tabs[0].name) {
      this.data.forEach((element) => {
        const a = element.filter((e) => {
          if (e.extra[0] === 'general') return e;
        });
        this.show.push(...a);
      });
    } else if (tab.name === tabs[1].name) {
      if (filterOption >= 0) {
        var activeOption = tabs[1].options[filterOption];
      }

      this.data.forEach((element) => {
        const a = element.filter((e) => {
          if (e.extra[0] === 'cashier') {
            if (!activeOption) return e;
            if (
              activeOption.name == 'Histórico de pagamentos' ||
              (activeOption.name == 'Vendas do dia' && this.isToday(e.extra[1]))
            ) {
              return e;
            }
          }
        });
        this.show.push(...a);
      });
    }
  }

  isToday(dateString) {
    const today = new Date();
    const dateParts = dateString.split('/');
    const recordDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    return (
      recordDate.getDate() === today.getDate() &&
      recordDate.getMonth() === today.getMonth() &&
      recordDate.getFullYear() === today.getFullYear()
    );
  }

  order(
    order: 'desc' | 'asc' = 'desc',
    orderType: 'Número' | 'Vencimento' | 'Valor' | 'Situação' = 'Número',
    customUser?
  ) {
    this.makePagination(this.data, false, customUser, order, orderType);
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
      case 'Número':
        index = 0;
        break;
      case 'Vencimento':
        index = 1;
        break;
      case 'Valor':
        index = 2;
        break;
      case 'Situação':
        index = 3;
        break;

      default:
        index = 0;
        break;
    }
    return index;
  }
}
