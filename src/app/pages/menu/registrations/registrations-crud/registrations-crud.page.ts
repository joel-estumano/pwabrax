import { AuthService } from './../../../../services/firebase/auth/auth.service';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageCore } from 'src/app/classes/core/page-core';
import { UserClass } from 'src/app/classes/user/user';
import { User } from 'src/app/interfaces/user';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { CrudService } from 'src/app/services/firebase/crud/crud.service';
import { PeopleManagerService } from 'src/app/services/helpers/managers/people-manager.service';
import { MasterService } from 'src/app/services/master/master.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registrations-crud',
  templateUrl: './registrations-crud.page.html',
  styleUrls: ['./registrations-crud.page.scss'],
})
export class RegistrationsCrudPage extends PageCore {
  minDate: string;
  public hasDependents = false;
  public openDate = false;
  private param_id: string;
  public user: any = {
    nome: '',
    nome_mae: '',
    data_nascimento: '',
    cpf: '',
    rg: '',
    cep: '',
    uf: '',
    logradouro: '',
    complemento: '',
    numero: '',
    telefone: '',
    celular: '',
    level: '',
    associate_to: '',
    commission: '',
    tags: '',
    dependent: {
      nome: '',
      telefone: '',
      rg: '',
      cpf: '',
    },
    status: true,
  };
  public userFiles: {
    doc_cpf?: any;
    doc_residence?: any;
    doc_company?: any;
  } = {};
  public pageType;
  public data: any = [
    {
      info: ['RG, CPF ou CNH', 'Pendente', '', 'actions'],
      actions: ['add', 'edit_file', 'delete', 'view'],
      index: 0,
      hasFile: false,
      which: 'doc_cpf',
    },
    {
      info: ['Comprovante de Residência', 'Pendente', '', 'actions'],
      actions: ['add', 'edit_file', 'delete', 'view'],
      index: 1,
      hasFile: false,
      which: 'doc_residence',
    },
    {
      info: ['Razão Social', 'Pendente', '', 'actions'],
      actions: ['add', 'edit_file', 'delete', 'view'],
      index: 2,
      hasFile: false,
      which: 'doc_company',
    },
  ];
  public override tabs = [
    {
      name: 'Sobre',
      value: 0,
      selected: true,
    },
    {
      name: 'Contatos',
      value: 1,
    },
    {
      name: 'Documentos',
      value: 2,
    },
  ];

  public selectedTab = this.tabs[0];
  constructor(
    public userClass: UserClass,
    private auth: AuthService,
    private crud: CrudService,
    private navigation: NavigationService,
    private route: ActivatedRoute,
    private screen: ScreenService,
    private master: MasterService,
    private menu: MenuService,
    private breadcrumb: BreadcrumbService
  ) {
    super();
    const today = new Date();
    // today.setFullYear(today.getFullYear() - 15);
    this.minDate = today.toISOString();
    this.route.queryParams.subscribe(async (params: any) => {
      if (params) {
        this.pageType = params.params[0];
        if (params.params[1]) {
          this.param_id = params.params[1];
          await this.delayedFinder(this.param_id);
          if (this.pageType === 'clients') {
            const new_tabs = [
              {
                name: 'Histórico',
                value: 3,
              },
              {
                name: 'Financeiro',
                value: 4,
              },
              {
                name: 'Serviços',
                value: 5,
              },
            ];
            this.tabs.push(...new_tabs);
          }
        }
      } else {
      }
    });
  }

  ionViewWillEnter() {
    this.menu.items.forEach((e) => {
      e.selected = e.name == 'Cadastros';
    });

    this.breadcrumb.add({
      name: 'Novo',
      path: 'registrations-crud',
    });
  }

  delayedFinder(id: string) {
    const user = this.userClass.find(id);
    if (!user) {
      setTimeout(() => {
        const user = this.userClass.find(id);
        if (!user) {
          this.navigation.goTo('registrations');
          return;
        } else {
          this.user = user;
          if (this.user.dependent.nome === '') {
            this.user.dependent = {
              nome: '',
              telefone: '',
              rg: '',
              cpf: '',
            };
            this.hasDependents = false;
          } else {
            this.hasDependents = true;
          }
        }
      }, 1000);
    } else {
      this.user = user;
      if (this.user.dependent.nome === '') {
        this.user.dependent = {
          nome: '',
          telefone: '',
          rg: '',
          cpf: '',
        };
        this.hasDependents = false;
      } else {
        this.hasDependents = true;
      }
    }
  }

  pickDate() {
    this.openDate = !this.openDate;
  }

  setDate(event) {
    const date = event.detail.value;
    this.user.data_nascimento = new Date(date).toLocaleDateString();
  }

  changeStatus(who) {
    if (
      who.hasFile &&
      (this.userClass.value.level === '5' || this.userClass.value.level === '7')
    ) {
      this.screen.presentAlertRadio(
        'Deseja alterar o status?',
        '',
        '',
        [
          {
            label: 'Pendente',
            type: 'radio',
            value: 'Pendente',
            checked: who.info[1] === 'Pendente',
          },
          {
            label: 'Validado',
            type: 'radio',
            value: 'Validado',
            checked: who.info[1] === 'Validado',
          },
        ],
        (res) => {
          who.info[1] = res;
          this.userFiles[who.which].status = res;
        },
        () => { }
      );
    }
  }

  override backAction() {
    this.navigation.goTo('registrations');
  }

  override upAction() {
    if (!this.user.nome) {
      this.screen.presentToast('Preencha o nome');
      return;
    }
    if (!this.user.level) {
      this.screen.presentToast('Preencha o tipo de perfil');
      return;
    }
    if (!this.user.email) {
      this.screen.presentToast('Preencha o email');
      return;
    }
    if (!this.hasAllDocs) {
      this.screen.presentToast('Faça o upload de todos os documentos!');
      return;
    }
    if (this.param_id) this.update();
    else this.add();
  }

  override setData() {
    const tab = this.findSelectedTab();
    this.selectedTab = tab;
    if (this.param_id) {
      this.data.forEach((item) => {
        item.info[1] =
          this.user[item.which] && this.user[item.which].status
            ? this.user[item.which].status
            : 'Pendente';
        item.info[2] = this.user[item.which] ? this.user[item.which].name : '';
        if (this.user[item.which] && this.user[item.which].url) {
          item.hasFile = true;
          this.userFiles[item.which] = this.user[item.which];
        }
        if (this.user[item.which] && this.user[item.which].url) {
          item.url = this.user[item.which].url;
          item.hasFile = true;
          this.userFiles[item.which] = this.user[item.which];
        }
      });
    }
  }

  adder(event) {
    this.data[event.who.index].info[2] = event.file.name;
    this.data[event.who.index].hasFile = true;

    if (event.who.index === 0) {
      this.userFiles.doc_cpf = event.file;
    } else if (event.who.index === 1) {
      this.userFiles.doc_residence = event.file;
    } else if (event.who.index === 2) {
      this.userFiles.doc_company = event.file;
    }
  }

  editer(event) {
    this.data[event.who.index].info[2] = event.file.name;

    if (event.who.index === 0) {
      this.userFiles.doc_cpf = event.file;
    } else if (event.who.index === 1) {
      this.userFiles.doc_residence = event.file;
    } else if (event.who.index === 2) {
      this.userFiles.doc_company = event.file;
    }
  }

  deleter(event) {
    if (event.index === 0) {
      this.userFiles.doc_cpf = [];
    } else if (event.index === 1) {
      this.userFiles.doc_residence = [];
    } else if (event.index === 2) {
      this.userFiles.doc_company = [];
    }

    this.data[event.index].info[2] = '';
    this.data[event.index].hasFile = false;
  }

  selectPartner(event) {
    this.user.associate_to = event.detail.value;
  }

  selectLevel(event) {
    this.user.level = event.detail.value;
  }

  selectStatus(event) {
    this.user.status = event.detail.value;
  }

  // async add() {
  //   try {
  //     await this.screen.presentLoading();
  //     this.user.password = environment.defaultPassword;
  //     await this.auth.registerAdmin(this.user).then(async (res) => {
  //       await Promise.all(
  //         Object.keys(this.userFiles).map(async (key) => {
  //           if (this.userFiles[key]) {
  //             await this.crud.upload(res.uid, this.userFiles[key], `users/${res.uid}/${key}`)
  //               .then((res) => {
  //                 // this.screen.dismissLoading();
  //                 this.user[key] = {
  //                   name: this.userFiles[key].name,
  //                   url: res,
  //                   status: 'Pendente',
  //                 };
  //               });
  //           }
  //         })
  //       ).then(() => {
  //         this.userClass.update(this.user, res.uid).then(() => {
  //           this.userClass.setClassAll<User>(true, false, 'all_users')
  //             .then((res) => {
  //               this.screen.presentToast('Usuário cadastrado com sucesso!', 'success');
  //               this.screen.dismissLoading();
  //               this.master.setAll(res, this.userClass.value.id);
  //               this.navigation.goTo('registrations');
  //             });
  //         });
  //       });
  //     });
  //   } catch (error) {
  //     console.error('Erro durante o processo de cadastro:', error);
  //     this.screen.dismissLoading();
  //   }
  // }

  async add() {
    try {
      await this.screen.presentLoading();
      this.user.password = environment.defaultPassword;
      const registrationResult = await this.auth.registerAdmin(this.user);

      await Promise.all(
        await Object.keys(this.userFiles).map(async (key) => {
          if (this.userFiles[key]) {
            await this.crud.upload(registrationResult.uid, this.userFiles[key], `users/${registrationResult.uid}/${key}`)
              .then((res) => {
                this.user[key] = {
                  name: this.userFiles[key].name,
                  url: res,
                  status: 'Pendente',
                };
              });
          }
        })
      );

      await this.userClass.update(this.user, registrationResult.uid);
      await this.userClass.setClassAll<User>(true, false, 'all_users').then((res) => {
        this.screen.presentToast('Usuário cadastrado com sucesso!', 'success');
        this.master.setAll(res, this.userClass.value.id);
        this.screen.dismissLoading();
        this.navigation.goTo('registrations');
      });
    } catch (error) {
      console.error('Erro durante o processo de cadastro:', error);
      this.screen.dismissLoading();
    }
  }


  async update() {
    await this.screen.presentLoading();
    await Promise.all(
      await Object.keys(this.userFiles).map(async (key) => {
        const url = this.user[key].url;
        if (this.userFiles[key].length === 0) {
          if (this.user[key].name) {
            this.user[key] = {};
            await this.crud.deleteFireStorage(url);
          }
        } else if (this.userFiles[key].name != this.user[key].name) {
          const id: any = this.user.id;
          if (this.user[key].length > 0) {
            this.user[key] = {};
            await this.crud.deleteFireStorage(url);
          }
          await this.crud.upload(id, this.userFiles[key], `users/${id}/${key}`).then((res) => {
            this.user[key] = {
              name: this.userFiles[key].name,
              url: res,
              status: this.userFiles[key].status ? this.userFiles[key].status : 'Pendente',
            };
          });
        }
      })
    ).then(async () => {
      await this.userClass.updateUser(this.user, this.user.id).then(() => {
        this.userClass.setClassAll(true, false, 'all_users').then((res: any) => {
          this.screen.dismissLoading();
          this.navigation.goTo('registrations');
          this.master.setAll(res, this.userClass.value.id);
        });
      });
    });
  }

  preventNumbers(event: any, fieldName: string) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (/^(0{3,}|1{3,})/.test(value)) {
      const newValue = value.replace(/^(0{3,}|1{3,})/, '');
      input.value = newValue;
      this.user[fieldName] = newValue;
    }
  }

  limitNumber(event: any) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length >= 5) {
      event.preventDefault();
    }

    const key = event.key;
    const isDigit = /^\d$/.test(key);
    if (!isDigit) {
      event.preventDefault();
    }
  }

  onlyNumber(event: KeyboardEvent) {
    const allowedChars = /[0-9]/;
    const inputChar = String.fromCharCode(event.keyCode || event.which);

    if (!allowedChars.test(inputChar)) {
      event.preventDefault();
    }
  }

  // onlyText(event: KeyboardEvent) {
  //   const allowedChars = /[a-zA-Z\s]/;
  //   const inputChar = String.fromCharCode(event.keyCode || event.which);

  //   if (!allowedChars.test(inputChar)) {
  //     event.preventDefault();
  //   }
  // }

  onlyText(event: KeyboardEvent) {
    if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    const allowedChars = /[a-zA-Záéíóúâêîôûãõàèìòùäëïöüç\s]/;
    const inputChar = String.fromCharCode(event.keyCode || event.which);

    if (!allowedChars.test(inputChar)) {
      event.preventDefault();
    }
  }

  get hasAllDocs() {
    const has = this.data.every((item) => item.hasFile);
    return has;
  }
}
