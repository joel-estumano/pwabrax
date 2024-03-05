import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.scss'],
})
export class Step5Component {
  @Input() data;
  @Output() adderEvent = new EventEmitter();
  @Output() editerEvent = new EventEmitter();
  @Output() deleterEvent = new EventEmitter();
  @Output() statusChanger = new EventEmitter();

  constructor() {}

  adder(event) {
    this.adderEvent.emit(event);
  }

  editer(event) {
    this.editerEvent.emit(event);
  }

  deleter(event) {
    this.deleterEvent.emit(event);
  }

  changeStatus(event) {
    this.statusChanger.emit(event);
  }
}
