import { Injectable } from "@angular/core";
import { HelperGetterService } from "src/app/services/helpers/helpers/helper-getter.service";
import { PaginationService } from "src/app/services/pagination/pagination.service";
import { Core } from "../core/core";
import { OrderingService } from "src/app/services/ordering/ordering.service";
import { UserClass } from "../user/user";

@Injectable()
export class CommissionsClass extends Core {
  public headers = ['Colaborador', 'Comissão por produto', 'Meta Produto R$', 'Comissão por serviço', 'Meta Serviço R$', 'Data Criação', 'Ação'];
  override cachePath = 'Commissions';
  override path = 'Commissions';
  data: any = [];
  show: any = [];
  pages: any = [];
  currentPage = 0;

  constructor(
    public override getter: HelperGetterService,
    private pagination: PaginationService,
    private ordering: OrderingService,
    private user: UserClass
  ) {
    super(getter);
    this.collection = this.getter.crud.collectionConstructor(this.path);
  }

  makeData(data) {
    const result: any = [];
    data.forEach((e, i) => {
      if (!e) return;
      result.push({
        info: [
          e.contributor ? e.contributor.nome : '',
          e.service_commission + '%',
          e.service_goal,
          e.product_commission + '%',
          e.product_goal,
          new Date(e.createdAt.seconds * 1000).toLocaleDateString('pt-BR'),
          'actions',
        ],
        actions: ['edit', 'delete'],
        id: e.id,
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

  makeSet(res) {
    this.fill(res);
    return this.makeData(res);
  }

  // makePagination(res?, setter = true) {
  //   const pages = this.pagination.makeData(res ? res : this.data);
  //   if (setter) this.data = pages;
  //   this.show = pages;
  //   this.generateTabs();
  // }

  makePagination(res?, setter = true, customUser?, order?, orderType?) {
    let data = res ? res : this.data;
    const orderBy = this.orderBy(data, order, orderType);
    const pages = this.pagination.makeData(orderBy);
    this.show = pages;
    if (setter) this.data = pages;
    this.generateTabs();
  }

  //   const filteredData = data.map((e) => {
  //     if (!e.extra[2]) return e;
  //   }).filter((e) => {
  //     // if (e) return e;
  //     if (e) return e != null;
  //   });

  //   const orderBy = this.orderBy(filteredData, order, orderType);
  //   const pages = this.pagination.makeData(orderBy);
  //   this.show = pages;
  //   if (setter) this.data = pages;
  //   this.generateTabs();
  // }

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
      case 'Colaborador':
        index = 0;
        break;
      case 'Comissão por produto':
        index = 1;
        break;
      case 'Meta Produto R$':
        index = 2;
        break;
      case 'Comissão por serviço':
        index = 3;
        break;
      case 'Meta Serviço R$':
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
