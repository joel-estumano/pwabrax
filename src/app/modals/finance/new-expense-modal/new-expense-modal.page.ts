import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillsToPayClass } from 'src/app/classes/[finance]/billsToPay/billsToPay';
import { FinanceCategoriesClass } from 'src/app/classes/[finance]/categories/finance-categories';
import { PaymentsClass } from 'src/app/classes/payments/payments';
import { UserClass } from 'src/app/classes/user/user';
import { MasterService } from 'src/app/services/master/master.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-new-expense-modal',
  templateUrl: './new-expense-modal.page.html',
  styleUrls: ['./new-expense-modal.page.scss'],
})
export class NewExpenseModalPage implements OnInit {
  form: FormGroup;
  done;
  responsibles: any = [];
  suppliers: any = [];
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
    this.suppliers = [];
    this.responsibles = [];
    this.loadSuppliers();
    this.loadResponsibles();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      supplier: this.formBuilder.control('', Validators.required),
      original_due_date: this.formBuilder.control(''),
      due_date: this.formBuilder.control('', Validators.required),
      value: this.formBuilder.control('', Validators.required),
      issue_date: this.formBuilder.control('', Validators.required),
      document: this.formBuilder.control(''),
      period: this.formBuilder.control('', Validators.required),
      history: this.formBuilder.control('', Validators.required),
      payment_method: this.formBuilder.control('', Validators.required),
      responsible: this.formBuilder.control(this.user.value),
      category: this.formBuilder.control('', Validators.required),
      occurence: this.formBuilder.control('', Validators.required),
      status: this.formBuilder.control('PENDENTE'),
      type: this.formBuilder.control('ADMINISTRATIVO'),
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

  loadSuppliers() {
    this.suppliers = this.user.finderLevel([8]);
  }

  loadResponsibles() {
    this.responsibles = this.user.finderLevel([2, 3, 4, 5, 6, 7]);
  }

  select_supplier(event) {
    const { value } = event.detail;
    this.form.get('supplier')?.setValue(this.user.find(value));
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
