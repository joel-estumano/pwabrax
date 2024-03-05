import { Injectable } from '@angular/core';
import { Core } from '../core/core';
import { HelperGetterService } from 'src/app/services/helpers/helpers/helper-getter.service';

@Injectable()
export class PrivacyClass extends Core {
  override cachePath = 'Privacy';
  override path = 'Privacy';
  public text = 'Lorem Ipsum';
  constructor(public override getter: HelperGetterService) {
    super(getter);
    this.collection = this.getter.crud.collectionConstructor(this.path);
  }
}
