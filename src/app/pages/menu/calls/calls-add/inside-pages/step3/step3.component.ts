import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductClass } from 'src/app/classes/product/products';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss'],
})
export class Step3Component {
  @Input() call;
  @Output() addProductEvent = new EventEmitter();
  @Output() removeProductEvent = new EventEmitter();

  constructor(public products: ProductClass) {}

  addProduct(event) {
    this.addProductEvent.emit(event);
  }

  removeProduct(event) {
    this.removeProductEvent.emit(event);
  }
}
