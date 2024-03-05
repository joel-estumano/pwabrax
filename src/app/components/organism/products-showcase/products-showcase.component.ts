import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-products-showcase',
  templateUrl: './products-showcase.component.html',
  styleUrls: ['./products-showcase.component.scss'],
})
export class ProductsShowcaseComponent {
  @Input() title;
  @Input() products: any[] = [];
  @Input() icon;
  @Input() call;

  @Output() removeProduct = new EventEmitter();
  @Output() addProduct = new EventEmitter();

  constructor() {}

  add(event) {
    this.addProduct.emit(event);
  }

  remove(event) {
    this.removeProduct.emit(event);
  }
}
