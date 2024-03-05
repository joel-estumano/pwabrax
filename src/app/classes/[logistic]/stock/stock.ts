import { Injectable } from '@angular/core';
import { Core } from '../../core/core';
import { HelperGetterService } from 'src/app/services/helpers/helpers/helper-getter.service';

@Injectable()
export class StockClass extends Core {
  STATUS = {
    Aguardando: 'Aguardando',
    Aguardando_Estoque: 'Aguardando Estoque',
    Em_Estoque: 'Em Estoque',
    Na_Loja: 'Na Loja',
    No_Carro: 'No Carro',
    Em_Preparação: 'Em Preparação',
    Enviado: 'Enviado',
    Vendido: 'Vendido',
    Entregue: 'Entregue',
    Devolução: 'Devolução',
    Servico_Cancelado: 'Serviços Cancelados',
  };

  status = [
    'Aguardando',
    'Aguardando Estoque',
    'Em Estoque',
    'Na Loja',
    'No Carro',
    'Em Preparação',
    'Enviado',
    'Vendido',
    'Entregue',
    'Devolução',
    'Serviços Cancelados',
  ];

  types: any = [
    {
      id: 1,
      nome: 'Chip',
    },
    {
      id: 2,
      nome: 'Celular',
    },
    {
      id: 3,
      nome: 'Antena',
    },
    {
      id: 4,
      nome: 'Capa de Celular',
    },
  ];
  categories: any = [
    {
      id: 1,
      nome: 'Acessórios',
    },
    {
      id: 2,
      nome: 'Celular',
    },
    {
      id: 3,
      nome: 'Chip',
    },
    {
      id: 4,
      nome: 'Antena',
    },
    {
      id: 5,
      nome: 'Capa de Celular',
    },
  ];

  override cachePath = 'Stock';
  override path = 'Stock';
  constructor(public override getter: HelperGetterService) {
    super(getter);
    this.collection = this.getter.crud.collectionConstructor(this.path);
  }

  public tabs = [
    {
      name: 'Estoque',
      value: 0,
      selected: true,
    },
    {
      name: 'Distribuição',
      value: 1,
      disabled: false,
    },
    {
      name: 'Histórico',
      value: 2,
      disabled: false,
    },
    {
      name: 'Serviços Cancelados',
      value: 3,
      disabled: false,
    },
    {
      name: 'Mapa',
      value: 4,
      disabled: true,
    },
  ];

  public selectedTab = this.tabs[0];
  // , 'Data'
  public headers = ['Código', 'Produto', 'Categoria', 'Qtd', 'Status', 'Criado Em', 'Ação'];
  public data;
  public show;

  makeData(data) {
    const result: any = [];
    data.forEach((e, i) => {
      result.push({
        info: [
          e.id,
          e.type,
          e.category,
          e.qtd,
          e.status ? e.status : '',
          new Date(e.createdAt.seconds * 1000).toLocaleDateString('pt-BR'),
          'actions',
        ],
        actions: ['edit', 'delete'],
        extra: [e.exclude ? e.exclude : false],
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
