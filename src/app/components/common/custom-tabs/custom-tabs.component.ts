import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserClass } from 'src/app/classes/user/user';

@Component({
  selector: 'app-custom-tabs',
  templateUrl: './custom-tabs.component.html',
  styleUrls: ['./custom-tabs.component.scss'],
})
export class CustomTabsComponent {
  @ViewChild('popover') popover;
  isOpen = false;

  @Input() active?: string;
  @Input() items: Array<{
    name: string;
    value?: any;
    selected?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    permission?: Array<string>;
    options?: Array<{
      name: string;
      selected?: boolean;
    }>;
  }> = [];
  @Input() filter: boolean = false;
  @Input() step: boolean = false;
  @Input() stepIndex: {
    current: number;
    total: number;
  };
  @Output() event: any = new EventEmitter();
  @Output() filterChoose: any = new EventEmitter();

  public filterOpt = [
    {
      title: 'Últimos 30 dias',
      icon: 'calendar-outline',
      type: 0,
    },
    {
      title: 'Status: Em Andamento',
      icon: 'filter-circle-outline',
      type: 1,
      disabled: true,
      class: 'opacity-50'
    },
    {
      title: 'Status: Encerrado',
      icon: 'filter-circle-outline',
      type: 2,
      disabled: true,
    },
    {
      title: 'Limpar Filtro',
      type: 3,
      class: 'clear-filter'
    }
  ];

  constructor(public user: UserClass, public popoverController: PopoverController) { }

  click(index, tab = '') {
    this.event.emit({ index, tab });
  }

  presentFilterPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  select(opcao: any) {
    this.filterChoose.emit(opcao);
    this.popoverController.dismiss();
  }
  
}
