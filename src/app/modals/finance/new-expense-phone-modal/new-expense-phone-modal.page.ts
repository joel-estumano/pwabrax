import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillsToPayClass } from 'src/app/classes/[finance]/billsToPay/billsToPay';
import { FinanceCategoriesClass } from 'src/app/classes/[finance]/categories/finance-categories';
import { PaymentsClass } from 'src/app/classes/payments/payments';
import { UserClass } from 'src/app/classes/user/user';
import { MasterService } from 'src/app/services/master/master.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-new-expense-phone-modal',
  templateUrl: './new-expense-phone-modal.page.html',
  styleUrls: ['./new-expense-phone-modal.page.scss'],
})
export class NewExpensePhoneModalPage implements OnInit {
  form: FormGroup;
  done;
  responsibles: any = [];
  clients: any = [];
  public openOriginalDueDate = false;
  public openDueDate = false;
  public openIssueDate = false;
  public openPeriod = false;

  constructor(
    public user: UserClass,
    public categories: FinanceCategoriesClass,
    public payments: PaymentsClass,
    public billsToPay: BillsToPayClass,
    private master: MasterService,
    private screen: ScreenService,
    private formBuilder: FormBuilder
  ) {
    this.clients = [];
    this.responsibles = [];
    this.loadClients();
    this.loadResponsibles();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      client: this.formBuilder.control('', Validators.required),
      holder: this.formBuilder.control('', Validators.required),
      line: this.formBuilder.control('', Validators.required),
      original_due_date: this.formBuilder.control(''),
      due_date: this.formBuilder.control('', Validators.required),
      value: this.formBuilder.control('', Validators.required),
      issue_date: this.formBuilder.control('', Validators.required),
      account: this.formBuilder.control(''),
      period: this.formBuilder.control('', Validators.required),
      history: this.formBuilder.control(''),
      payment_method: this.formBuilder.control('', Validators.required),
      responsible: this.formBuilder.control(''),
      category: this.formBuilder.control('', Validators.required),
      occurence: this.formBuilder.control('', Validators.required),
      status: this.formBuilder.control('PENDENTE'),
      type: this.formBuilder.control('TELEFONIA'),
    });
  }

  pickOriginalDueDate() {
    this.openOriginalDueDate = !this.openOriginalDueDate;
  }

  pickDueDate() {
    this.openDueDate = !this.openDueDate;
  }

  pickIssueDate() {
    this.openIssueDate = !this.openIssueDate;
  }

  pickPeriod() {
    this.openPeriod = !this.openPeriod;
  }

  setOriginalDueDate(event) {
    const date = event.detail.value;
    this.form
      .get('original_due_date')
      ?.setValue(new Date(date).toLocaleDateString());
  }

  setDueDate(event) {
    const date = event.detail.value;
    this.form.get('due_date')?.setValue(new Date(date).toLocaleDateString());
  }

  setIssueDate(event) {
    const date = event.detail.value;
    this.form.get('issue_date')?.setValue(new Date(date).toLocaleDateString());
  }

  setPeriod(event) {
    const date = event.detail.value;
    this.form.get('period')?.setValue(new Date(date).toLocaleDateString());
  }

  loadClients() {
    this.clients = this.user.finderLevel([1]);
  }

  loadResponsibles() {
    this.responsibles = this.user.finderLevel([2, 3, 4, 5, 6, 7]);
  }

  select_client(event) {
    const { value } = event.detail;
    this.form.get('client')?.setValue(this.user.find(value));
  }

  select_holder(event) {
    const { value } = event.detail;
    this.form.get('holder')?.setValue(this.user.find(value));
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
    this.billsToPay.add(formData).then(() => {
      this.master.setFinance().then(() => {
        this.screen.dismissModal();
        this.screen.dismissLoading();
        this.done();
      });
    });
  }
}
