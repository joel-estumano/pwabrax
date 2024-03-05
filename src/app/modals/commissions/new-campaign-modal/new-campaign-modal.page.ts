import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BillsToPayClass } from 'src/app/classes/[finance]/billsToPay/billsToPay';
import { CampaignsClass } from 'src/app/classes/commissions/campaigns';
import { PaymentsClass } from 'src/app/classes/payments/payments';
import { UserClass } from 'src/app/classes/user/user';
import { MasterService } from 'src/app/services/master/master.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-new-campaign-modal',
  templateUrl: './new-campaign-modal.page.html',
  styleUrls: ['./new-campaign-modal.page.scss'],
})
export class NewCampaignModalPage implements OnInit {
  form: FormGroup;
  done;
  public openStartDate = false;
  public openEndDate = false;

  constructor(
    public campaigns: CampaignsClass,
    private master: MasterService,
    private screen: ScreenService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      start_date: this.formBuilder.control(''),
      end_date: this.formBuilder.control('', Validators.required),
      goal: this.formBuilder.control('', Validators.required),
      bonus: this.formBuilder.control('', Validators.required),
      status: this.formBuilder.control('EM ANDAMENTO'),
    });
  }

  pickStartDate() {
    this.openStartDate = !this.openStartDate;
  }

  pickEndDate() {
    this.openEndDate = !this.openEndDate;
  }

  setStartDate(event) {
    const date = event.detail.value;
    this.form.get('start_date')?.setValue(new Date(date).toLocaleDateString());
  }

  setEndDate(event) {
    const date = event.detail.value;
    this.form.get('end_date')?.setValue(new Date(date).toLocaleDateString());
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
    formData.goal = parseFloat(formData.goal.replace(',', '.'));
    formData.bonus = parseFloat(formData.bonus.replace(',', '.'));

    this.campaigns.add(formData).then(() => {
      this.master.setCampaigns().then(() => {
        this.screen.dismissModal();
        this.screen.dismissLoading();
        this.done();
      });
    });
  }
}
