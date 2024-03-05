import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CashierClass } from 'src/app/classes/[finance]/cashier/cashier';
import { StockClass } from 'src/app/classes/[logistic]/stock/stock';
import { PaymentsClass } from 'src/app/classes/payments/payments';
import { ProductClass } from 'src/app/classes/product/products';
import { UserClass } from 'src/app/classes/user/user';
import { MasterService } from 'src/app/services/master/master.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-finance-sell-modal',
  templateUrl: './finance-sell-modal.page.html',
  styleUrls: ['./finance-sell-modal.page.scss'],
})
export class FinanceSellModalPage implements OnInit {
  combinedProducts: any = [];
  form: FormGroup;
  done;
  clients: any = [];
  responsibles: any = [];
  sell: any = {
    product: '',
    value: '',
    final_value: '',
    payment_method: '',
    client: '',
    code: '',
    status: 'PAGO',
  };

  constructor(
    public user: UserClass,
    public products: ProductClass,
    public stock: StockClass,
    public payments: PaymentsClass,
    public cashier: CashierClass,
    private master: MasterService,
    private screen: ScreenService,
    private formBuilder: FormBuilder
  ) {
      this.loadClients();
      this.loadResponsibles();
      // juntar a lista de produtos cadastrados em logística com a lista de produtos cadastrados em estoque
      this.combinedProducts = [...products.value, ...stock.value]; 
    }

  ngOnInit() {
    this.form = this.formBuilder.group({
      product: this.formBuilder.control('', Validators.required),
      value: this.formBuilder.control('', Validators.required),
      final_value: this.formBuilder.control('', Validators.required),
      payment_method: this.formBuilder.control('', Validators.required),
      client: this.formBuilder.control('', Validators.required),
      code: this.formBuilder.control('', Validators.required),
      responsible: this.formBuilder.control(this.user.value),
      status: this.formBuilder.control('PAGO'),
    });
  }

  loadClients() {
    this.clients = this.user.finderLevel([1]);
  }

  loadResponsibles() {
    this.responsibles = this.user.finderLevel([2, 3, 4, 5, 6, 7]);
  }

  select_product(event) {
    const { value } = event.detail;
    this.form.get('product')?.setValue(this.products.find(value));
  }

  select_client(event) {
    const { value } = event.detail;
    this.form.get('code')?.setValue(value);
    this.form.get('client')?.setValue(this.user.find(value));
  }

  select_responsible(event) {
    const { value } = event.detail;
    this.form.get('responsible')?.setValue(this.user.find(value));
  }

  dismiss() {
    this.screen.dismissModal();
  }

  async save() {
    await this.screen.presentLoading();

    if (!this.form.valid) {
      this.screen.presentToast(
        'Preencha todos os campos obrigatórios!',
        'warning'
      );
      this.screen.dismissLoading();
      return false;
    }

    const formData = this.form.value;

    this.cashier.add(formData).then(() => {
      this.master.setFinance().then(() => {
        this.screen.dismissModal();
        this.screen.dismissLoading();
        this.done();
      });
    });
  }
}
