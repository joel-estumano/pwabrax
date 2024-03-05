import { Injectable } from '@angular/core';
import { Core } from '../core/core';
import { HelperGetterService } from 'src/app/services/helpers/helpers/helper-getter.service';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { UserClass } from '../user/user';
import { OrderingService } from 'src/app/services/ordering/ordering.service';

@Injectable()
export class ManagementClass extends Core {
  override cachePath = 'Notifications';
  override path = 'Notifications';
  data: any = [];
  show: any = [];
  pages: any = [];
  currentPage = 0;

  public headers = ['Solicitação', 'Produto', 'Operador', 'Motivo', 'Desconto', 'Ação'];
  constructor(
    public override getter: HelperGetterService,
    public user: UserClass,
    private pagination: PaginationService,
    private ordering: OrderingService,
  ) {
    super(getter);
    this.collection = this.getter.crud.collectionConstructor(this.path);
  }

  reset() {
    this.data = [];
    this.show = [];
  }

  makeSet(res) {
    this.fill(res);
    return this.makeData(res);
  }

  makePagination(res?, setter = true, customUser?, order?, orderType?) {
    let data = res ? res : this.data;
    const user = customUser || this.user.value;
    if (user && user.level === '3') {
      data = data.filter((e) => {
        if (e.extra[3] === user.id) return e;
      });
    }
    const filteredData = data
      .map((e) => {
        if (!e.extra[2]) return e;
      })
      .filter((e) => {
        if (e) return e;
      });

    const orderBy = this.orderBy(filteredData, order, orderType);
    const pages = this.pagination.makeData(orderBy);
    // const pages = this.pagination.makeData(res ? res : this.data);
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
      this.show.length
    );
    if (this.pages.length == 0) this.pages.push(1);
  }

  order(
    order: 'desc' | 'asc' = 'desc',
    orderType: 'Solicitação' | 'Produto' | 'Operador' | 'Motivo' | 'Desconto' = 'Desconto',
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
      case 'Solicitação':
        index = 0;
        break;
      case 'Produto':
        index = 1;
        break;
      case 'Operador':
        index = 2;
        break;
      case 'Motivo':
        index = 3;
        break;
      case 'Desconto':
        index = 4;
        break;

      default:
        index = 4;
        break;
    }
    return index;
  }

  makeData(data) {
    const result: any = [];
    // console.log(data)
    data.forEach((e, i) => {
      if (!e) return;
      result.push({
        info: [
          e.type,
          e.product?.title || '',
          e.responsible?.nome || e.responsible?.email,
          e.text.length > 200 ? e.text.substring(0, 200) + '...' : e.text,
          e.discount ? e.discount + '%' : '---',
          // new Date(e.createdAt.seconds * 1000).toLocaleDateString('pt-BR'),
          'actions',
        ],
        actions: ['accept', 'refuse'],
        extra: [],
        index: i,
      });
    });
    this.data = result;
    this.show = result;
    return result;
  }

  filterActive(bool: boolean) {
    return this.value.map((e) => {
      if (bool && !e.exclude) return e;
      else if (!bool && e.exclude === true) return e;
    });
  }
}
