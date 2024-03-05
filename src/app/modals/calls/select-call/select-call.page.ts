import { Component } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-select-call',
  templateUrl: './select-call.page.html',
  styleUrls: ['./select-call.page.scss'],
})
export class SelectCallPage {
  constructor(
    private navigation: NavigationService,
    private screen: ScreenService
  ) {}

  budget() {
    this.navigation.goToParam('calls-add', 'budget');
    this.close();
  }

  sale() {
    this.navigation.goToParam('calls-add', 'sale');
    this.close();
  }

  support() {
    this.navigation.goTo('support-crud');
    this.close();
  }

  close() {
    this.screen.dismissModal();
  }
}
