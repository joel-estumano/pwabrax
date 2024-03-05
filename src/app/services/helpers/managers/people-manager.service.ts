import { Injectable } from '@angular/core';
import { ClientClass } from 'src/app/classes/[people]/clients/clients';
import { ColaboratorsClass } from 'src/app/classes/[people]/colaborators/colaborators';
import { PartnersClass } from 'src/app/classes/[people]/partners/partners';
import { SuppliersClass } from 'src/app/classes/[people]/suppliers/suppliers';
import { PaginationService } from '../../pagination/pagination.service';
import { OrderingService } from '../../ordering/ordering.service';

@Injectable({
  providedIn: 'root',
})
export class PeopleManagerService {
  public headers;
  public data;
  public show;
  public info;
  pages: any = [];
  currentPage = 0;
  constructor(
    public clients: ClientClass,
    public partners: PartnersClass,
    public colaborators: ColaboratorsClass,
    public suppliers: SuppliersClass,
    private pagination: PaginationService,
    private ordering: OrderingService
  ) {}

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

  order(
    order: 'desc' | 'asc' = 'desc',
    orderType:
      | 'Código'
      | 'Cliente'
      | 'Contato'
      | 'Situação'
      | 'Data Contrato' = 'Data Contrato',
    customUser?
  ) {
    this.makePagination(this.data, false, customUser, order, orderType);
  }

  private orderBy(data, order: 'desc' | 'asc' = 'desc', type?) {
    const index = this.getOrderIndex(type);
    return this.ordering?.order(data, order, (n1, n2) => {
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
      case 'Cliente' || 'Fornecedor' || 'Colaborador' || 'Parceiro':
        index = 1;
        break;
      case 'Contato':
        index = 2;
        break;
      case 'Situação':
        index = 3;
        break;
      case 'Data Contrato':
        index = 4;
        break;

      default:
        index = 4;
        break;
    }
    return index;
  }
}
