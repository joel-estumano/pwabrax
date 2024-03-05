import { Component, Input } from '@angular/core';
import { CategoriesClass } from 'src/app/classes/[logistic]/categories/categories';
import { StockClass } from 'src/app/classes/[logistic]/stock/stock';

@Component({
  selector: 'app-each-product',
  templateUrl: './each-product.component.html',
  styleUrls: ['./each-product.component.scss'],
})
export class EachProductComponent {
  @Input() logistic: any;

  constructor(
    public categories: CategoriesClass,
    public stockClass: StockClass
  ) {}

  selectType(event) {
    this.logistic.type = event.target.value;
  }

  selectQtd(event) {
    this.logistic.qtd = event.target.value;
  }

  selectCategory(event) {
    this.logistic.category = event.target.value;
  }

  onlyNumber(event: KeyboardEvent) {
    const allowedChars = /[0-9]/;
    const inputChar = String.fromCharCode(event.keyCode || event.which);

    if (!allowedChars.test(inputChar)) {
      event.preventDefault();
    }
  }
}
