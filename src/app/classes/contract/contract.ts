import { Injectable } from '@angular/core';
import { Core } from '../core/core';
import { HelperGetterService } from 'src/app/services/helpers/helpers/helper-getter.service';

@Injectable()
export class ContractClass extends Core {
  override cachePath = 'Contracts';
  override path = 'Contracts';
  public text = 'Lorem Ipsum';
  constructor(public override getter: HelperGetterService) {
    super(getter);
    this.collection = this.getter.crud.collectionConstructor(this.path);
  }
}
