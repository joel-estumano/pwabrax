import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  semana = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ];

  constructor() {}

  fullDate(date?) {
    const d = date ? new Date(date) : new Date();
    const day = d.getDate();
    const month = this.meses[d.getMonth()];
    const year = d.getFullYear();
    const week = this.semana[d.getDay()];

    return week + ' ' + day + ' de ' + month + ' de ' + year;
  }
}
