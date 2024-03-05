import { Injectable } from '@angular/core';

@Injectable()
export class PageCore {
  public currentPage = 0;
  public tabs: Array<any> = [];

  tabEvent(event, tabs?) {
    tabs
      ? tabs.forEach((e, i) => {
          e.selected = i == event;
          if (e.selected) {
            this.setData();
          }
        })
      : this.tabs.forEach((e, i) => {
          e.selected = i == event;
          if (e.selected) {
            this.setData();
          }
        });
  }

  findSelectedTab(tabs?) {
    const selectedTab = tabs
      ? tabs.filter((e) => {
          if (e.selected) return e;
        })
      : this.tabs.filter((e) => {
          if (e.selected) return e;
        });
    return selectedTab[0];
  }

  resetTabs() {
    this.tabs.forEach((e) => {
      e.selected = false;
    });
    this.tabs[0].selected = true;
  }

  changeTab(index: number, tabs?) {
    const selectedTab = tabs
      ? tabs.findIndex((e) => {
          if (e.selected) return e;
        })
      : this.tabs.findIndex((e) => {
          if (e.selected) return e;
        });
    return tabs ? tabs[selectedTab + index] : this.tabs[selectedTab + index];
  }

  setData() {}

  // Ao voltar nas paginações, é necessário verificar se o usuário está na primeira página, se estiver chama a BackAction que é a ação final; sendo esta definida como override no child component
  goBack(cancel: boolean, tabs?) {
    if (cancel) {
      this.backAction();
    } else {
      const tab = this.changeTab(-1, tabs ? tabs : null);
      this.tabEvent(tabs ? tabs.indexOf(tab) : this.tabs.indexOf(tab));
    }
  }

  backAction() {}

  // Ao avançar nas paginações, é necessário verificar se o usuário está na última página, se estiver chama a UpAction que é a ação final; sendo esta definida como override no child component
  goUp(ending: boolean, tabs?) {
    if (ending) {
      this.upAction();
    } else {
      const tab = this.changeTab(1, tabs ? tabs : null);
      this.tabEvent(tabs ? tabs.indexOf(tab) : this.tabs.indexOf(tab));
    }
  }

  upAction() {}
}
