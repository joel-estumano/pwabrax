import { Injectable } from '@angular/core';
import { BudgetClass } from 'src/app/classes/[calls]/budget/budget';
import { SaleClass } from 'src/app/classes/[calls]/sale/sale';
import { PaginationService } from '../../pagination/pagination.service';
import { OrderingService } from '../../ordering/ordering.service';
import { UserClass } from 'src/app/classes/user/user';

@Injectable({
  providedIn: 'root',
})
export class CallsManagerService {
  data: any = [];
  show: any = [];
  pages: any = [];
  currentPage = 0;
  constructor(
    public sale: SaleClass,
    public budget: BudgetClass,
    private pagination: PaginationService,
    private ordering: OrderingService,
    private user: UserClass
  ) { }

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

  makePagination(res?, setter = false, customUser?, order?, orderType?) {
    let data = res ? res : this.data;
    const user = customUser || this.user.value;
    if (user && user.level === '3') {
      data = data.filter((e) => {
        if (e.extra[3] === user.id) return e;
      });
    }

    const filteredData = data.map((e) => {
      if (!e.extra[2]) return e;
    }).filter((e) => {
      // if (e) return e;
      if (e) return e != null;
    });

    const orderBy = this.orderBy(filteredData, order, orderType);
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
      this.show.length
    );
    if (this.pages.length == 0) this.pages.push(1);
  }

  order(
    order: 'desc' | 'asc' = 'desc',
    orderType: 'Código' | 'Cliente' | 'Status' | 'Tipo' | 'Data' = 'Data',
    customUser?
  ) {
    this.makePagination(
      this.data,
      false,
      customUser ?? this.user.value,
      order,
      orderType
    );
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
      case 'Código':
        index = 0;
        break;
      case 'Cliente':
        index = 1;
        break;
      case 'Status':
        index = 2;
        break;
      case 'Tipo':
        index = 3;
        break;
      case 'Data':
        index = 4;
        break;

      default:
        index = 4;
        break;
    }
    return index;
  }
}
