import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-budget-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
})
export class Step1Component {
  @Input() call;
  constructor() {}
}
