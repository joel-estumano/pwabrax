import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() register: any = new EventEmitter();
  @Output() forgot: any = new EventEmitter();
  public userLogin: User = {};
  showingPassword = false;
  constructor(private auth: AuthService) {}

  async login() {
    await this.auth.login(this.userLogin);
  }

  goToRegister() {
    this.register.emit();
  }

  goToForgot() {
    this.forgot.emit();
  }

  showPassword() {
    this.showingPassword = !this.showingPassword;
  }
}
