import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillsToPayClass } from 'src/app/classes/[finance]/billsToPay/billsToPay';
import { CashierClass } from 'src/app/classes/[finance]/cashier/cashier';
import { InvoicesClass } from 'src/app/classes/[finance]/invoices/invoices';
import { MasterService } from 'src/app/services/master/master.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-invoice-payment-modal',
  templateUrl: './invoice-payment-modal.page.html',
  styleUrls: ['./invoice-payment-modal.page.scss'],
})
export class InvoicePaymentModalPage implements OnInit {
  form: FormGroup;
  done;
  origins: any = ['CX LOJA', 'CX FINANCEIRO', 'COFRE', 'BANCOS', 'CHEQUES'];
  public openDueDate = false;
  public openPaymentDate = false;

  constructor(
    public invoices: InvoicesClass,
    public cashier: CashierClass,
    public billsToPay: BillsToPayClass,
    private master: MasterService,
    private screen: ScreenService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.required),
      value: this.formBuilder.control('', Validators.required),
      code: this.formBuilder.control('', Validators.required),
      origin: this.formBuilder.control('CX LOJA', Validators.required),
      due_date: this.formBuilder.control('', Validators.required),
      payment_date: this.formBuilder.control('', Validators.required),
      status: this.formBuilder.control('PAGO'),
      updatedAt: this.formBuilder.control(new Date())
    });
  }

  pickDueDate() {
    this.openDueDate = !this.openDueDate;
  }

  pickPaymentDate() {
    this.openPaymentDate = !this.openPaymentDate;
  }

  setDueDate(event) {
    const date = event.detail.value;
    this.form.get('due_date')?.setValue(new Date(date).toLocaleDateString());
  }

  setPaymentDate(event) {
    const date = event.detail.value;
    this.form
      .get('payment_date')
      ?.setValue(new Date(date).toLocaleDateString());
  }

  select_origin(event) {
    const { value } = event.detail;
    this.form.get('origin')?.setValue(value);
  }

  deletePaidedBill(number?: number) {
    this.billsToPay.value.map((e: any) => {
      if (e.document === number) {
        this.billsToPay.delete(e.id);
      }
    });
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
    this.deletePaidedBill(formData.code);

    this.invoices.add(formData).then(() => {
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
