import { Injectable } from '@angular/core';
import { Core } from '../../core/core';
import { HelperGetterService } from 'src/app/services/helpers/helpers/helper-getter.service';

@Injectable()
export class DistributionClass extends Core {
  override cachePath = 'Distribution';
  override path = 'Distribution';
  constructor(public override getter: HelperGetterService) {
    super(getter);
    this.collection = this.getter.crud.collectionConstructor(this.path);
  }

  public tabs = [
    {
      name: 'Cliente',
      value: 0,
      selected: true,
    },
    {
      name: 'Cadastro',
      value: 1,
      disabled: false,
    },
    {
      name: 'Produtos',
      value: 2,
      disabled: true,
    },
  ];

  public selectedTab = this.tabs[0];
  public headers = ['Produto', 'Código', 'Categoria', 'Qtd', 'Status', 'Ação'];
  public data;
  public show;

  makeData(data) {
    const result: any = [];
    data.forEach((e, i) => {
      result.push({
        info: [
          e.id,
          e.client?.nome,
          e.status ? e.status : 'Aberto',
          'Orçamento',
          new Date(e.createdAt.seconds * 1000).toLocaleDateString('pt-BR'),
          'actions',
        ],
        actions: ['edit', 'delete'],
        extra: [
          'budget',
          e.excludeSolicitation,
          e.exclude ? e.exclude : false,
          e.client.associate_to,
        ],
        index: i,
      });
    });
    this.data = result;
    this.show = result;
    return result;
  }

  makeSet(res) {
    this.fill(res);
    return this.makeData(res);
  }
}
