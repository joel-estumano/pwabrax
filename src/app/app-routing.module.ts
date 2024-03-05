import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/menu/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/menu/profile/profile.module').then(
        (m) => m.ProfilePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'wide-chat',
    loadChildren: () =>
      import('./pages/menu/wide-chat/wide-chat.module').then(
        (m) => m.WideChatPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'calls',
    loadChildren: () =>
      import('./pages/menu/calls/calls-home/calls.module').then(
        (m) => m.CallsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'finance',
    loadChildren: () =>
      import('./pages/menu/finance/finance.module').then(
        (m) => m.FinancePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'receivement',
    loadChildren: () =>
      import('./pages/menu/receivements/receivements.module').then(
        (m) => m.ReceivementsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'support',
    loadChildren: () =>
      import('./pages/menu/support/support-home/support.module').then(
        (m) => m.SupportPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'registrations',
    loadChildren: () =>
      import(
        './pages/menu/registrations/registrations-home/registrations.module'
      ).then((m) => m.RegistrationsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'registrations-crud',
    loadChildren: () =>
      import(
        './pages/menu/registrations/registrations-crud/registrations-crud.module'
      ).then((m) => m.RegistrationsCrudPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'digital-products',
    loadChildren: () =>
      import(
        './pages/menu/digital-products/digital-products-home/digital-products.module'
      ).then((m) => m.DigitalProductsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'digital-products-crud',
    loadChildren: () =>
      import(
        './pages/menu/digital-products/digital-products-crud/digital-products-crud.module'
      ).then((m) => m.DigitalProductsCrudPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'support-crud',
    loadChildren: () =>
      import('./pages/menu/support/support-crud/support-crud.module').then(
        (m) => m.SupportCrudPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'calls-add',
    loadChildren: () =>
      import('./pages/menu/calls/calls-add/calls-add.module').then(
        (m) => m.CallsAddPageModule
      ),
  },
  {
    path: 'select-call',
    loadChildren: () =>
      import('./modals/calls/select-call/select-call.module').then(
        (m) => m.SelectCallPageModule
      ),
  },
  {
    path: 'notification',
    loadChildren: () =>
      import('./modals/notification/notification.module').then(
        (m) => m.NotificationPageModule
      ),
  },
  {
    path: 'coupon-budget',
    loadChildren: () =>
      import('./modals/calls/coupon-budget/coupon-budget.module').then(
        (m) => m.CouponBudgetPageModule
      ),
  },
  {
    path: 'terms',
    loadChildren: () =>
      import('./modals/terms/terms.module').then((m) => m.TermsPageModule),
  },
  {
    path: 'logistic-add',
    loadChildren: () =>
      import('./pages/menu/logistic/logistic-add/logistic-add.module').then(
        (m) => m.LogisticAddPageModule
      ),
  },
  {
    path: 'logistic',
    loadChildren: () =>
      import('./pages/menu/logistic/logistic-home/logistic-home.module').then(
        (m) => m.LogisticHomePageModule
      ),
  },
  {
    path: 'logistic-add-modal',
    loadChildren: () =>
      import(
        './modals/logistic/logistic-add-modal/logistic-add-modal.module'
      ).then((m) => m.LogisticAddModalPageModule),
  },
  {
    path: 'confirmation',
    loadChildren: () =>
      import('./modals/logistic/confirmation/confirmation.module').then(
        (m) => m.ConfirmationPageModule
      ),
  },
  {
    path: 'cancelation-or-devolution',
    loadChildren: () =>
      import(
        './modals/logistic/cancelation-or-devolution/cancelation-or-devolution.module'
      ).then((m) => m.CancelationOrDevolutionPageModule),
  },
  {
    path: 'data-distribution',
    loadChildren: () =>
      import(
        './modals/logistic/data-distribution/data-distribution.module'
      ).then((m) => m.DataDistributionPageModule),
  },
  {
    path: 'payment-distribution',
    loadChildren: () =>
      import(
        './modals/logistic/payment-distribution/payment-distribution.module'
      ).then((m) => m.PaymentDistributionPageModule),
  },
  {
    path: 'management',
    loadChildren: () =>
      import('./pages/menu/management/management.module').then(
        (m) => m.ManagementPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'commissions',
    loadChildren: () =>
      import('./pages/menu/commissions/comissions/commissions.module').then(
        (m) => m.CommissionsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'commissions-crud',
    loadChildren: () =>
      import(
        './pages/menu/commissions/commissions-crud/commissions-crud.module'
      ).then((m) => m.CommissionsCrudPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'responsible-modal',
    loadChildren: () => import('./modals/support/responsible-modal/responsible-modal.module').then( m => m.ResponsibleModalPageModule)
  },
  {
    path: 'finance-sell-modal',
    loadChildren: () => import('./modals/finance/finance-sell-modal/finance-sell-modal.module').then( m => m.FinanceSellModalPageModule)
  },
  {
    path: 'move-values-modal',
    loadChildren: () => import('./modals/finance/move-values-modal/move-values-modal.module').then( m => m.MoveValuesModalPageModule)
  },
  {
    path: 'invoice-payment-modal',
    loadChildren: () => import('./modals/finance/invoice-payment-modal/invoice-payment-modal.module').then( m => m.InvoicePaymentModalPageModule)
  },
  {
    path: 'new-expense-modal',
    loadChildren: () => import('./modals/finance/new-expense-modal/new-expense-modal.module').then( m => m.NewExpenseModalPageModule)
  },
  {
    path: 'new-expense-phone-modal',
    loadChildren: () => import('./modals/finance/new-expense-phone-modal/new-expense-phone-modal.module').then( m => m.NewExpensePhoneModalPageModule)
  },
  {
    path: 'new-receivements-modal',
    loadChildren: () => import('./modals/finance/new-receivements-modal/new-receivements-modal.module').then( m => m.NewReceivementsModalPageModule)
  },
  {
    path: 'new-commission-modal',
    loadChildren: () => import('./modals/commissions/new-commission-modal/new-commission-modal.module').then( m => m.NewCommissionModalPageModule)
  },
  {
    path: 'new-batch-commission-modal',
    loadChildren: () => import('./modals/commissions/new-batch-commission-modal/new-batch-commission-modal.module').then( m => m.NewBatchCommissionModalPageModule)
  },
  {
    path: 'new-campaign-modal',
    loadChildren: () => import('./modals/commissions/new-campaign-modal/new-campaign-modal.module').then( m => m.NewCampaignModalPageModule)
  },
  {
    path: 'campaigns-crud',
    loadChildren: () => import('./pages/menu/commissions/campaigns-crud/campaigns-crud.module').then( m => m.CampaignsCrudPageModule)
  },
  {
    path: 'open-close-cash-modal',
    loadChildren: () => import('./modals/finance/open-close-cash-modal/open-close-cash-modal.module').then( m => m.OpenCloseCashModalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
