import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesClass } from 'src/app/classes/[logistic]/categories/categories';
import { OperatorsClass } from 'src/app/classes/[logistic]/operators/operators';
import { StockClass } from 'src/app/classes/[logistic]/stock/stock';
import { PaymentsClass } from 'src/app/classes/payments/payments';
import { UserClass } from 'src/app/classes/user/user';
import { Logistic } from 'src/app/interfaces/logistic';
import { CancelationOrDevolutionPage } from 'src/app/modals/logistic/cancelation-or-devolution/cancelation-or-devolution.page';
import { LogisticManagerService } from 'src/app/services/helpers/managers/logistic-manager.service';
import { MasterService } from 'src/app/services/master/master.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-logistic-add',
  templateUrl: './logistic-add.page.html',
  styleUrls: ['./logistic-add.page.scss'],
})
export class LogisticAddPage {
  id = '';
  logistic: Logistic = {
    id: '',
    status: '',
    code: '',
    type: '',
    trackingCode: '',
    qtd: '',
    seller: '',
    cost: '',
    name: '',
    cpf: '',
    cellphone: '',
    city: '',
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
    products: [],
  };
  constructor(
    public logisticManagerService: LogisticManagerService,
    public stockClass: StockClass,
    private master: MasterService,
    public categoriesClass: CategoriesClass,
    public operatorClass: OperatorsClass,
    public payments: PaymentsClass,
    public user: UserClass,
    private screen: ScreenService,
    private route: ActivatedRoute,
    private navigation: NavigationService
  ) {
    this.route.queryParams.subscribe(async (params: any) => {
      this.id = params.params;
      if (Array.isArray(this.id)) {
        this.id = this.id[0];
      }
      if (this.id) {
        const find = this.stockClass.find(this.id);
        this.logistic = find ? find : await this.stockClass.getHttp(this.id);
        this.getProductSectionRange();
      }
      console.log('logistic - ', this.logistic);
    });
  }

  back() {
    this.navigation.goTo('logistic');
  }

  recoverLine() {
    this.screen.presentAlertConfirm(
      'Você tem certeza que deseja recuperar essa linha?',
      '',
      '',
      () => {
        this.logistic.status = this.stockClass.STATUS.Em_Estoque;
        this.save();
      },
      () => { }
    );
  }

  cancelLine() {
    this.screen.openModal(CancelationOrDevolutionPage, 'is50 large', {
      title: 'Cancelar Linha',
      save: (reason, observation) => {
        this.logistic.reason = reason;
        this.logistic.observation = observation;
        this.logistic.status = this.stockClass.STATUS.Servico_Cancelado;
        this.logistic.seller = this.user.value;
        // TODO: COLOCAR DADOS DE QUEM COMPROU O PRODUTO QUE AGORA ESTÁ CANCELADO
        this.save().then(() => {
          this.screen.dismissModal();
        });
      },
    });
  }

  distribution() {
    this.screen.openModal(CancelationOrDevolutionPage, 'is50 large', {
      title: 'Devolução',
      save: (reason, observation) => {
        this.logistic.reason = reason;
        this.logistic.observation = observation;
        this.logistic.status = this.stockClass.STATUS.Devolução;
        this.logistic.seller = this.user.value;
        // TODO: COLOCAR DADOS DE QUEM COMPROU O PRODUTO QUE AGORA ESTÁ DEVOLVIDO
        this.save().then(() => {
          this.screen.dismissModal();
        });
      },
    });
  }

  async save() {
    await this.screen.presentLoading();
    this.stockClass.update(this.logistic, this.id).then(() => {
      this.master.setLogistic().then(() => {
        this.screen.dismissLoading();
        this.navigation.goTo('logistic');
      });
    });
  }

  onlyNumber(event: KeyboardEvent) {
    const allowedChars = /[0-9]/;
    const inputChar = String.fromCharCode(event.keyCode || event.which);

    if (!allowedChars.test(inputChar)) {
      event.preventDefault();
    }
  }

  onlyText(event: KeyboardEvent) {
    const allowedChars = /[a-zA-Z\s]/;
    const inputChar = String.fromCharCode(event.keyCode || event.which);

    if (!allowedChars.test(inputChar)) {
      event.preventDefault();
    }
  }

  onQuantidadeChange(): void {
    this.getProductSectionRange();
  }

  getProductSectionRange(): void {
    if (!this.logistic.qtd) {
      return;
    }

    const qtd = parseInt(this.logistic.qtd, 10);
    if (isNaN(qtd)) {
      return;
    }

    if (
      this.logistic.products === undefined ||
      this.logistic.products.length === 0
    ) {
      this.logistic.products = Array.from({ length: qtd }, () => ({
        category: '',
        operator: '',
        lineNumber: '',
        iccid: '',
        note: '',
      }));
    }

    if (qtd > this.logistic.products.length) {
      const numToAdd = qtd - this.logistic.products.length;
      for (let i = 0; i < numToAdd; i++) {
        this.logistic.products.push({
          category: '',
          operator: '',
          lineNumber: '',
          iccid: '',
          note: '',
        });
      }
    } else if (qtd < this.logistic.products.length) {
      this.logistic.products = this.logistic.products.slice(0, qtd);
    }
  }
}
