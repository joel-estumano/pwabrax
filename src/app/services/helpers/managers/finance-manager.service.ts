import { Injectable } from '@angular/core';
import { GeneralClass } from 'src/app/classes/[finance]/general/general';
import { CashierClass } from 'src/app/classes/[finance]/cashier/cashier';
import { BillsToPayClass } from 'src/app/classes/[finance]/billsToPay/billsToPay';
import { MovementsClass } from 'src/app/classes/[finance]/movements/movements';
import { PaginationService } from '../../pagination/pagination.service';
import { OrderingService } from '../../ordering/ordering.service';
import { ReceivementsClass } from 'src/app/classes/receivements/receivements';

@Injectable({
  providedIn: 'root',
})
export class FinanceManagerService {
  data: any = [];
  show: any = [];
  pages: any = [];
  currentPage = 0;

  tabs = [
    {
      name: 'Visão Geral',
      class: 'general',
      selected: true,
    },
    {
      name: 'Caixa',
      class: 'cashier',
      options: [
        {
          name: 'Histórico de pagamentos',
          selected: true,
        },
        {
          name: 'Vendas do dia',
        },
      ],
    },
    {
      name: 'Contas a pagar',
      class: 'billsToPay',
      options: [
        {
          name: 'Administrativo',
          selected: true,
        },
        {
          name: 'Telefonia',
        },
      ],
    },
    {
      name: 'Movimentações',
      class: 'movements',
      options: [
        {
          name: 'Cx loja',
          selected: true,
        },
        {
          name: 'Cx financeiro',
        },
        {
          name: 'Cofre',
        },
        {
          name: 'Bancos',
        },
        {
          name: 'Cheques',
        },
      ],
    },
    { name: 'A receber', class: 'receivements', hidden: true },
  ];

  constructor(
    public general: GeneralClass,
    public cashier: CashierClass,
    public billsToPay: BillsToPayClass,
    public movements: MovementsClass,
    public receivements: ReceivementsClass,
    private pagination: PaginationService,
    private ordering: OrderingService
  ) { }

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

  // PAGINAÇÃO

  makePagination(res?, setter = true, user?, order?, orderType?) {
    let data = res ? res : this.data;
    if (user && user.level === '3') {
      data = data.filter((e) => {
        if (e.extra[2] === user.id) return e;
      });
    }

    const orderBy = this.orderBy(data, order, orderType);
    const pages = this.pagination?.makeData(orderBy);
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
    } else if (tab.name === tabs[2].name) {
      if (filterOption >= 0) {
        var activeOption = tabs[2].options[filterOption];
      }

      this.data.forEach((element) => {
        const a = element.filter((e) => {
          if (e.extra[0] === 'billsToPay') {
            if (!activeOption) return e;
            if (
              activeOption.name == 'Administrativo' &&
              e.extra[1] == 'ADMINISTRATIVO'
            )
              return e;
            if (activeOption.name == 'Telefonia' && e.extra[1] == 'TELEFONIA')
              return e;
          }
        });
        this.show.push(...a);
      });
    } else if (tab.name === tabs[3].name) {
      if (filterOption >= 0) {
        var activeOption = tabs[3].options[filterOption];
      }

      this.data.forEach((element) => {
        const a = element.filter((e) => {
          if (e.extra[0] === 'movements') {
            if (!activeOption) return e;
            // RETIRANDO O FILTRO DE MOVIMENTAÇÕES / CX LOJA 
            // if (activeOption.name == 'Cx loja' && e.extra[1] == 'CX LOJA') return e;
            if (activeOption.name == 'Cx loja') return e;
            if (activeOption.name == 'Cx financeiro' && e.extra[1] == 'CX FINANCEIRO') return e;
            if (activeOption.name == 'Cofre' && e.extra[1] == 'COFRE') return e;
            if (activeOption.name == 'Bancos' && e.extra[1] == 'BANCOS') return e;
            if (activeOption.name == 'Cheques' && e.extra[1] == 'CHEQUES') return e;
          }
        });
        this.show.push(...a);
      });
    } else if (tab.name === tabs[4].name) {
      this.data.forEach((element) => {
        const a = element.filter((e) => {
          if (e.extra[0] === 'receivements') return e;
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

  order(order: 'desc' | 'asc' = 'desc', 
  orderType: 'Número' | 'Vencimento' | 'Valor' | 'Situação' = 'Número', customUser?) {
    this.makePagination(this.data, false, customUser, order, orderType);
  }

  private orderBy(data, order: 'desc' | 'asc' = 'desc', type?) {
    const index = this.getOrderIndex(type) || 0;
    return this.ordering.order(data, order, (n1, n2) => {
      return {
        s1: n1.info[index] ? n1.info[index] : '',
        s2: n2.info[index] ? n2.info[index] : '',
      };
    });
  }

  private getOrderIndex(type) {
    let index = 1;
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
        index = 1;
        break;
    }
    return index;
  }
}
