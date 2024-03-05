import { Component, OnInit } from '@angular/core';
import { UserClass } from 'src/app/classes/user/user';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { MasterService } from 'src/app/services/master/master.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public openDate = false;
  public confirmar = false;
  constructor(
    public user: UserClass,
    private menu: MenuService,
    private navigation: NavigationService,
    private screen: ScreenService,
    private breadCrumb: BreadcrumbService,
    private master: MasterService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.menu.items.forEach((e) => {
      e.selected = e.name == 'Meu Perfil';
    });
    this.breadCrumb.add(
      {
        name: 'Meu Perfil',
        path: 'profile',
      },
      true
    );
  }

  pickDate() {
    this.openDate = !this.openDate;
  }

  setDate(event) {
    const date = event.detail.value;
    this.user.toUpdate.data_nascimento = new Date(date).toLocaleDateString();
  }

  async update() {
    await this.screen.presentLoading();
    this.user.update(this.user.value, this.user.value.id).then(() => {
      this.user.setClassById(this.user.value.id).then(() => {
        this.screen.presentToast('Informações atualizadas com sucesso!', 'success');
        this.screen.dismissLoading();
        this.navigation.goTo('home');
      });
    });

    // this.user.updateUser(this.user.toUpdate).then(() => {
    //   this.user.setClassById(this.user.value.id).then(() => {
    //     this.screen.presentToast('Informações atualizadas com sucesso!', 'success');
    //     this.screen.dismissLoading();
    //     // this.navigation.goTo('home');
    //   });
    // });
  }

}
