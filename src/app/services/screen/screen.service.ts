import { Injectable } from '@angular/core';
import {
  LoadingController,
  AlertController,
  ModalController,
} from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { Share } from '@capacitor/share';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  public modalsOpen: any = [];
  constructor(
    public modalCtrl: ModalController,
    private loadingController: LoadingController,
    private toastr: ToastrService,
    private alertController: AlertController
  ) { }

  /*
    Padrão toast de erro
    Success = Verde
    Error = Vermelho
    Warning = Amarelo
    Info = Azul
  */
  public async presentToast(message: string, type = 'error', title?: string) {
    if (type === 'success') {
      this.toastr.success(message, title, {
        closeButton: true,
        extendedTimeOut: 2000,
        progressBar: true,
      });
    } else if (type === 'error') {
      this.toastr.error(message, title, {
        closeButton: true,
        extendedTimeOut: 2000,
        progressBar: true,
      });
    } else if (type === 'warning') {
      this.toastr.warning(message, title, {
        closeButton: true,
        extendedTimeOut: 2000,
        progressBar: true,
      });
    } else if (type === 'info') {
      this.toastr.info(message, title, {
        closeButton: true,
        extendedTimeOut: 2000,
        progressBar: true,
      });
    }
  }

  /*
  Necessário chamar este metodo de forma assincrona
  Alterar css via global.scss
  */
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-loading',
      message: 'Aguarde...',
    });
    await loading.present();
  }

  dismissLoading() {
    this.loadingController.dismiss();
  }

  async presentAlertConfirm(
    message: string,
    header = '',
    cssClass = '',
    func?,
    funcClose?
  ) {
    let buttons;
    if (func) {
      buttons = [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
            funcClose();
          },
        },
        {
          text: 'Confirmar',
          id: 'confirm-button',
          handler: () => {
            func();
          },
        },
      ];
    } else {
      buttons = [
        {
          text: 'Ok',
          id: 'confirm-button',
        },
      ];
    }
    const alert = await this.alertController.create({
      cssClass,
      header,
      message,
      buttons,
    });

    await alert.present();
  }

  async presentAlertRadio(
    message: string,
    header = '',
    cssClass = '',
    inputs,
    func?,
    funcClose?
  ) {
    let buttons;
    if (func) {
      buttons = [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (close) => {
            funcClose(close);
          },
        },
        {
          text: 'Confirmar',
          id: 'confirm-button',
          handler: (res) => {
            func(res);
          },
        },
      ];
    } else {
      buttons = [
        {
          text: 'Ok',
          id: 'confirm-button',
        },
      ];
    }
    const alert = await this.alertController.create({
      cssClass,
      header,
      message,
      buttons,
      inputs,
    });

    await alert.present();
  }

  async openModal(component, cssClass, props?, clear = false) {
    const modal = await this.modalCtrl.create({
      component,
      cssClass,
      componentProps:
        typeof props === 'object'
          ? props
          : {
            props,
          },
    });
    modal.present();
    if (clear) this.modalsOpen = [];
    this.modalsOpen.push(modal);
  }

  dismissModal(modal?) {
    if (!modal) {
      if (this.modalsOpen.length > 1) {
        this.modalsOpen.map((e) => {
          e.dismiss();
        });
      } else {
        this.modalCtrl.dismiss();
      }
    } else {
      modal.dismiss();
    }
  }

  navigationShare(title: string, text: string, url: string) {
    if (Share.share) {
      Share.share({
        title,
        text,
        url,
      });
    } else this.presentToast('Este browser não suporta compartilhamento');
  }
}
