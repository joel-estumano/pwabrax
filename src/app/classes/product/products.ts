import { Injectable } from '@angular/core';
import { Core } from '../core/core';
import { HelperGetterService } from 'src/app/services/helpers/helpers/helper-getter.service';
import { Products } from 'src/app/interfaces/products';

@Injectable()
export class ProductClass extends Core {
  override cachePath = 'Products';
  override path = 'Products';
  public show;
  public headers = ['Código', 'Produto', 'Tipo', 'Ação'];
  public types = [
    {
      name: 'Telefonia Fixa',
      icon: 'call-sharp',
      data: [],
    },
    {
      name: 'Telefonia Móvel',
      icon: 'cellular-sharp',
      data: [],
    },
    {
      name: 'Banda Larga',
      icon: 'wifi-sharp',
      data: [],
    },
  ];
  public data;
  constructor(public override getter: HelperGetterService) {
    super(getter);
    this.collection = this.getter.crud.collectionConstructor(this.path);
  }

  setFromTypes(res) {
    this.types.forEach((type) => {
      type.data = res.filter((product) => {
        if (product.type === type.name) return product;
      });
    });
  }

  makeData(data: Array<Products>) {
    const result: any = [];
    data.forEach((e, i) => {
      result.push({
        info: [e.id, e.title, e.type, 'actions'],
        actions: ['edit', 'delete'],
        index: i,
      });
    });
    this.data = result;
    this.show = result;
  }

  makeSet(res) {
    this.fill(res);
    this.makeData(res);
    this.setFromTypes(res);
  }

  reset() {
    this.show = this.data;
  }

  resetProducts() {
    this.types.forEach((type) => {
      type.data.forEach((e: any) => {
        e.quantity = 0;
      });
    });
  }
}
