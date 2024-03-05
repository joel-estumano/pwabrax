import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-step1-line',
  templateUrl: './step1-line.component.html',
  styleUrls: ['./step1-line.component.scss'],
})
export class Step1LineComponent {
  @Input() index = 1;
  @Input() product = {
    line: '',
    iccid: '',
    coupon: '',
  };

  constructor() {}
}
