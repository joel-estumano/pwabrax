import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommissionTypesClass } from 'src/app/classes/commissions/commission-types';
import { CommissionsClass } from 'src/app/classes/commissions/commissions';
import { PaymentsClass } from 'src/app/classes/payments/payments';
import { UserClass } from 'src/app/classes/user/user';
import { MasterService } from 'src/app/services/master/master.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-new-commission-modal',
  templateUrl: './new-commission-modal.page.html',
  styleUrls: ['./new-commission-modal.page.scss'],
})
export class NewCommissionModalPage implements OnInit {
  form: FormGroup;
  done;
  contributor: any = [];
  isClicked = false;
  contributorName: string = '';

  constructor(
    public user: UserClass,
    public commissions: CommissionsClass,
    public types: CommissionTypesClass,
    private master: MasterService,
    private screen: ScreenService,
    private formBuilder: FormBuilder
  ) {
    this.contributor = [];
    this.loadContributor();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      contributor: this.formBuilder.control('', Validators.required),
      code: this.formBuilder.control('', Validators.required),
      status: this.formBuilder.control('', Validators.required),
      email: this.formBuilder.control('', Validators.required),
      service_type: this.formBuilder.control('', Validators.required),
      service_goal: this.formBuilder.control('', Validators.required),
      service_commission: this.formBuilder.control('', Validators.required),
      product_type: this.formBuilder.control('', Validators.required),
      product_goal: this.formBuilder.control('', Validators.required),
      product_commission: this.formBuilder.control('', Validators.required),
    });
  }

  loadContributor() {
    this.contributor = this.user.finderLevel([2, 3, 4, 5, 6, 7]);
  }

  select_contributor(event) {
    const { value } = event.detail;
    this.form.get('code')?.setValue(value);
    this.form.get('contributor')?.setValue(this.user.find(value));
    this.form.get('email')?.setValue(this.user.find(value).email);
  }

  getContributorByCode() {
    this.isClicked = true;
    const value = this.form.get('code')?.value;
    this.form.get('contributor')?.setValue(this.user.find(value));
    this.form.get('email')?.setValue(this.user.find(value).email);
    this.contributorName = this.user.find(value).nome;
  }

  filterType(type: string) {
    return this.types.value.filter((item) => item.category === type);
  }

  onlyNumber(event: KeyboardEvent) {
    const allowedChars = /[0-9]/;
    const inputChar = String.fromCharCode(event.keyCode || event.which);

    if (!allowedChars.test(inputChar)) {
      event.preventDefault();
    }
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
    formData.service_goal = parseFloat(formData.service_goal.replace(',', '.'));
    formData.product_goal = parseFloat(formData.product_goal.replace(',', '.'));

    this.commissions.add(formData).then(() => {
      this.master.setCommissions().then(() => {
        this.screen.dismissModal();
        this.screen.dismissLoading();
        this.done();
      });
    });
  }
}
