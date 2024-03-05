import { Injectable } from '@angular/core';
import { Core } from '../../core/core';
import { HelperGetterService } from 'src/app/services/helpers/helpers/helper-getter.service';

@Injectable()
export class InvoicesClass extends Core {
  public data;
  public show;
  public headers = ['Número', 'Vencimento', 'Valor', 'Situação'];
  override cachePath = 'Invoices';
  override path = 'Invoices';
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
        info: [e.id, e.date, e.value, e.status],
        actions: [],
        index: i,
        extra: ['invoices'],
      });
    });
    this.data = result;
    this.show = result;
    return result;
  }
}
