import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignsClass } from 'src/app/classes/commissions/campaigns';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-campaigns-crud',
  templateUrl: './campaigns-crud.page.html',
  styleUrls: ['./campaigns-crud.page.scss'],
})
export class CampaignsCrudPage {

  id = '';
  object = {
    status: '',
    goal: '',
    bonus: ''
  };

  constructor(
    private screen: ScreenService,
    private navigation: NavigationService,
    private campaigns: CampaignsClass,
    private menu: MenuService,
    private route: ActivatedRoute,
    private breadcrumb: BreadcrumbService
  ) {
    this.menu.items.forEach((e) => {
      e.selected = e.name == 'Campanhas';
    });

    this.breadcrumb.add({
      name: 'Editar',
      path: 'campaigns-crud',
    });

    this.route.queryParams.subscribe(async (params: any) => {
      this.id = params.params;
      if (this.id) {
        const find = this.campaigns.find(this.id);
        this.object = find ? find : await this.campaigns.getHttp(this.id);
      }
    });
  }

  back() {
    this.navigation.goTo('commissions');
  }

  selectType(event) {
    this.object.status = event.detail.value;
  }

  async save() {
    console.log(this.object, this.id);

    await this.screen.presentLoading();
    if (this.id) {
      await this.campaigns.update(this.object, this.id);
    } else {
      await this.campaigns.add(this.object);
    }

    this.campaigns.setClassAll().then(async (res) => {
      this.campaigns.makeSet(res);
      this.campaigns.makePagination();
      await this.screen.dismissLoading();
      this.back();
    }, async (error) => {
      console.log(error);
      await this.screen.dismissLoading();
      await this.screen.presentToast('Erro ao salvar campanha');
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
