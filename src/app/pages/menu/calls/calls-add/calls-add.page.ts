import { PageCore } from 'src/app/classes/core/page-core';
import { CallsManagerService } from '../../../../services/helpers/managers/calls-manager.service';
import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { UserClass } from 'src/app/classes/user/user';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { ProductClass } from 'src/app/classes/product/products';
import { Bugdet } from 'src/app/interfaces/budget';
import { NotificationPage } from 'src/app/modals/notification/notification.page';
import { NotificationsClass } from 'src/app/classes/notifications/notifications';
import { CrudService } from 'src/app/services/firebase/crud/crud.service';
import { MasterService } from 'src/app/services/master/master.service';
import { CouponBudgetPage } from 'src/app/modals/calls/coupon-budget/coupon-budget.page';
import { EmailService } from 'src/app/services/email/email.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ContractClass } from 'src/app/classes/contract/contract';

@Component({
  selector: 'app-calls-add',
  templateUrl: './calls-add.page.html',
  styleUrls: ['./calls-add.page.scss'],
})
export class CallsAddPage extends PageCore implements OnDestroy {
  @ViewChild('dataToExport', { static: false })
  public dataToExport: ElementRef;
  /* Gerenciador de tela de confirmação de Orçamento */
  budgetDetails = false;
  budgetDetailsStep = 0;

  // Deseja receber lembrete do orçamento
  budgetReminder = false;

  // Gerenciador de recusas
  exclusionApproval = true;
  saleApproval = true;

  // Quandor for uma edição
  id: string;

  // Orçamento
  call: Bugdet = {
    responsible: {},
    client_id: '',
    client: {},
    products: [],
    status: 'Aberto',
    comments: [],
    justifications: [],
  };

  // Data de hoje
  date = new Date().toLocaleString();

  // Define a classe de chamada, se é venda ou orçamento
  class = 'sale';

  // Ao fechara página, reseta os dados
  ngOnDestroy(): void {
    this.call = {
      client_id: '',
      client: {},
      products: [],
    };
    this.callsManager[this.class].tabs[1].disabled = false;
    this.callsManager[this.class].selectedTab =
      this.callsManager[this.class].tabs[0];

    this.callsManager[this.class].tabs.forEach((element, i) => {
      this.disableTab(i, i > 1);
      element.selected = element.value === 0;
    });

    this.products.resetProducts();
  }

  // Recebe os arquivos do cadastro do usuário
  public files: {
    doc_cpf?: any;
    doc_residence?: any;
    doc_company?: any;
  } = {};

  // Recebe os arquivos inseridos pelo usuário
  private filesToAdd: any = {};

  // Preenche os dados da aba de documentos
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

  constructor(
    public callsManager: CallsManagerService,
    public user: UserClass,
    public products: ProductClass,
    public contract: ContractClass,
    private screen: ScreenService,
    private navigation: NavigationService,
    private route: ActivatedRoute,
    private notificationClass: NotificationsClass,
    private crud: CrudService,
    private master: MasterService,
    private email: EmailService,
    private menu: MenuService,
    private breadcrumb: BreadcrumbService
  ) {
    super();

    this.route.queryParams.subscribe(async (params: any) => {
      // Caso seja um edit é true, caso não seja é false
      const isEdit = params.params[0].length > 1;
      this.class = isEdit ? params.params[0] : params.params;
      if (isEdit) {
        this.id = params.params[1];

        // Preenche os dados do usuário e da chamada
        const find = this.callsManager[this.class].find(this.id);
        this.call = find
          ? find
          : await this.callsManager[this.class].getHttp(this.id);

        const find_user = this.user.find(this.call.client_id);
        const user = find_user
          ? find_user
          : await this.user.getHttp(this.call.client_id);

        // Preenche o cliente na chamada
        this.call.client = user;
        this.selectClient(user);

        // Altera as abas para edição
        this.callsManager[this.class].tabs.forEach((e, i) => {
          e.hidden =
            e.name !== 'Cliente' &&
            e.name !== 'Produtos' &&
            e.name !== 'Documentos' &&
            e.name !== 'Contrato';
        });
      }
    });
  }

  ionViewWillEnter() {
    this.menu.items.forEach((e) => {
      e.selected = e.name == 'Atendimentos';
    });
    this.breadcrumb.add({
      name: 'Novo',
      path: 'calls-crud',
    });
  }

  // Preenche o cliente ao ser selecionado na aba 1
  selectClient(event) {
    if (event) {
      this.callsManager[this.class].tabs.forEach((e, i) => {
        this.disableTab(i, i === 1);
      });
    }
    this.setData();
  }

  addClient() {
    this.tabEvent(1, this.callsManager[this.class].tabs);
  }

  // Sair da página
  override backAction(): void {
    this.navigation.goTo('calls');
  }

  // Caso seja orçamento, vai para a tela de pós orçamento
  // Se for venda, finaliza o processo
  override async upAction() {
    if (this.class === 'budget') {
      this.screen.openModal(NotificationPage, 'is30 default', {
        cancel: () => {
          this.screen.dismissModal();
          this.budgetDetails = true;
        },
        confirm: () => {
          this.screen.dismissModal();
          this.budgetReminder = true;
          this.budgetDetails = true;
        },
        dateChange: (date) => {
          const dateLocal = new Date(date).toLocaleString();
          this.date = dateLocal;
        },
      });
    } else {
      this.sender();
    }
  }

  // Configura os dados dos documentos
  override setData() {
    const tab = this.findSelectedTab(this.callsManager[this.class].tabs);
    this.callsManager[this.class].selectedTab = tab;

    this.data.forEach((item) => {
      item.info[1] =
        this.call.client[item.which] && this.call.client[item.which].status
          ? this.call.client[item.which].status
          : 'Pendente';
      item.info[2] =
        this.call.client[item.which] && this.call.client[item.which]
          ? this.call.client[item.which].name
          : '';
      if (this.call.client[item.which] && this.call.client[item.which].url) {
        item.url = this.call.client[item.which].url;
        item.hasFile = true;
        this.files[item.which] = this.call.client[item.which];
      }
    });

    // Verifica se tem todos os documentos enviados para poder prosseguir com a venda
    if (this.class === 'sale') this.hasAllDocs();
  }

  // Modifica a formatação dos produtos para poder enviar para o servidor
  transformProducts() {
    let products: any = [];
    Object.keys(this.call.products).forEach((key) => {
      const lines: any = [];
      let count = 0;
      while (count < this.call.products[key].quantity) {
        lines.push({
          line: '',
          iccid: '',
          coupon: '',
        });
        count++;
      }
      this.call.products[key].product.line = lines;
      products.push(this.call.products[key]);
    });
    this.call.products = products;
  }

  // Envia os dados para o servidor
  async sender() {
    await this.screen.presentLoading();
    this.call.approved = 0;
    this.call.user_id = this.user.value.id;
    this.call.responsible = this.user.value;
    let userToUpdate = {};
    this.callsManager[this.class]
      .add(this.call)
      .then(async (res) => {
        // Caso tenha arquivos adicionados, faz o upload e atualiza o usuário
        await Promise.all(
          Object.keys(this.filesToAdd).map(async (key) => {
            if (this.filesToAdd[key]) {
              await this.crud
                .upload(
                  this.call.client_id,
                  this.filesToAdd[key],
                  `users/${this.call.client_id}/${key}`
                )
                .then((res) => {
                  userToUpdate[key] = {
                    name: this.filesToAdd[key].name,
                    url: res,
                    status: 'Pendente',
                  };
                });
            }
          })
        ).then(() => {
          this.user.update(userToUpdate, this.call.client_id).then(() => {
            this.user.setClassAll(true, false, 'all_users').then((res: any) => {
              this.master.setAll(res, this.user.value.id);
            });
          });
        });
        this.callsManager.reset();

        // Force update dos dados, para a tela de calls ficar atualizada
        await Promise.all([
          this.callsManager.budget.setClassAll().then((res) => {
            const data = this.callsManager.budget.makeSet(res);
            this.callsManager.add(data);
          }),
          this.callsManager.sale.setClassAll().then((res) => {
            const data = this.callsManager.sale.makeSet(res);
            this.callsManager.add(data);
          }),
        ]).then(async () => {
          if (this.class === 'sale') {
            await this.notifyClient(this.call.client);
            await this.notifyResponsibles(this.call.client, res.id);
          } else if (this.class === 'budget') {
            if (this.budgetReminder) {
              // add notificação de orçamento
              this.notificationClass
                .add({
                  client_id: this.call.client_id,
                  user_id: this.user.value.id,
                  url: 'calls-add?params=budget&params=' + res.id,
                  type: 'Lembrete de Orçamento',
                  status: 'PENDENTE',
                  responsible: this.user.value,
                  date: new Date().toLocaleString(),
                  reminder: this.date,
                  read: false,
                  text: `O ${this.call.client.nome} está te esperando. O Grupo Brax está aqui para te ajudar a fazer o orçamento virar uma venda!`,
                })
                .then(() => {
                  this.notificationClass.setClassAll().then((notifications) => {
                    this.notificationClass.makePagination(notifications);
                    this.notificationClass.setUnread();
                  });
                });
            }
            this.sendBudget(res.id);
          }
          this.callsManager.makePagination(this.callsManager.data, true);
          this.screen.dismissLoading();
          this.goBack(true);
        });
      })
      .catch((err) => console.log(err));
  }

  async notifyClient(client) {
    const adhesion = this.dataToExport.nativeElement.innerHTML;
    const contract = this.contract.value[0].text;

    const contractEmailData = {
      to: client.email,
      subject: 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE CONSULTORIA TELEMÁTICA',
      html: contract,
    };

    this.email.sendEmail(contractEmailData);

    const adhesionEmailData = {
      to: client.email,
      subject:
        'TERMO DE ADESÃO AO CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE CONSULTORIA TELEMÁTICA',
      html: adhesion,
    };

    this.email.sendEmail(adhesionEmailData);
  }

  async notifyResponsibles(client, id) {
    const responsibles = this.user.finderLevel([5, 7]);
    await Promise.all([
      responsibles.map((responsible) => {
        this.notificationClass.add({
          user_id: responsible.id,
          client_id: client.id,
          type: 'Venda',
          status: 'PENDENTE',
          responsible: this.user.value,
          url: 'calls-add?params=sale&params=' + id,
          date: new Date().toLocaleString(),
          read: false,
          text: `${this.user.value.nome
            } enviou uma nova venda de validação para você às ${new Date().toLocaleTimeString()} do dia ${new Date().toLocaleDateString()} referente ao cliente ${client.nome
            }.`,
        });
      }),
    ]).then(() => {
      this.notificationClass.setClassAll().then((res) => {
        this.notificationClass.makePagination(res);
        this.notificationClass.setUnread();
      });
    });
  }

  override goBack(cancel: boolean) {
    if (cancel) {
      this.backAction();
    } else {
      const tab = this.changeTab(
        this.callsManager[this.class].selectedTab.value === 2 ? -2 : -1,
        this.callsManager[this.class].tabs
      );
      this.tabEvent(
        this.callsManager[this.class].tabs.indexOf(tab),
        this.callsManager[this.class].tabs
      );
    }
  }

  override goUp(ending: boolean) {
    if (ending) {
      this.upAction();
    } else {
      if (
        this.callsManager[this.class].selectedTab.value === 0 &&
        this.call.client_id === ''
      ) {
        this.screen.presentToast('Informe o cliente');
        return;
      }
      if (
        this.class === 'sale' &&
        this.callsManager[this.class].selectedTab.value === 4 &&
        !this.hasAllDocs()
      ) {
        this.screen.presentToast('Informe todos os documentos');
        return;
      }
      const tab = this.changeTab(
        this.callsManager[this.class].selectedTab.value === 0 ? 2 : 1,
        this.callsManager[this.class].tabs
      );
      this.tabEvent(
        this.callsManager[this.class].tabs.indexOf(tab),
        this.callsManager[this.class].tabs
      );
    }
  }

  hasAllDocs() {
    const has = this.data.every((item) => item.hasFile);
    this.callsManager[this.class].tabs[5].disabled = !has;
    return has;
  }

  addProduct(event) {
    if (!this.call.products) this.call.products = [];
    if (!this.call.products[event.id]) {
      this.call.products[event.id] = {
        product: event,
        quantity: 1,
      };
    } else {
      this.call.products[event.id] = {
        product: event,
        quantity: this.call.products[event.id].quantity + 1,
      };
    }
    this.transformProducts();
    console.log(this.call);
  }

  removeProduct(event) {
    this.call.products = this.call.products
      .map((e, i) => {
        if (e.product.id === event.id) {
          e.quantity - 1 <= 0
            ? delete this.call.products[i]
            : (e.quantity -= 1);
        }
      })
      .filter((e: any) => {
        if (e) return e;
      });

    console.log(this.call);
  }

  addFile(event) {
    this.data[event.who.index].info[2] = event.file.name;
    this.data[event.who.index].hasFile = true;

    if (event.who.index === 0) {
      this.files.doc_cpf = event.file;
      this.filesToAdd.doc_cpf = event.file;
    } else if (event.who.index === 1) {
      this.files.doc_residence = event.file;
      this.filesToAdd.doc_residence = event.file;
    } else if (event.who.index === 2) {
      this.files.doc_company = event.file;
      this.filesToAdd.doc_company = event.file;
    }
    if (this.class === 'sale') this.disableTab(5, !this.hasAllDocs());
  }

  editFile(event) {
    this.data[event.who.index].info[2] = event.file.name;

    if (event.who.index === 0) {
      this.files.doc_cpf = event.file;
    } else if (event.who.index === 1) {
      this.files.doc_residence = event.file;
    } else if (event.who.index === 2) {
      this.files.doc_company = event.file;
    }
  }

  deleteFile(event) {
    if (event.index === 0) {
      this.files.doc_cpf = [];
    } else if (event.index === 1) {
      this.files.doc_residence = [];
    } else if (event.index === 2) {
      this.files.doc_company = [];
    }

    this.data[event.index].info[2] = '';
    this.data[event.index].hasFile = false;
    if (this.class === 'sale') this.disableTab(5, !this.hasAllDocs());
  }

  changeStatus(event) {
    if (
      event.hasFile &&
      (this.user.value.level === '5' || this.user.value.level === '7')
    ) {
      this.screen.presentAlertRadio('Deseja alterar o status?', '', '',
        [
          {
            label: 'Pendente',
            type: 'radio',
            value: 'Pendente',
            checked: event.info[1] === 'Pendente',
          },
          {
            label: 'Validado',
            type: 'radio',
            value: 'Validado',
            checked: event.info[1] === 'Validado',
          },
        ],
        (res) => {
          event.info[1] = res;
          this.files[event.which].status = res;
        },
        () => { }
      );
    }
  }

  disableTab(index, bool: boolean) {
    this.callsManager[this.class].tabs[index].disabled = bool;
  }

  sendUpdate() {
    if (this.call.comments && this.call.comments?.length > 0) {
      this.call.comments?.forEach((e: any) => {
        e.isNew = false;
      });
    }
    this.callsManager[this.class]
      .update(this.call, this.call.id)
      .then(async () => {
        this.callsManager.reset();
        await this.master.setCalls();
        this.navigation.goTo('calls');
      });
  }

  budgetDetailsback() {
    if (this.budgetDetailsStep === 0) {
      this.budgetDetails = false;
    }
    if (this.budgetDetailsStep === 1) {
      this.budgetDetailsStep = 0;
    }
  }

  budgetDetailsUp() {
    if (this.budgetDetailsStep === 0) {
      let price = 0;
      this.call.products.forEach((product) => {
        price += +product.product.price * +product.quantity;
      });
      this.call.subtotal = price;
      this.call.discounts = 0;
      this.call.price = this.call.subtotal - this.call.discounts;
      this.budgetDetailsStep = 1;
    }
  }

  cancelBudget() {
    this.navigation.goTo('calls');
  }

  // TODO Implementar funcionalidade do cupon
  couponBudget() {
    this.screen.openModal(CouponBudgetPage, 'is25 coupon', {
      send: (coupon) => {
        console.log(coupon);
      },
    });
  }

  sendBudget(budget_id) {
    this.email.sendEmail({
      to: this.call.client.email,
      subject: `Seu Orçamento no GRUPO BRAX!`,
      html: `
      <p>Olá, ${this.call.client.nome
        }, tudo bem? <br><br> Seu Orçamento - de número ${budget_id} - chegou até você! <br><br>.</p>
        <table class="table-wrap has-checkboxes" style="width: 100%;">
        <thead>
          <tr style="background-color: #575757; color: #FFFFFF; padding: 2rem 0rem">
            <th class="sort" style="color: #FFFFFF'">Produto</th>
            <th class="sort" style="color: #FFFFFF'">Número</th>
            <th class="sort" style="color: #FFFFFF'">ICCID</th>
            <th class="sort" style="color: #FFFFFF'">Preço R$</th>
          </tr>
        </thead>
        <tbody>
        ${this.call.products.map((e) => {
          return e.product.line.map((line) => {
            return `
            <tr style="height: 2rem;">
              <td class="contact" style="text-align: center;">${e.product.title}</td>
              <td class="stats" style="text-align: center;">${line.line}</td>
              <td class="stats" style="text-align: center;">${line.iccid}</td>
              <td class="stats" style="text-align: center;">${e.product.price}</td>
            </tr>
            `;
          });
        })}
        <tr style="background-color: #EDEDED; height: 2rem;">
          <td class="contact" style="text-align: center;">Subtotal</td>

          <td style="opacity: 0;">.</td>
          <td style="opacity: 0;">.</td>

          <td class="stats" style="text-align: center;">${this.call.subtotal
        }</td>
        </tr>
       <tr style="background-color: #EDEDED; height: 2rem;">
          <td class="contact" style="text-align: center;">Descontos</td>

          <td style="opacity: 0;">.</td>
          <td style="opacity: 0;">.</td>

          <td class="stats" style="text-align: center;">${this.call.discounts
        }</td>
          </tr>
         <tr style="background-color: #575757; color: #FFFFFF; height: 2rem;">
          <td class="contact" style="text-align: center;">Total</td>

          <td style="opacity: 0;">.</td>
          <td style="opacity: 0;">.</td>

          <td class="stats" style="text-align: center;">${this.call.subtotal
          ? this.call.subtotal
          : 0 - (this.call.discounts ? this.call.discounts : 0)
        }</td>
      </tr>
        </tbody>
      </table>
          `,
    });
  }

  comment(event) {
    const comment = {
      date: new Date(),
      text: event,
      user: this.user.value,
      isNew: true,
    };
    if (!this.call.comments) this.call.comments = [];
    this.call.comments.push(comment);
  }

  justification(event) {
    const justification = {
      text: event,
      user: this.user.value,
      isNew: true,
    };
    if (!this.call.justifications) this.call.justifications = [];
    this.call.justifications.push(justification);
  }

  justificationSale(event) {
    const justification = {
      text: event,
      user: this.user.value,
      isNew: true,
    };
    if (!this.call.justificationsSale) this.call.justificationsSale = [];
    this.call.justificationsSale.push(justification);
  }

  resetExclusion() {
    this.exclusionApproval = true;
  }

  resetSale() {
    this.saleApproval = true;
  }

  async exclusionStatus(bool: boolean) {
    this.exclusionApproval = bool;
    if (bool) {
      await this.screen.presentLoading();
      this.callsManager[this.class]
        .update({ exclude: true, excluded_by: this.user.value }, this.id)
        .then(() => {
          this.master.setCalls().then(() => {
            this.navigation.goTo('calls');
            this.screen.dismissLoading();
          });
        });
    }
  }

  exclusionUpdate() {
    this.call.excludeSolicitation = false;
    this.call.justifications?.forEach((e: any) => {
      e.isNew = false;
    });
    this.sendUpdate();
  }

  saleUpdate() {
    this.call.approved = 0;
    this.call.justificationsSale?.forEach((e: any) => {
      e.isNew = false;
    });
    this.sendUpdate();
  }

  rejectSale() {
    this.saleApproval = false;
  }

  approveSale() {
    this.call.approved = 1;
    this.call.approved_id = this.user.value.id;
    this.callsManager[this.class].update(this.call, this.call.id).then(() => {
      this.master.setCalls().then(() => {
        this.notificationClass
          .add({
            client_id: this.call.client_id,
            user_id: this.call.user_id,
            url: 'calls-add?params=sale&params=' + this.call.id,
            type: 'Venda Aprovada',
            date: new Date().toLocaleString(),
            reminder: this.date,
            read: false,
            text: `Parabéns! A venda do cliente ${this.call.client.nome
              } foi aprovada pelo GRUPO BRAX às ${new Date().toLocaleTimeString()} do dia ${new Date().toLocaleDateString()}! `,
          })
          .then(() => {
            this.notificationClass.setClassAll().then((res) => {
              this.notificationClass.makePagination(res);
              this.notificationClass.setUnread();
              this.navigation.goTo('calls');
            });
          });
      });
    });
  }
}
