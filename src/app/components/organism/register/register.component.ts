import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { TermsPage } from 'src/app/modals/terms/terms.page';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  checked = false;
  @Output() login: any = new EventEmitter();

  public userRegister: User = {};
  public confirmPassword: string = '';

  public showingPassword = false;
  public showingRepeatPassword = false;

  constructor(private auth: AuthService, private screen: ScreenService) {}

  openTermsModal() {
    this.screen.openModal(TermsPage, 'is90', {
      accept: () => {
        this.checked = true;
        this.screen.dismissModal();
      },
    });
  }

  async register() {
    if (!this.checked) {
      this.screen.presentToast('Você deve aceitar os termos de uso.');
      return;
    }
    await this.auth.register(this.userRegister, this.confirmPassword);
  }

  goToLogin() {
    this.login.emit();
  }

  showPassword() {
    this.showingPassword = !this.showingPassword;
  }

  showRepeatPassword() {
    this.showingRepeatPassword = !this.showingRepeatPassword;
  }
}
