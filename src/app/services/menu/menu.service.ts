import { Injectable } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavigationService } from '../navigation/navigation.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public items: Array<{
    name: string;
    icon: string;
    path?: string;
    url?: string;
    permission?: Array<string>;
    selected: boolean;
    disabled?: boolean;
  }> = [
    {
      name: 'Home',
      icon: 'home',
      path: 'home',
      selected: true,
    },
    {
      name: 'Meu Perfil',
      // icon: 'user',
      icon: 'person', 
      path: 'profile',
      selected: false,
    },
    {
      name: 'WideChat',
      icon: 'chatbubble',
      // path: 'wide-chat',
      url: 'https://grupobrax.widechat.com.br/user/agent', // Link externo
      permission: ['2', '7'],
      selected: false,
      disabled: false,
    },
    {
      name: 'Atendimentos',
      icon: 'chatbubble-ellipses',
      path: 'calls',
      permission: ['1', '3', '4', '5', '7'],
      selected: false,
      disabled: false,
    },
    {
      name: 'Produtos Digitais',
      // icon: 'list-checklist',
      icon: 'grid',
      path: 'digital-products',
      permission: ['5', '7'],
      selected: false,
      disabled: false,
    },
    {
      name: 'Financeiro',
      // icon: 'chart-line',
      icon: 'trending-up',
      path: 'finance',
      permission: ['5', '6', '7'],
      selected: false,
      disabled: false,
    },
    {
      name: 'A Receber',
      icon: 'pie-chart',
      path: 'receivement',
      permission: ['3', '7'],
      selected: false,
      disabled: false,
    },
    {
      name: 'Cadastros',
      icon: 'people',
      path: 'registrations',
      permission: ['3', '4', '7'],
      selected: false,
      disabled: false,
    },
    {
      name: 'Logística',
      icon: 'extension-puzzle',
      path: 'logistic',
      permission: ['7'],
      selected: false,
      disabled: false,
    },
    {
      name: 'Ajuda e Suporte',
      icon: 'help-circle',
      path: 'support',
      permission: ['2', '3', '7'],
      selected: false,
      disabled: false,
    },
    {
      name: 'Gestão',
      icon: 'ellipsis-horizontal',
      path: 'management',
      permission: ['5', '7'],
      selected: false,
      disabled: false,
    },
    {
      name: 'Comissões e Campanhas',
      icon: 'book',
      path: 'commissions',
      permission: ['5', '7'],
      selected: false,
      disabled: false,
    },
  ];
  constructor(
    private menu: MenuController,
    private navigation: NavigationService
  ) {}

  menuStatus() {
    return this.menu.isOpen;
  }

  menuControl(bool: boolean) {
    this.menu.enable(bool);
  }

  closeMenu() {
    this.menu.close();
  }

  goTo(item) {
    item.url ? this.navigation.away(item.url) : this.navigation.goTo(item.path);

    this.items.forEach((item) => (item.selected = false));
    item.selected = true;
  }
}
