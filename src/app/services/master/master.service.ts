import { PeopleManagerService } from 'src/app/services/helpers/managers/people-manager.service';
import { Injectable } from '@angular/core';
import { UserClass } from 'src/app/classes/user/user';
import { User } from 'src/app/interfaces/user';
import { BreadcrumbService } from '../breadcrumb/breadcrumb.service';
import { ProductClass } from 'src/app/classes/product/products';
import { StockClass } from 'src/app/classes/[logistic]/stock/stock';
import { BudgetClass } from 'src/app/classes/[calls]/budget/budget';
import { SaleClass } from 'src/app/classes/[calls]/sale/sale';
import { SupportClass } from 'src/app/classes/[calls]/support/support';
import { Products } from 'src/app/interfaces/products';
import { ContractClass } from 'src/app/classes/contract/contract';
import { CallsManagerService } from '../helpers/managers/calls-manager.service';
import { PaymentsClass } from 'src/app/classes/payments/payments';
import { NotificationsClass } from 'src/app/classes/notifications/notifications';
import { TermClass } from 'src/app/classes/terms/terms';
import { LogisticManagerService } from '../helpers/managers/logistic-manager.service';
import { CategoriesClass } from 'src/app/classes/[logistic]/categories/categories';
import { OperatorsClass } from 'src/app/classes/[logistic]/operators/operators';
import { FinanceManagerService } from '../helpers/managers/finance-manager.service';
import { BillsToPayClass } from 'src/app/classes/[finance]/billsToPay/billsToPay';
import { CashierClass } from 'src/app/classes/[finance]/cashier/cashier';
import { GeneralClass } from 'src/app/classes/[finance]/general/general';
import { MovementsClass } from 'src/app/classes/[finance]/movements/movements';
import { InvoicesClass } from 'src/app/classes/[finance]/invoices/invoices';
import { ReceivementsClass } from 'src/app/classes/receivements/receivements';
import { DevolutionClass } from 'src/app/classes/[logistic]/devolutions/devolutions';
import { CancellationClass } from 'src/app/classes/[logistic]/cancellations/cancellations';
import { CommissionsClass } from 'src/app/classes/commissions/commissions';
import { ManagementClass } from 'src/app/classes/management/management';
import { FinanceCategoriesClass } from 'src/app/classes/[finance]/categories/finance-categories';
import { CampaignsClass } from 'src/app/classes/commissions/campaigns';
import { CommissionTypesClass } from 'src/app/classes/commissions/commission-types';
import { OpenOrCloseCashClass } from 'src/app/classes/[finance]/cashier/open-close-cash';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(
    private breadcrumb: BreadcrumbService,
    private userClass: UserClass,
    private productClass: ProductClass,
    private contractClass: ContractClass,
    private notificationClass: NotificationsClass,

    // Logistic
    private stockClass: StockClass,
    private categories: CategoriesClass,
    private operators: OperatorsClass,
    private devolutions: DevolutionClass,
    private cancellation: CancellationClass,

    // Finance
    private generalClass: GeneralClass,
    private cashierClass: CashierClass,
    private billsToPayClass: BillsToPayClass,
    private movementsClass: MovementsClass,
    private invoicesClass: InvoicesClass,
    private receivementsClass: ReceivementsClass,
    private financeCategoriesClass: FinanceCategoriesClass,
    private openOrCloseCashClass: OpenOrCloseCashClass,

    // Commissions
    private commissionsClass: CommissionsClass,
    private commissionTypesClass: CommissionTypesClass,
    private campaignsClass: CampaignsClass,

    // Management
    private managementClass: ManagementClass,

    // Support
    private budgetClass: BudgetClass,
    private saleClass: SaleClass,
    private supportClass: SupportClass,

    // Payments
    private payments: PaymentsClass,

    // Managers
    private peopleManager: PeopleManagerService,
    private callsManager: CallsManagerService,
    private logisticManager: LogisticManagerService,
    private financeManager: FinanceManagerService,

    // Terms
    private termClass: TermClass
  ) { }

  setWithoutAuth() {
    this.termClass.setClassAll().then((res) => {
      // console.log(res);
    });
  }

  async set(userId: string) {
    this.userClass.setClassAll<User>(true, false, 'all_users').then((res) => {
      this.setAll(res, userId);
      this.notificationClass.setClassAll().then(() => {
        this.setNotifications();
      });
    });

    this.productClass.setClassAll<Products>().then((res) => {
      this.productClass.makeSet(res);
    });

    this.contractClass.setClassAll();

    // Finance
    this.setFinance();
    this.financeCategoriesClass.setClassAll().then((res) => {
      this.financeCategoriesClass.makeSet(res);
      this.financeCategoriesClass.makePagination();
    });

    // Receivements
    this.receivementsClass.setClassAll().then((res) => {
      this.receivementsClass.makeSet(res);
      this.receivementsClass.makePagination();
    });

    // Logistic
    this.setLogistic();

    this.categories.setClassAll().then((res) => {
      this.categories.makeSet(res);
    });
    this.operators.setClassAll().then((res) => {
      this.operators.makeSet(res);
    });

    // Support
    this.setCalls();
    this.supportClass.setClassAll().then((res) => {
      this.supportClass.makeSet(res);
      this.supportClass.makePagination();
    });

    // Management
    this.managementClass.setClassAll().then((res) => {
      this.managementClass.makeSet(res);
      this.managementClass.makePagination();
    });

    // Comissions
    this.setCommissions();
    this.commissionsClass.setClassAll().then((res) => {
      this.commissionsClass.makeSet(res);
      this.commissionsClass.makePagination();
    });
    this.commissionTypesClass.setClassAll().then((res) => {
      this.commissionTypesClass.makeSet(res);
      this.commissionTypesClass.makePagination();
    });

    // Campaigns
    this.setCampaigns();
    this.campaignsClass.setClassAll().then((res) => {
      this.campaignsClass.makeSet(res);
      this.campaignsClass.makePagination();
    });

    this.payments.setClassAll();
    this.devolutions.setClassAll();
    this.cancellation.setClassAll();
  }

  async setCalls() {
    this.callsManager.reset();
    await this.budgetClass.setClassAll().then((res) => {
      const data = this.budgetClass.makeSet(res);
      this.callsManager.add(data);
      this.saleClass.setClassAll().then((res) => {
        const data = this.saleClass.makeSet(res);
        this.callsManager.add(data);
        this.callsManager.makePagination(this.callsManager.data, true);
      });
    });
  }

  async setFinance() {
    this.financeManager.reset();
    await this.generalClass.setClassAll().then((res) => {
      const data = this.generalClass.makeSet(res);
      this.financeManager.data = data;
      this.financeManager.show = data;
      this.financeManager.makePagination(this.financeManager.data, true);
      this.financeManager.tabsFilter(
        this.financeManager.tabs[0],
        this.financeManager.tabs
      );
      this.financeManager.makePagination(this.financeManager.show);
    });

    // Caixa
    this.cashierClass.setClassAll().then((res) => {
      this.cashierClass.makeSet(res);
    });

    this.openOrCloseCashClass.setClassAll().then((res) => {
      this.openOrCloseCashClass.makeSet(res);
    });

    // Contas a pagar
    this.billsToPayClass.setClassAll().then((res) => {
      this.billsToPayClass.makeSet(res);
    });

    // Movimentações
    this.movementsClass.setClassAll().then((res) => {
      this.movementsClass.makeSet(res);
    });

    this.invoicesClass.setClassAll().then((res) => {
      this.invoicesClass.makeSet(res);
    });
  }

  // async setBillsToPay() {
  //   this.billsToPayClass.reset();
  //   this.billsToPayClass.setClassAll().then((res) => {
  //     const data = this.billsToPayClass.makeSet(res);
  //     this.billsToPayClass.data = data;
  //     this.billsToPayClass.show = data;
  //     // this.billsToPayClass.makePagination(this.billsToPayClass.data, true);
  //   });
  // }

  async setReceivements() {
    this.receivementsClass.reset();
    await this.receivementsClass.setClassAll().then((res) => {
      const data = this.receivementsClass.makeSet(res);
      this.receivementsClass.data = data;
      this.receivementsClass.show = data;
      this.receivementsClass.makePagination(this.receivementsClass.data, true);
    });
  };

  async setLogistic() {
    this.logisticManager.reset();
    await this.stockClass.setClassAll().then((res) => {
      const data = this.stockClass.makeSet(res);
      this.logisticManager.add(data);
      this.logisticManager.makePagination(this.logisticManager.data, true);
      this.logisticManager.tabsFilter(
        this.logisticManager.tabs[0],
        this.logisticManager.tabs
      );
      this.logisticManager.makePagination(this.logisticManager.show);
    });
  }

  async setCommissions() {
    this.commissionsClass.reset();
    await this.commissionsClass.setClassAll().then((res) => {
      const data = this.commissionsClass.makeSet(res);
      this.commissionsClass.data = data;
      this.commissionsClass.show = data;
      this.commissionsClass.makePagination(this.commissionsClass.data, true);
    });
  };

  async setCampaigns() {
    this.campaignsClass.reset();
    await this.campaignsClass.setClassAll().then((res) => {
      const data = this.campaignsClass.makeSet(res);
      this.campaignsClass.data = data;
      this.campaignsClass.show = data;
      // this.campaignsClass.tabsFilter(
      //   this.campaignsClass.tabs[1],
      //   this.campaignsClass.tabs
      // );
      this.campaignsClass.makePagination(this.campaignsClass.data, true);
    });
  };

  public setAll(res, userId) {
    this.userClass.allUsers = res;
    this.userClass.fill(res);
    this.setUser(userId);
    this.userClass.setUsersFromLevel();
    this.peopleManager.makePagination(
      this.peopleManager.data,
      true,
      this.userClass.value
    );
    this.financeManager.makePagination(
      this.financeManager.data,
      true,
      this.userClass.value
    );
  }

  public setNotifications() {
    // this.notificationClass.getMyNotifications();
    this.notificationClass.getAllNotifications();
    this.notificationClass.makePagination();
    this.notificationClass.setUnread();
  }

  private setUser(userId) {
    const user = this.userClass.find(userId);
    this.userClass.value = user;
    this.userClass.setCache(user);
    this.userClass.toUpdate = user;
    this.userClass.displayEmail = this.userClass.value.email.split('@')[0];
  }

  init() {
    this.breadcrumb.init();
  }
}
