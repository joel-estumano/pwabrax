import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovementsClass } from 'src/app/classes/[finance]/movements/movements';
import { PaymentsClass } from 'src/app/classes/payments/payments';
import { ProductClass } from 'src/app/classes/product/products';
import { UserClass } from 'src/app/classes/user/user';
import { MasterService } from 'src/app/services/master/master.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-move-values-modal',
  templateUrl: './move-values-modal.page.html',
  styleUrls: ['./move-values-modal.page.scss'],
})
export class MoveValuesModalPage implements OnInit {
  form: FormGroup;
  destinies: any = ['CX LOJA', 'CX FINANCEIRO', 'COFRE', 'BANCOS', 'CHEQUES'];
  public openDate = false;
  done;
  fixed;

  constructor(
    public user: UserClass,
    public products: ProductClass,
    public payments: PaymentsClass,
    public movements: MovementsClass,
    private master: MasterService,
    private screen: ScreenService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      origin: this.formBuilder.control('CX LOJA', Validators.required),
      destiny: this.formBuilder.control('', Validators.required),
      value: this.formBuilder.control('', Validators.required),
      date: this.formBuilder.control('', Validators.required),
      observation: this.formBuilder.control(''),
      status: this.formBuilder.control('PAGO'),
      responsible: this.formBuilder.control(this.user.value),
    });
  }

  pickDate() {
    this.openDate = !this.openDate;
  }

  setDate(event) {
    const date = event.detail.value;
    this.form.get('date')?.setValue(new Date(date).toLocaleDateString());
  }

  select_destiny(event) {
    const { value } = event.detail;
    this.form.get('destiny')?.setValue(value);
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

    this.movements.add(formData).then(() => {
      this.master.setFinance().then(() => {
        this.screen.dismissModal();
        this.screen.dismissLoading();
        this.done();
      });
    });
  }
}
