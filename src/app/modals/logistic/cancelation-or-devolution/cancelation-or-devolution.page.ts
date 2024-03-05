import { Component, OnInit } from '@angular/core';
import { CancellationClass } from 'src/app/classes/[logistic]/cancellations/cancellations';
import { DevolutionClass } from 'src/app/classes/[logistic]/devolutions/devolutions';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-cancelation-or-devolution',
  templateUrl: './cancelation-or-devolution.page.html',
  styleUrls: ['./cancelation-or-devolution.page.scss'],
})
export class CancelationOrDevolutionPage implements OnInit {
  title = '';
  save;
  object = {
    reason: '',
    observation: '',
  };
  reasons;

  constructor(
    private screen: ScreenService,
    private reasonsDevolution: DevolutionClass,
    private reasonsCancellation: CancellationClass
  ) {}

  ngOnInit(): void {
    if (this.title == 'Devolução') {
      this.reasons = this.reasonsDevolution;
    } else {
      this.reasons = this.reasonsCancellation;
    }
  }

  leave() {
    this.screen.dismissModal();
  }
}
