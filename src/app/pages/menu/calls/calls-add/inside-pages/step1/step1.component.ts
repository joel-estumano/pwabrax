import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserClass } from 'src/app/classes/user/user';
import { CallsManagerService } from 'src/app/services/helpers/managers/calls-manager.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
})
export class Step1Component {
  @Input() call;
  @Input() class;

  @Output() selectEvent = new EventEmitter();
  @Output() addClientEvent = new EventEmitter();

  constructor(
    public user: UserClass,
    public callsManager: CallsManagerService
  ) {}

  addClient() {
    this.addClientEvent.emit();
  }

  findClient() {
    const user = this.user.find(this.call.client_id);
    this.call.client = user;
    this.selectEvent.emit(this.call.client);
  }

  select(event) {
    const { value } = event.detail;
    this.call.client_id = value;
    this.call.client = this.user.find(this.call.client_id);
    this.selectEvent.emit(this.call.client);
  }
}
