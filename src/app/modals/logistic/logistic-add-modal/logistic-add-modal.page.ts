import { Component } from '@angular/core';
import { Logistic } from 'src/app/interfaces/logistic';
import { LogisticManagerService } from 'src/app/services/helpers/managers/logistic-manager.service';
import { MasterService } from 'src/app/services/master/master.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-logistic-add-modal',
  templateUrl: './logistic-add-modal.page.html',
  styleUrls: ['./logistic-add-modal.page.scss'],
})
export class LogisticAddModalPage {
  done;
  logistic: Logistic = {
    status: 'Aguardando',
    type: '',
    trackingCode: '',
    qtd: '',
    seller: '',
    cost: '',
    name: '',
    cpf: '',
    cellphone: '',
    uf: '',
    cep: '',
    address: '',
    number: '',
    complement: '',
    receiver: '',
    shipping_method: '',
    sale_value: '',
    discount: '',
    shipping_value: '',
    shipping_discount: '',
    payment_method: '',
    created_at: new Date(),
    category: '',
    operator: '',
    lineNumber: '',
    iccid: '',
    note: '',
    products: [],
  };
  constructor(
    private screen: ScreenService,
    private logisticManager: LogisticManagerService,
    private master: MasterService,
    private navigation: NavigationService
  ) {
    this.addProduct();
  }

  addProduct() {
    if (this.logistic.products === undefined) {
      this.logistic.products = [];
    }

    this.logistic.products.push({
      category: '',
      operator: '',
      lineNumber: '',
      iccid: '',
      note: '',
    });
  }

  dismiss() {
    this.screen.dismissModal();
  }

  async save() {
    if (this.logistic.products === undefined) {
      return false;
    }

    await this.screen.presentLoading();

    await Promise.all(
      this.logistic.products.map((product) => {
        let auxArray = this.logistic;
        auxArray.category = product.category;
        auxArray.operator = product.operator;
        auxArray.lineNumber = product.lineNumber;
        auxArray.iccid = product.iccid;
        auxArray.note = product.note;
        auxArray.category = product.category;
        auxArray.type = product.type;
        auxArray.qtd = product.qtd;
        this.logisticManager.stock.add(this.logistic);
      })
    ).then(() => {
      this.master.setLogistic().then(() => {
        this.screen.dismissModal();
        this.screen.dismissLoading();
        this.done();
      });
    });
  }
}
