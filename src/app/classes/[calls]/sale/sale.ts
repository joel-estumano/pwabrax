import { Injectable } from '@angular/core';
import { Core } from '../../core/core';
import { HelperGetterService } from 'src/app/services/helpers/helpers/helper-getter.service';

@Injectable()
export class SaleClass extends Core {
  override cachePath = 'Sales';
  override path = 'Sales';
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
    {
      name: 'Pagamento',
      value: 3,
      disabled: true,
    },
    {
      name: 'Documentos',
      value: 4,
      disabled: true,
    },
    {
      name: 'Contrato',
      value: 5,
      disabled: true,
    },
  ];

  public payment_methods = [
    {
      name: 'Dinheiro',
    },
    {
      name: 'Boleto Bancário',
    },
  ];

  public selectedTab = this.tabs[0];
  public headers = ['Código', 'Cliente', 'Status', 'Tipo', 'Data', 'Ação'];
  public data;
  public show;
  constructor(public override getter: HelperGetterService) {
    super(getter);
    this.collection = this.getter.crud.collectionConstructor(this.path);
  }

  makeData(data) {
    const result: any = [];
    data.forEach((e, i) => {
      result.push({
        info: [
          e.id,
          e.client?.nome,
          e.status ? e.status : 'Aberto',
          'Venda',
          new Date(e.createdAt.seconds * 1000).toLocaleDateString('pt-BR'),
          'actions',
        ],
        actions: ['edit', 'delete'],
        extra: [
          'sale',
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
