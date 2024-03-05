import { Component } from '@angular/core';
import { AuthService } from './services/firebase/auth/auth.service';
import { MasterService } from './services/master/master.service';
import { MenuService } from './services/menu/menu.service';
import { register } from 'swiper/element/bundle';
import { UserClass } from './classes/user/user';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public menu: MenuService,
    public auth: AuthService,
    public user: UserClass,
    private master: MasterService
  ) {
    this.master.init();
    this.master.setWithoutAuth();
    this.auth.getAuth().onAuthStateChanged((user: any) => {
      if (user) this.master.set(user.uid);
    });
  }
}
