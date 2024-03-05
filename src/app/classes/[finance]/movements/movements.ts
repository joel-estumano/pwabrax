import { Injectable } from '@angular/core';
import { Core } from '../../core/core';
import { HelperGetterService } from 'src/app/services/helpers/helpers/helper-getter.service';

@Injectable()
export class MovementsClass extends Core {
  public data;
  public show;
  public headers = ['Número', 'Vencimento', 'Valor', 'Situação'];
  public cashier_headers = ['Número', 'Vencimento', 'Valor Retirada', 'Situação'];
  override cachePath = 'Movements';
  override path = 'Movements';
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
        info:
          // e.destiny === 'CX LOJA' ? [
          //   e.id,
          //   // e.origin === 'CX LOJA' ? 'Adicionando' : 'Retirando' || 'Retirando',
          //   e.date,
          //   e.destiny === 'CX LOJA' ? e.value : '-',
          //   e.status
          // ] : []
          [
          e.id,
          e.date,
          e.destiny === 'CX LOJA' ? '+' + e.value : e.value,
          e.status
          ],
        actions: [],
        index: i,
        extra: ['movements', e.destiny, e.origin],
      });
    });
    this.data = result;
    this.show = result;
    return result;
  }

}
