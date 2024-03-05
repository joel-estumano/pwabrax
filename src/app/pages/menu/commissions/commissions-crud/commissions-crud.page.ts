import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'firebase/auth';
import { CommissionTypesClass } from 'src/app/classes/commissions/commission-types';
import { CommissionsClass } from 'src/app/classes/commissions/commissions';
import { PageCore } from 'src/app/classes/core/page-core';
import { UserClass } from 'src/app/classes/user/user';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';
import { CrudService } from 'src/app/services/firebase/crud/crud.service';
import { CommissionsManagerService } from 'src/app/services/helpers/managers/commissions-manager.service';
import { MasterService } from 'src/app/services/master/master.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-commissions-crud',
  templateUrl: './commissions-crud.page.html',
  styleUrls: ['./commissions-crud.page.scss'],
})
export class CommissionsCrudPage {
  id = '';
  contributors: any = [];
  public object: any = {
    contributor: '',
    code: '',
    status: '',
    email: '',
    service_type: '',
    service_goal: '',
    service_commission: '',
    product_type: '',
    product_goal: '',
    product_commission: '',
  };

  constructor(
    private screen: ScreenService,
    private navigation: NavigationService,
    private commissions: CommissionsClass,
    public types: CommissionTypesClass,
    private menu: MenuService,
    private route: ActivatedRoute,
    private breadcrumb: BreadcrumbService,
    public user: UserClass,
    // private auth: AuthService,
    // private crud: CrudService,
    // private navigation: NavigationService,
    // private master: MasterService,
  ) {
    this.menu.items.forEach((e) => {
      e.selected = e.name == 'Comissões e Cadastros';
    });

    this.breadcrumb.add({
      name: 'Editar',
      path: 'commissions-crud',
    });

    this.route.queryParams.subscribe(async (params: any) => {
      this.id = params.params;
      if (this.id) {
        const find = this.commissions.find(this.id);
        this.object = find ? find : await this.commissions.getHttp(this.id);
      }
    });

    this.contributors = [];
    this.loadContributor();
  }

  back() {
    this.navigation.goTo('commissions');
  }

  loadContributor() {
    this.contributors = this.user.finderLevel([2, 3, 4, 5, 6, 7]);
  }

  select_contributor(event) {
    const { value } = event.detail;
    this.object.code = value;
    this.object.contributor = this.user.find(value);
    this.object.email = this.user.find(value).email;
  }

  getContributorByCode() {
    const value = this.object.code;
    this.object.contributor = this.user.find(value);
    this.object.email = this.user.find(value).email;
  }

  selectCommissionType(event, type: string) {
    const { value } = event.detail;
    if (type === 'service') { this.object.service_type = this.types.find(value); }
    else { this.object.product_type = this.types.find(value); }
  }

  filterType(type: string) {
    return this.types.value.filter((item) => item.category === type);
  }

  async save() {
    await this.screen.presentLoading();
    if (this.id) {
      await this.commissions.update(this.object, this.id);
    } else {
      await this.commissions.add(this.object);
    }
    this.commissions.setClassAll().then(async (res) => {
      this.commissions.makeSet(res);
      this.commissions.makePagination();
      await this.screen.dismissLoading();
      this.back();
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
    const allowedChars = /[a-zA-Z]/;
    const inputChar = String.fromCharCode(event.keyCode || event.which);

    if (!allowedChars.test(inputChar)) {
      event.preventDefault();
    }
  }
}
