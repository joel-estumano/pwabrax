import { Injectable } from '@angular/core';
import { Core } from '../core/core';
import { HelperGetterService } from 'src/app/services/helpers/helpers/helper-getter.service';
import { PaginationService } from 'src/app/services/pagination/pagination.service';

@Injectable()
export class ReceivementsClass extends Core {
  pages: any = [];
  currentPage = 0;
  count: number = 0;
  public data;
  public show;
  public headers = ['Código', 'Cliente/Fornecedor', 'Venc. Original', 'Vencimento', 'Valor R$', 'Data de emissão', 'N° documento', 'Competência', 'Ação'];
  override cachePath = 'Receivements';
  override path = 'Receivements';

  constructor(public override getter: HelperGetterService, private pagination: PaginationService) {
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

  makePagination(res?, setter = true) {
    const pages = this.pagination.makeData(res ? res : this.data);
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

  filterActive(bool: boolean) {
    return this.value.map((e) => {
      if (bool && !e.exclude) return e;
      else if (!bool && e.exclude === true) return e;
    });
  }

  makeData(data) {
    const result: any = [];
    this.count = data.length;
    data.forEach((e, i) => {
      result.push({
        info: [
          e.id,
          e.supplier?.nome || e.supplier?.email || '',
          e.original_due_date ||
            new Date(e.createdAt.seconds * 1000).toLocaleDateString('pt-BR'),
          e.due_date ||
            new Date(e.createdAt.seconds * 1000).toLocaleDateString('pt-BR'),
          e.value ? 'R$ ' + e.value : 0,
          e.issue_date ||
            new Date(e.createdAt.seconds * 1000).toLocaleDateString('pt-BR'),
          e.document,
          e.period,
          'actions',
        ],
        actions: ['download-bankslip'],
        index: i,
        extra: ['receivements'],
      });
    });
    this.data = result;
    this.show = result;
    return result;
  }

  getDataQuantity() {
    return this.count;
  }
}
