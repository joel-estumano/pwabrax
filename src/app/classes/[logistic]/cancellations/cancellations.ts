import { Injectable } from '@angular/core';
import { HelperGetterService } from 'src/app/services/helpers/helpers/helper-getter.service';
import { Core } from '../../core/core';

@Injectable()
export class CancellationClass extends Core {
  override cachePath = 'CancellationReason';
  override path = 'CancellationReason';
  constructor(public override getter: HelperGetterService) {
    super(getter);
    this.collection = this.getter.crud.collectionConstructor(this.path);
  }
}
