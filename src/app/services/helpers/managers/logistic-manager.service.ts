import { Injectable } from '@angular/core';
import { PaginationService } from '../../pagination/pagination.service';
import { OrderingService } from '../../ordering/ordering.service';
import { UserClass } from 'src/app/classes/user/user';
import { CancelledServicesClass } from 'src/app/classes/[logistic]/cancelledServices/cancelledServices';
import { DistributionClass } from 'src/app/classes/[logistic]/distribution/distribution';
import { HistoricClass } from 'src/app/classes/[logistic]/historic/historic';
import { StockClass } from 'src/app/classes/[logistic]/stock/stock';

@Injectable({
  providedIn: 'root',
})
export class LogisticManagerService {
  data: any = [];
  show: any = [];
  pages: any = [];
  currentPage = 0;
  tabs = [
    {
      name: 'Estoque',
      selected: true,
    },
    {
      name: 'Distribuição',
    },
    {
      name: 'Histórico',
    },
    {
      name: 'Serviços Cancelados',
    },
  ];
  constructor(
    public cancelledServices: CancelledServicesClass,
    public distribuition: DistributionClass,
    public historic: HistoricClass,
    public stock: StockClass,
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
    data = Array.isArray(data[0]) ? data[0] : data;
    const filteredData = data
      .map((e) => {
        if (!e.extra[0]) return e;
      })
      .filter((e) => {
        if (e) return e;
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

  tabsFilter(tab, tabs) {
    this.show = [];
    if (tab.name === tabs[0].name) {
      this.data.forEach((element) => {
        const a = element.filter((e) => {
          if (
            e.info[4] === this.stock.STATUS.Aguardando ||
            e.info[4] === this.stock.STATUS.Em_Estoque
          )
            return e;
        });
        this.show.push(...a);
      });
    } else if (tab.name === tabs[1].name) {
      this.data.forEach((element) => {
        const a = element.filter((e) => {
          if (
            e.info[4] === this.stock.STATUS.Na_Loja ||
            e.info[4] === this.stock.STATUS.No_Carro ||
            e.info[4] === this.stock.STATUS.Em_Preparação ||
            e.info[4] === this.stock.STATUS.Devolução ||
            e.info[4] === this.stock.STATUS.Enviado ||
            e.info[4] === this.stock.STATUS.Vendido
          )
            return e;
        });
        this.show.push(...a);
      });
    } else if (tab.name === tabs[2].name) {
      this.data.forEach((element) => {
        const a = element.filter((e) => {
          if (e.info[4] === this.stock.STATUS.Entregue) return e;
        });
        this.show.push(...a);
      });
    } else if (tab.name === tabs[3].name) {
      this.data.forEach((element) => {
        const a = element.filter((e) => {
          if (e.info[4] === this.stock.STATUS.Servico_Cancelado) return e;
        });
        this.show.push(...a);
      });
    }
  }

  order(
    order: 'desc' | 'asc' = 'desc',
    orderType:
      | 'Produto'
      | 'Código'
      | 'Categoria'
      | 'Qtd'
      | 'Status' = 'Produto',
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
      case 'Produto':
        index = 1;
        break;
      case 'Categoria':
        index = 2;
        break;
      case 'Qtd':
        index = 3;
        break;
      case 'Status':
        index = 4;
        break;
      case 'Criado Em':
        index = 5;
        break;

      default:
        index = 5;
        break;
    }
    return index;
  }
}
