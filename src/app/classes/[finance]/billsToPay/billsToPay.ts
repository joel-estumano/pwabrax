import { Injectable } from '@angular/core';
import { Core } from '../../core/core';
import { HelperGetterService } from 'src/app/services/helpers/helpers/helper-getter.service';

@Injectable()
export class BillsToPayClass extends Core {
  count: number = 0;
  public data;
  public show;
  public headers = [
    'Fornecedor', 'Venc. Original', 'Vencimento', 'Valor R$',
    'Data de emissão', 'N° documento', 'Competência'];
  public phone_headers = [
    'Cliente', 'N° Linha', 'Venc. Original', 'Vencimento',
    'Valor R$', 'Data de emissão', 'N° conta', 'Competência'];
  override cachePath = 'BillsToPay';
  override path = 'BillsToPay';
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
    this.count = data.length;
    data.forEach((e, i) => {
      result.push({
        info:
          e.type == 'ADMINISTRATIVO'
            ? [
              e.supplier?.nome || e.supplier?.email || '',
              e.original_due_date ||
              new Date(e.createdAt.seconds * 1000).toLocaleDateString(
                'pt-BR'
              ),
              e.due_date ||
              new Date(e.createdAt.seconds * 1000).toLocaleDateString(
                'pt-BR'
              ),
              e.value,
              e.issue_date ||
              new Date(e.createdAt.seconds * 1000).toLocaleDateString(
                'pt-BR'
              ),
              e.document,
              e.period,
            ]
            : [
              e.client.nome,
              e.line,
              e.original_due_date ||
              new Date(e.createdAt.seconds * 1000).toLocaleDateString(
                'pt-BR'
              ),
              e.due_date ||
              new Date(e.createdAt.seconds * 1000).toLocaleDateString(
                'pt-BR'
              ),
              e.value,
              e.issue_date ||
              new Date(e.createdAt.seconds * 1000).toLocaleDateString(
                'pt-BR'
              ),
              e.account,
              e.period,
            ],
        actions: [],
        index: i,
        extra: ['billsToPay', e.type],
      });
    });
    this.data = result;
    this.show = result;
    return result;
  }

  getDataQuantity() {
    return this.count;
  }

  reset() {
    this.data = [];
    this.show = [];
  }
}
