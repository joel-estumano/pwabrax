import { Injectable } from '@angular/core';
import { HelperGetterService } from 'src/app/services/helpers/helpers/helper-getter.service';
import { Core } from '../../core/core';

@Injectable()
export class DevolutionClass extends Core {
  override cachePath = 'Devolutions';
  override path = 'Devolutions';
  constructor(public override getter: HelperGetterService) {
    super(getter);
    this.collection = this.getter.crud.collectionConstructor(this.path);
  }
}
