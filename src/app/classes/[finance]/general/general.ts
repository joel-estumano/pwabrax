import { Injectable } from '@angular/core';
import { Core } from '../../core/core';
import { HelperGetterService } from 'src/app/services/helpers/helpers/helper-getter.service';

@Injectable()
export class GeneralClass extends Core {
  public data;
  public show;
  public headers = [
    'Número',
    'Vencimento',
    'Produto/Serviço',
    'Forma de Pagamento',
    'Data Pagamento',
    'Valor R$',
    'Situação',
  ];
  override cachePath = 'Cashier';
  override path = 'Cashier';
  constructor(public override getter: HelperGetterService) {
    super(getter);
    this.collection = this.getter.crud.collectionConstructor(this.path);
  }

  makeSet(res) {
    this.fill(res);
    return this.makeData(res);
  }

  makeData(data) {
    const result: any = [];
    data.forEach((e, i) => {
      result.push({
        info: [
          e.id,
          e.due_date ||
          new Date(e.createdAt.seconds * 1000).toLocaleDateString('pt-BR'),
          this.getActionColumn(e),
          e.payment_method || '---',
          new Date(e.createdAt.seconds * 1000).toLocaleDateString('pt-BR'),
          e.value,
          e.status,
        ],
        actions: [],
        index: i,
        extra: ['general'],
      });
    });
    this.data = result;
    this.show = result;
    return result;
  }

  getActionColumn(e: any) {
    if (e.action) {
      switch (e.action) {
        case 'ABRIR':
          return 'Abertura de Caixa';
        case 'FECHAR':
          return 'Fechamento de Caixa';
        default:
          return e.action;
      }
    }
    else {
      return e.product?.title || e.name || '';
    }
  }
}
