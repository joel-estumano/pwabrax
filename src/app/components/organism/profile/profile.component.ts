import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-custom-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @Input() openDate = false;
  @Input() user: User;
  minDate: string;

  constructor() {
    const today = new Date();
    // today.setFullYear(today.getFullYear() - 15);
    this.minDate = today.toISOString();
  }

  pickDate() {
    this.openDate = !this.openDate;
  }

  setDate(event) {
    const date = event.detail.value;
    this.user.data_nascimento = new Date(date).toLocaleDateString();
  }

  preventNumbers(event: any, fieldName: string) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (/^(0{3,}|1{3,})/.test(value)) {
      const newValue = value.replace(/^(0{3,}|1{3,})/, '');
      input.value = newValue;
      this.user[fieldName] = newValue;
    }
  }

  limitNumber(event: any) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length >= 5) {
      event.preventDefault();
    }

    const key = event.key;
    const isDigit = /^\d$/.test(key);
    if (!isDigit) {
      event.preventDefault();
    }
  }

  onlyNumber(event: KeyboardEvent) {
    const allowedChars = /[0-9]/;
    const inputChar = String.fromCharCode(event.keyCode || event.which);

    if (!allowedChars.test(inputChar)) {
      event.preventDefault();
    }
  }

  onlyText(event: KeyboardEvent) {
    if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    const allowedChars = /[a-zA-Záéíóúâêîôûãõàèìòùäëïöüç\s]/;
    const inputChar = String.fromCharCode(event.keyCode || event.which);

    if (!allowedChars.test(inputChar)) {
      event.preventDefault();
    }
  }
}
