import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CashierClass } from 'src/app/classes/[finance]/cashier/cashier';
import { OpenOrCloseCashClass } from 'src/app/classes/[finance]/cashier/open-close-cash';
import { UserClass } from 'src/app/classes/user/user';
import { MasterService } from 'src/app/services/master/master.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-open-close-cash-modal',
  templateUrl: './open-close-cash-modal.page.html',
  styleUrls: ['./open-close-cash-modal.page.scss'],
})
export class OpenCloseCashModalPage implements OnInit {
  form: FormGroup;
  done;
  lastCashierAction;
  public openDate = false;

  constructor(
    public user: UserClass,
    public cashier: CashierClass,
    public openOrCloseCash: OpenOrCloseCashClass,
    private master: MasterService,
    private screen: ScreenService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      description: this.formBuilder.control('', Validators.required),
      date: this.formBuilder.control('', Validators.required),
      status: this.formBuilder.control('', Validators.required),
      value: this.formBuilder.control('', Validators.required),
      action: this.formBuilder.control('', Validators.required),
      responsible: this.formBuilder.control(this.user.value)
    });
    this.getLastAction();
  }

  getLastAction() {
    if (this.lastCashierAction.hasAction) {
      switch (this.lastCashierAction.hasAction) {
        case 'ABRIR':
          return this.form.get('action')?.setValue('FECHAR');
        case 'FECHAR':
          return this.form.get('action')?.setValue('ABRIR');
        default:
          return ''
      }
    }

    const action = this.lastCashierAction?.hasAction;
    console.log(action, this.lastCashierAction)
  }

  pickDate() {
    this.openDate = !this.openDate;
  }

  setDate(event) {
    const date = event.detail.value;
    this.form.get('date')?.setValue(new Date(date).toLocaleDateString());
  }


  select_origin(event) {
    const { value } = event.detail;
    this.form.get('origin')?.setValue(value);
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
    this.openOrCloseCash.add(formData).then(() => {
      this.cashier.add(formData).then(() => {
        this.master.setFinance().then(() => {
          this.screen.dismissModal();
          this.screen.dismissLoading();
          this.done();
        });
      });
    });
  }
}
