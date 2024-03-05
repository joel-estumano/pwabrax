import { Injectable } from '@angular/core';
import { Core } from '../../core/core';
import { HelperGetterService } from 'src/app/services/helpers/helpers/helper-getter.service';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { OrderingService } from 'src/app/services/ordering/ordering.service';

@Injectable()
export class SupportClass extends Core {
  pages: any = [];
  currentPage = 0;
  override cachePath = 'Supports';
  override path = 'Supports';
  public status = [
    {
      name: 'Aguardando',
    },
    {
      name: 'Em Atendimento',
    },
    {
      name: 'Aguardando Distribuidor',
    },
    {
      name: 'Endereço Não Localizado',
    },
    {
      name: 'Profissional Não atendido',
    },
    {
      name: 'Finalizado',
    },
    {
      name: 'Cancelado',
    }
  ];
  public supportCategories = [
    {
      name: 'Dúvida',
    },
    {
      name: 'Sugestão',
    },
    {
      name: 'Reclamação',
    },
    {
      name: 'Outros',
    },
  ];
  public headers = [
    'Código',
    'Protocolo',
    'Cliente',
    'Status',
    'Categoria',
    'Data Solicitação',
    'Ação',
  ];
  public data;
  public show;
  constructor(
    public override getter: HelperGetterService,
    private pagination: PaginationService,
    private ordering: OrderingService
  ) {
    super(getter);
    this.collection = this.getter.crud.collectionConstructor(this.path);
  }

  makeData(data) {
    const result: any = [];
    data.forEach((e, i) => {
      result.push({
        info: [
          e.id,
          e.protocol || 'Não Informado',
          e.user.nome,
          e.status,
          e.category,
          e.date,
          'actions',
        ],
        actions: ['edit', 'delete'],
        extra: [
          'support',
          e.excludeSolicitation,
          e.exclude ? e.exclude : false,
          e.client ? e.client.associate_to : '',
        ],
        index: i,
      });
    });
    this.data = result;
    this.show = result;
  }

  makeSet(res) {
    this.fill(res);
    this.makeData(res);
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
      this.show.length
    );
    if (this.pages.length == 0) this.pages.push(1);
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
      case 'Protocolo':
        index = 1;
        break;
      case 'Cliente':
        index = 2;
        break;
      case 'Status':
        index = 3;
        break;
      case 'Categoria':
        index = 4;
        break;
      case 'Data Solicitação':
        index = 5;
        break;

      default:
        index = 5;
        break;
    }
    return index;
  }
}
