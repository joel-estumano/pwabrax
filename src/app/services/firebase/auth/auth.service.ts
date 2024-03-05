import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Injectable } from '@angular/core';
import {
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  Auth,
} from 'firebase/auth';
import { from } from 'rxjs';
import { TranslateService } from '../../translate/translate.service';
import { MenuService } from '../../menu/menu.service';
import { ScreenService } from '../../screen/screen.service';
import { User } from 'src/app/interfaces/user';
import { UserClass } from 'src/app/classes/user/user';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EmailService } from '../../email/email.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly auth: Auth;

  constructor(
    private navigation: NavigationService,
    private screen: ScreenService,
    private translante: TranslateService,
    private userClass: UserClass,
    private menu: MenuService,
    private http: HttpClient,
    private email: EmailService
  ) {
    this.auth = getAuth();
  }

  async login(user: User) {
    if (!user.email || !user.password) {
      this.screen.presentToast('Preencha todos os campos.');
    } else if (user.password.length < 8) {
      this.screen.presentToast('A senha deve ter no mínimo 8 caracteres.');
    } else {
      await this.screen.presentLoading();
      return from(
        signInWithEmailAndPassword(
          this.auth,
          user.email.trim(),
          user.password.trim()
        )
          .then(() => {
            this.menu.menuControl(true);
          })
          .catch((err) => {
            this.screen.presentToast(this.translante.verifyErrors(err.code));
          })
          .finally(() => {
            this.screen.dismissLoading();
          })
      );
    }
  }

  async loginGuest() {
    await this.screen.presentLoading();
    return from(
      signInAnonymously(this.auth)
        .then(() => {
          this.menu.menuControl(true);
        })
        .catch((err) => {
          this.screen.presentToast(this.translante.verifyErrors(err.code));
        })
        .finally(() => {
          this.screen.dismissLoading();
        })
    );
  }

  async logout() {
    this.navigation.goTo('login');
    await this.screen.presentLoading();
    return from(
      this.auth
        .signOut()
        .then(() => {
          this.menu.menuControl(false);
        })
        .catch((err) => {
          this.screen.presentToast(this.translante.verifyErrors(err.code));
        })
        .finally(() => {
          this.screen.dismissLoading();
        })
    );
  }

  getAuth() {
    return this.auth;
  }

  async registerAdmin(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post(
          `${environment.cloudFunctions.url}${environment.cloudFunctions.createUser}`,
          {
            data: {
              email: user.email,
              password: user.password,
              displayName: user.nome,
            },
          }
        )
        .subscribe({
          next: (res: any) => {
            const response = res.result.response;
            delete user['password'];
            this.userClass.addUser(user, response.uid).then(() => {
              this.email.sendEmail({
                to: user.email,
                subject: 'Bem vindo ao App',
                template: environment.templates.register,
              });
              resolve(response);
            });
          },
          error: (err) => {
            this.screen.presentToast(this.translante.verifyErrors(err.code));
            reject(err);
          },
        });
    });
  }

  async register(user: User, confirmPassword: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (!user.email || !user.password || !confirmPassword) {
        this.screen.presentToast('Preencha todos os campos.');
      } else if (user.password.length < 8) {
        this.screen.presentToast('A senha deve ter no mínimo 8 caracteres.');
      } else {
        if (user.password !== confirmPassword) {
          this.screen.presentToast('Senhas não são iguais.');
        } else {
          await this.screen.presentLoading();
          return await from(
            createUserWithEmailAndPassword(
              this.auth,
              user.email.trim(),
              user.password.trim()
            )
              .then((res) => {
                user.level = '3';
                this.menu.menuControl(true);
                this.userClass.addUser(user, res.user.uid).then(() => {
                  resolve(res.user);
                });
              })
              .catch((err) => {
                this.screen.presentToast(
                  this.translante.verifyErrors(err.code)
                );
                resolve(false);
              })
              .finally(() => {
                this.screen.dismissLoading();
              })
          );
        }
      }
    });
  }

  async resetPassword(email) {
    await this.screen.presentLoading();
    return from(
      sendPasswordResetEmail(this.auth, email.trim())
        .then((res) => {
          this.screen.presentToast('Verifique sua caixa de e-mail.', 'success');
        })
        .catch((err) => {
          this.screen.presentToast(this.translante.verifyErrors(err.code));
        })
        .finally(() => {
          this.screen.dismissLoading();
        })
    );
  }

  async deleteAdmin(uid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post(
          `${environment.cloudFunctions.url}${environment.cloudFunctions.deleteUser}`,
          {
            data: {
              uid,
            },
          }
        )
        .subscribe({
          next: (res: any) => {
            resolve(res);
          },
          error: (err) => {
            this.screen.presentToast(this.translante.verifyErrors(err.code));
            reject(err);
          },
        });
    });
  }

  async delete() {
    await this.screen.presentLoading();
    if (this.auth.currentUser) {
      return from(
        this.auth.currentUser
          .delete()
          .catch((err) => {
            this.screen.presentToast(this.translante.verifyErrors(err.code));
          })
          .finally(() => {
            this.screen.dismissLoading();
          })
      );
    }
  }
}
