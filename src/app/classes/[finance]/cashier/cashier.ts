import { Injectable } from '@angular/core';
import { Core } from '../../core/core';
import { HelperGetterService } from 'src/app/services/helpers/helpers/helper-getter.service';

@Injectable()
export class CashierClass extends Core {
  public data;
  public show;
  public headers = ['Número', 'Data', 'Valor', 'Situação', 'Ação', 'Responsável'];
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
          e.date ? e.date : e.due_date ||
            new Date(e.createdAt.seconds * 1000).toLocaleDateString('pt-BR'),
          e.value,
          e.status,
          this.getActionColumn(e),
          e.responsible ? e.responsible?.nome || e.responsible?.email : '',
        ],
        actions: [],
        index: i,
        hasAction: e.action ? e.action : null,
        extra: [
          'cashier',
          new Date(e.createdAt.seconds * 1000).toLocaleDateString('pt-BR'),
        ],
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
      return e.description || '';
    }
  }
}
