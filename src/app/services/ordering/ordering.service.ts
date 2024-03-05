import { Injectable } from '@angular/core';
import { isAfter, isValid, parse, parseISO } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class OrderingService {
  constructor() {}

  order(data: any[], order: 'desc' | 'asc' = 'desc', customFinder?) {
    const arr = data?.sort((n1, n2) => {
      let { s1, s2 } = customFinder ? customFinder(n1, n2) : { s1: n1, s2: n2 };
      const isDate = isValid(parse(s1, 'dd/MM/yyyy', new Date()));
      if (isDate) {
        return this.orderDate(order, s1, s2);
      } else {
        return this.orderString(order, s1, s2);
      }
    });
    return arr;
  }

  orderString(order, s1, s2) {
    if (order === 'asc') {
      if (s1.toLowerCase() > s2.toLowerCase()) {
        return 1;
      }

      if (s1.toLowerCase() < s2.toLowerCase()) {
        return -1;
      }
      return 0;
    } else {
      if (s1.toLowerCase() < s2.toLowerCase()) {
        return 1;
      }

      if (s1.toLowerCase() > s2.toLowerCase()) {
        return -1;
      }

      return 0;
    }
  }

  orderDate(order, s1, s2) {
    const date1 = parse(s1, 'dd/MM/yyyy', new Date());
    const date2 = parse(s2, 'dd/MM/yyyy', new Date());
    if (order === 'asc') {
      if (isAfter(date1, date2)) {
        return 1;
      }

      if (isAfter(date2, date1)) {
        return -1;
      }
      return 0;
    } else {
      if (isAfter(date1, date2)) {
        return -1;
      }

      if (isAfter(date2, date1)) {
        return 1;
      }

      return 0;
    }
  }
}
