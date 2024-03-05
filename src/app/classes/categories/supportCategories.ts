import { Injectable } from '@angular/core';
import { Core } from '../core/core';
import { HelperGetterService } from 'src/app/services/helpers/helpers/helper-getter.service';
import { PaginationService } from 'src/app/services/pagination/pagination.service';

@Injectable()
export class SupportCategoriesClass extends Core {
  override cachePath = 'SupportCategories';
  override path = 'SupportCategories';
  data: any = [];
  show: any = [];
  pages: any = [];
  currentPage = 0;

  public tabs = [
    {
      name: 'Informações',
      value: 0,
      selected: true,
    },
    {
      name: 'Produtos',
      value: 1,
    },
    {
      name: 'Documentos',
      value: 2,
    },
  ];

  public selectedTab = this.tabs[0];

  public headers = ['Código', 'Categorias de Suporte', 'Criado em', 'Ação'];
  constructor(
    public override getter: HelperGetterService,
    private pagination: PaginationService
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
          e.id,
          e.name,
          new Date(e.createdAt.seconds * 1000).toLocaleDateString('pt-BR'),
          'actions',
        ],
        actions: ['edit', 'delete'],
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
}
