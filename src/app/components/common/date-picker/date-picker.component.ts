import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() type = 'date';
  @Input() date;
  @Input() disabled = false;

  @Output() dateChange = new EventEmitter();

  openDate = false;

  constructor() {}

  pickDate() {
    this.openDate = !this.openDate;
  }

  setDate(event) {
    this.date = event.detail.value;
    this.dateChange.emit(this.date);
  }
}
