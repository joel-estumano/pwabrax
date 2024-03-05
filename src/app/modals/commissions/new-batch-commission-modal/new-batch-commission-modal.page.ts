import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommissionTypesClass } from 'src/app/classes/commissions/commission-types';
import { CommissionsClass } from 'src/app/classes/commissions/commissions';
import { UserClass } from 'src/app/classes/user/user';
import { MasterService } from 'src/app/services/master/master.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-new-batch-commission-modal',
  templateUrl: './new-batch-commission-modal.page.html',
  styleUrls: ['./new-batch-commission-modal.page.scss'],
})
export class NewBatchCommissionModalPage implements OnInit {
  form: FormGroup;
  done;
  contributors: any = [];
  selected_contributors: any = [];
  headers = ['Código', 'Colaborador', 'Situação', 'Data Contrato'];

  constructor(
    public user: UserClass,
    public commissions: CommissionsClass,
    public types: CommissionTypesClass,
    private master: MasterService,
    private screen: ScreenService,
    private formBuilder: FormBuilder
  ) {
    this.contributors = [];
    this.loadContributors();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      contributor: this.formBuilder.control(''),
      code: this.formBuilder.control(''),
      status: this.formBuilder.control(''),
      email: this.formBuilder.control(''),
      service_type: this.formBuilder.control('', Validators.required),
      service_goal: this.formBuilder.control('', Validators.required),
      service_commission: this.formBuilder.control('', Validators.required),
      product_type: this.formBuilder.control('', Validators.required),
      product_goal: this.formBuilder.control('', Validators.required),
      product_commission: this.formBuilder.control('', Validators.required),
    });
  }

  getDate(date) {
    return new Date(date.seconds * 1000).toLocaleDateString('pt-BR');
  }

  loadContributors() {
    this.contributors = this.user.finderLevel([2, 3, 4, 5, 6, 7]);
  }

  select_contributor(contributor) {
    contributor.selected = contributor.selected ? !contributor.selected : true;
    this.selected_contributors.push(contributor);
    if (contributor.selected === false) {
      contributor.selected = false;
      this.selected_contributors = this.selected_contributors.filter(
        (item) => item.id !== contributor.id
      );
    }
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
      this.screen.presentToast('Preencha todos os campos obrigatórios!', 'warning');
      this.screen.dismissLoading();
      return false;
    }

    const formData = this.form.value;
    formData.service_goal = parseFloat(formData.service_goal.replace(',', '.'));
    formData.product_goal = parseFloat(formData.product_goal.replace(',', '.'));

    const addContributorPromises = this.selected_contributors.map((contributor) => {
      formData.contributor = contributor;
      formData.code = contributor.id;
      formData.email = contributor.email;
      formData.status = contributor.status === true ? 'ATIVO' : 'INATIVO';
      return this.commissions.add(formData);
    });

    // Promise.all para aguardar todas as Promises serem resolvidas
    Promise.all(addContributorPromises).then(() => {
      return this.master.setCommissions();
    }).then(() => {
      this.screen.dismissModal();
      this.screen.dismissLoading();
      this.done();
    }).catch((error) => {
      console.error(error);
      this.screen.presentToast('Houve um erro ao adicionar as comissões!');
    });
  }



}
