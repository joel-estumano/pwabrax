import { Component, OnInit } from '@angular/core';
import { BillsToPayClass } from 'src/app/classes/[finance]/billsToPay/billsToPay';
import { CashierClass } from 'src/app/classes/[finance]/cashier/cashier';
import { NotificationsClass } from 'src/app/classes/notifications/notifications';
import { ReceivementsClass } from 'src/app/classes/receivements/receivements';
import { UserClass } from 'src/app/classes/user/user';
import { CallsManagerService } from 'src/app/services/helpers/managers/calls-manager.service';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  showInfo: boolean = false;
  monthlyAccount: any;
  monthEndBalance: any;
  commissionsPayable: number = 0;
  supportProvided: number = 0;
  goalSummary: any;
  goalSummaryValues: number = 0;
  monthlyGoal: any;
  salesRanking: any;

  constructor(
    public notification: NotificationsClass,
    public receivements: ReceivementsClass,
    public billsToPay: BillsToPayClass,
    public callsManager: CallsManagerService,
    public cashier: CashierClass,
    private menu: MenuService,
    public user: UserClass) {
    this.menu.items.forEach((e) => {
      e.selected = e.name == 'Home';
    });
    this.getChartData();
  }

  async getChartData() {
    this.monthlyAccount = [
      { name: "Pagas", value: 12 },
      { name: "Em aberto", value: 4 }
    ];

    this.monthEndBalance = [
      // { name: 'A Receber', value: await this.receivements.getDataQuantity() },
      // { name: 'A Pagar', value: await this.billsToPay.getDataQuantity() },

      { name: 'A Receber', value: 30 },
      { name: 'A Pagar', value: 23 },

      // { name: 'A Receber', value: await this.receivements ? this.receivements.data[0]?.length : 0 },
      // { name: 'A Pagar', value: await this.billsToPay ? this.billsToPay.data?.length : 0 },
    ];

    for (let i = 0; i < this.callsManager.data.length; i++) {
      this.supportProvided += this.callsManager.data[i].length;
    }

    this.goalSummary = [
      {
        name: "Resumo da Meta",
        series: [
          { name: "01", value: 42 },
          { name: "05", value: 80 },
          { name: "10", value: 89.4 },
          { name: "15", value: 78 },
          { name: "20", value: 71 },
          { name: "25", value: 56 },
          { name: "30", value: 89 },
          { name: "35", value: 71 },
        ]
      },
    ];

    this.monthlyGoal = [
      {
        name: "Meta do Mês",
        series: [
          { name: "01", value: 42 },
          { name: "05", value: 80 },
          { name: "10", value: 89.4 },
          { name: "15", value: 78 },
          { name: "20", value: 71 },
          { name: "25", value: 56 },
          { name: "30", value: 89 },
          { name: "35", value: 71 },
        ]
      },
    ];

    // pegar e.info[5] para pegar os nomes/emails dos vendedores
    // this.cashier.data.forEach((e) => {
    //   e = e.info.filter(() => {
    //     return e.info.length === 6 && e.info[5] != '';
    //   });
    //   console.log(e);
    // });

    this.salesRanking = [
      { name: 'João Silva', value: 10 },
      { name: 'Ronaldo Júnior', value: 18 },
      { name: 'Wellington', value: 14 },
      { name: 'Bruna Machado', value: 10 },
    ];
  }
}