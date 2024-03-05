import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserClass } from 'src/app/classes/user/user';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent {
  @Output() event: any = new EventEmitter();
  @Output() sended: any = new EventEmitter();

  public userForgot: User = {
    email: '',
  };
  public confirmPassword: string = '';
  constructor(private auth: AuthService) {}

  async forgot() {
    await this.auth.resetPassword(this.userForgot.email).then(() => {
      this.sended.emit();
    });
  }

  goBack() {
    this.event.emit();
  }
}
