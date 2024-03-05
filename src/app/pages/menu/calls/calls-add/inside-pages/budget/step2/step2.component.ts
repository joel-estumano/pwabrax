import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
})
export class Step2Component {
  @Input() call;
  constructor() {}
}
