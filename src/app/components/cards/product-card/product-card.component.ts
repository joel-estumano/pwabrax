import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product;
  @Input() icon;
  @Input() call;

  @Output() removeProduct = new EventEmitter();
  @Output() addProduct = new EventEmitter();

  constructor() {}

  remove() {
    if (!this.product.quantity) this.product.quantity = 0;
    if (this.product.quantity <= 0) return;
    this.product.quantity -= 1;
    this.removeProduct.emit(this.product);
  }

  add() {
    if (!this.product.quantity) this.product.quantity = 0;
    this.product.quantity += 1;
    this.addProduct.emit(this.product);
  }

  find() {
    this.call.products.find((e) => {
      if (e.product.id === this.product.id) {
        this.product.quantity = e.product.quantity;
      }
    });
  }
}
