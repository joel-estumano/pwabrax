import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserClass } from '../classes/user/user';
import { ProductClass } from '../classes/product/products';
import { CancelledServicesClass } from '../classes/[logistic]/cancelledServices/cancelledServices';
import { DistributionClass } from '../classes/[logistic]/distribution/distribution';
import { HistoricClass } from '../classes/[logistic]/historic/historic';
import { StockClass } from '../classes/[logistic]/stock/stock';
import { BudgetClass } from '../classes/[calls]/budget/budget';
import { SaleClass } from '../classes/[calls]/sale/sale';
import { SupportClass } from '../classes/[calls]/support/support';
import { ClientClass } from '../classes/[people]/clients/clients';
import { SuppliersClass } from '../classes/[people]/suppliers/suppliers';
import { ColaboratorsClass } from '../classes/[people]/colaborators/colaborators';
import { PartnersClass } from '../classes/[people]/partners/partners';
import { ContractClass } from '../classes/contract/contract';
import { NotificationsClass } from '../classes/notifications/notifications';
import { PaymentsClass } from '../classes/payments/payments';
import { TermClass } from '../classes/terms/terms';
import { CategoriesClass } from '../classes/[logistic]/categories/categories';
import { OperatorsClass } from '../classes/[logistic]/operators/operators';
import { CashierClass } from '../classes/[finance]/cashier/cashier';
import { BillsToPayClass } from '../classes/[finance]/billsToPay/billsToPay';
import { GeneralClass } from '../classes/[finance]/general/general';
import { MovementsClass } from '../classes/[finance]/movements/movements';
import { InvoicesClass } from '../classes/[finance]/invoices/invoices';
import { ReceivementsClass } from '../classes/receivements/receivements';
import { DevolutionClass } from '../classes/[logistic]/devolutions/devolutions';
import { CancellationClass } from '../classes/[logistic]/cancellations/cancellations';
import { CommissionsClass } from '../classes/commissions/commissions';
import { CommissionTypesClass } from '../classes/commissions/commission-types';
import { ManagementClass } from '../classes/management/management';
import { FinanceCategoriesClass } from '../classes/[finance]/categories/finance-categories';
import { CampaignsClass } from '../classes/commissions/campaigns';
import { OpenOrCloseCashClass } from '../classes/[finance]/cashier/open-close-cash';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    UserClass,
    ProductClass,
    ContractClass,

    // Logistic
    CancelledServicesClass,
    DistributionClass,
    HistoricClass,
    StockClass,
    CategoriesClass,
    OperatorsClass,
    DevolutionClass,
    CancellationClass,

    // Support
    BudgetClass,
    SaleClass,
    SupportClass,

    // People
    ClientClass,
    SuppliersClass,
    ColaboratorsClass,
    PartnersClass,

    // Finance
    CashierClass,
    BillsToPayClass,
    GeneralClass,
    MovementsClass,
    InvoicesClass,
    ReceivementsClass,
    OpenOrCloseCashClass,

    // Notifications
    NotificationsClass,

    // Payments
    PaymentsClass,

    // Terms
    TermClass,

    // Commissions
    CommissionsClass,
    CommissionTypesClass,
    CampaignsClass,

    //Management
    ManagementClass,

    // Finance
    FinanceCategoriesClass,
  ],
})
export class SharedModule {}
