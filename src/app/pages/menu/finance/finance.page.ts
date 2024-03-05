import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColorHelper } from '@swimlane/ngx-charts';
import { type } from 'os';
import { PageCore } from 'src/app/classes/core/page-core';
import { UserClass } from 'src/app/classes/user/user';
import { FinanceSellModalPage } from 'src/app/modals/finance/finance-sell-modal/finance-sell-modal.page';
import { InvoicePaymentModalPage } from 'src/app/modals/finance/invoice-payment-modal/invoice-payment-modal.page';
import { MoveValuesModalPage } from 'src/app/modals/finance/move-values-modal/move-values-modal.page';
import { NewExpenseModalPage } from 'src/app/modals/finance/new-expense-modal/new-expense-modal.page';
import { NewExpensePhoneModalPage } from 'src/app/modals/finance/new-expense-phone-modal/new-expense-phone-modal.page';
import { OpenCloseCashModalPage } from 'src/app/modals/finance/open-close-cash-modal/open-close-cash-modal.page';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';
import { FinanceManagerService } from 'src/app/services/helpers/managers/finance-manager.service';
import { MasterService } from 'src/app/services/master/master.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScreenService } from 'src/app/services/screen/screen.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.page.html',
  styleUrls: ['./finance.page.scss'],
})
export class FinancePage extends PageCore implements OnDestroy {
  order = 'asc';
  lastOrder = '';
  total = '0,00';
  public current_tab = 'Visão Geral';
  public filterOption = 0;
  public search = '';
  public class = 'general';
  override tabs = this.financeManager.tabs;
  colorScheme = { domain: ['#00a91b', '#e80000'] };
  colorScheme2 = { domain: ['#263066', '#ffb800', '#575757', '#b1b1b1'] };

  invoicesCharts: any[] = [];
  purchasesCharts: any[] = [];

  constructor(
    public financeManager: FinanceManagerService,
    public user: UserClass,
    private menu: MenuService,
    private navigation: NavigationService,
    private auth: AuthService,
    private screen: ScreenService,
    private breadcrumb: BreadcrumbService,
    private router: Router,
    private master: MasterService
  ) {
    super();
  }

  ngOnInit() {
    this.getChartData();
  }

  async ionViewWillEnter() {
    this.master.setFinance();

    this.menu.items.forEach((e) => {
      e.selected = e.name == 'Financeiro';
    });

    this.breadcrumb.add(
      {
        name: 'Financeiro',
        path: 'finance',
      },
      true
    );
    this.resetTabs();
    this.financeManager.makePagination(this.financeManager.show);
  }

  getChartData() {
    this.invoicesCharts = [
      {
        "name": "Pagas",
        "value": 12
      },
      {
        "name": "Em aberto",
        "value": 4
      }
    ];

    this.purchasesCharts = [
      {
        "name": "VT",
        "value": 40632,
        "extra": {
          "code": "de"
        }
      },
      {
        "name": "VA",
        "value": 50000,
        "extra": {
          "code": "us"
        }
      },
      {
        "name": "Telefonia",
        "value": 36745,
        "extra": {
          "code": "fr"
        }
      },
      {
        "name": "Pagamentos",
        "value": 36240,
        "extra": {
          "code": "uk"
        }
      }
    ]
  }

  ngOnDestroy(): void {
    this.financeManager.show = this.financeManager.data;
  }

  getLastCashierAction() {
    const lastCashier = this.financeManager.cashier.data[0];
    if (lastCashier) {
      return lastCashier;
    }
    return '';
  }

  export_report() {
    this.screen.presentToast('Exportando arquivo...', 'success');
    let organizedData: any[] = [];
    const financeData = [];

    this.financeManager.show.forEach((array: any) => {
      financeData.push(...array);
    });

    financeData.forEach((data: any) => {
      organizedData.push({
        'ID': data.info[0], 'Vencimento': data.info[1], 'Produto/Serviço': data.info[2],
        'Forma de Pagamento': data.info[3], 'Data Pagamento': data.info[4], 'Valor R$': data.info[5], 'Situação': data.info[6]
      });
    });

    const ws = XLSX.utils.json_to_sheet(organizedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Financeiro-Visao-Geral.xlsx');
  }

  new_sell() {
    this.screen.openModal(FinanceSellModalPage, 'is60 large', {
      done: () => {
        this.resetTabs();
      },
    });
  }

  move_cashier_values() {
    this.screen.openModal(MoveValuesModalPage, 'is70 large', {
      fixed: true,
      done: () => {
        this.resetTabs();
      },
    });
  }

  move_values() {
    this.screen.openModal(MoveValuesModalPage, 'is60 large', {
      fixed: false,
      done: () => {
        this.resetTabs();
      },
    });
  }

  invoice_payment() {
    this.screen.openModal(InvoicePaymentModalPage, 'is60 large', {
      done: () => {
        this.resetTabs();
      },
    });
  }

  open_close_cash_register() {
    this.screen.openModal(OpenCloseCashModalPage, 'is70 large', {
      lastCashierAction: this.getLastCashierAction(),
      done: () => {
        this.resetTabs();
      },
    });
  }

  new_expense() {
    this.screen.openModal(NewExpenseModalPage, 'is90 large', {
      done: () => {
        this.resetTabs();
      },
    });
  }

  new_expense_phone() {
    this.screen.openModal(NewExpensePhoneModalPage, 'is110 large', {
      done: () => {
        this.resetTabs();
      },
    });
  }

  redirectToCalls() {
    this.router.navigateByUrl('/calls-add?params=budget').then(() => {
      this.tabEvent();
    });
  }

  override resetTabs() {
    this.tabs.forEach((e) => {
      e.selected = false;
    });
    this.tabs[0].selected = true;
    this.tabEvent();
  }

  add() {
    const selectedTab = this.findSelectedTab();
    this.navigation.goToParam('registrations-crud', {
      page: selectedTab.class,
    });
  }

  edit(event) {
    const selectedTab = this.findSelectedTab();
    const id = event.info[0];
    this.navigation.goToParam('registrations-crud', {
      page: selectedTab.class,
      who: id,
    });
  }

  async del(event) {
    if (this.user.value.level === '7') {
      await this.screen.presentLoading();
      const user = this.user.find(event.info[0]);
      const images = Object.keys(user)
        .map((e) => {
          if (
            (e === 'doc_cpf' || e === 'doc_company' || e === 'doc_residence') &&
            user[e].url
          )
            return user[e].url;
        })
        .filter((e) => {
          if (e) return e;
        });
      this.auth.deleteAdmin(user.id).then(() => {
        this.user.delete(event.info[0], images.length > 0, images).then(() => {
          this.user.setClassAll(true, false, 'all_users').then((res: any) => {
            this.user.allUsers = res;
            this.user.setUsersFromLevel();
            this.user.fill(res);
            this.setData();
            this.screen.dismissLoading();
          });
        });
      });
    } else {
      this.screen.presentToast('Você não tem permissão para excluir usuários.');
    }
  }

  share(event) {
    this.screen.navigationShare(
      'Titulo aqui',
      'Texto aqui',
      'http://localhost:8100/registrations-crud?params=' +
      event.extra[1] +
      '&params=' +
      event.info[0]
    );
  }

  getHeaders(current_tab: any) {
    switch (current_tab) {
      case 'Contas a pagar':
        if (this.filterOption == 1)
          return this.financeManager.billsToPay.phone_headers;
        else
          return this.financeManager[this.class].headers;

      case 'Movimentações':
        if (this.filterOption == 0)
          return this.financeManager.movements.cashier_headers;
        else
          return this.financeManager[this.class].headers;

      default:
        return this.financeManager[this.class].headers;
    }
  }

  override tabEvent(event = 0, tabName = '') {
    var filterOption = 0;
    if (tabName.length > 0) {
      this.tabs.forEach((e, i) => {
        e.selected = e.name == tabName;
        if (e.selected) {
          this.setData();
        }
      });

      var filterOption = event;
    } else {
      this.tabs.forEach((e, i) => {
        e.selected = i == event;
        if (e.selected) {
          this.setData();
        }
      });
    }

    const tab = this.findSelectedTab();

    if (filterOption >= 0 && tab.options) {
      tab.options.forEach((e, i) => {
        e.selected = i == filterOption;
      });
    }

    this.current_tab = tab.name;
    this.filterOption = filterOption;
    this.class = tab.class;
    this.financeManager.data = this.financeManager[tab.class].data;
    this.financeManager.show = this.financeManager.data;
    this.financeManager.makePagination(this.financeManager.show, true);
    this.financeManager.tabsFilter(tab, this.tabs, filterOption);
    const items = this.financeManager.show;
    this.financeManager.makePagination(this.financeManager.show, true);

    if (this.current_tab == 'Movimentações') {
      let total = 0;

      items.forEach((item) => {
        if (item.info && item.info.length > 2) {
          // se for CX LOJA
          if (this.filterOption == 0) {
            // verificando se já é um número para somar, se não, faz a conversão
            if (typeof item.info[2] === 'number') {
              // se a origem não for de CX LOJA, faz a subtração
              if (item.extra[1] === 'CX LOJA') {
                total += item.info[2];
              }
              else {
                total -= item.info[2];
              }
            } else {
              const floatValue = parseFloat(item.info[2].replace(',', '.'));
              if (!isNaN(floatValue)) {
                if (item.extra[1] === 'CX LOJA') {
                  total += floatValue;
                }
                else {
                  total -= floatValue;
                }
              }
            }
          }
          else {
            if (typeof item.info[2] === 'number') {
              total += item.info[2];
            } else {
              const floatValue = parseFloat(item.info[2].replace(',', '.'));
              if (!isNaN(floatValue)) {
                total += floatValue;
              }
            }
          }
        }
      });

      this.total = total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    }

    if (this.search) this.searching();
  }

  searching(clear = false) {
    if (clear) this.search = '';
    const tab = this.findSelectedTab();
    const searched = this.financeManager[tab.class].data.filter((e: any) => {
      return (
        e.info[0].toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
        e.info[1].toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    });
    this.financeManager.show = searched;
    this.financeManager.makePagination(this.financeManager.show, true);
  }

  clickHeader(item) {
    if (this.lastOrder === item) {
      this.order = this.order === 'asc' ? 'desc' : 'asc';
    }
    this.lastOrder = item;
    let data: any = [];
    this.financeManager.show.forEach((e: any) => {
      data.push(...e);
    });
    this.financeManager.makePagination(
      data,
      false,
      this.user.value,
      this.order,
      item
    );
  }
}
