import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Bugdet } from 'src/app/interfaces/budget';

@Component({
  selector: 'app-dynamic-contract',
  templateUrl: './dynamic-contract.component.html',
  styleUrls: ['./dynamic-contract.component.scss'],
})
export class DynamicContractComponent implements OnInit {
  @Input() call: Bugdet;
  currentDate: Date;
  endDate: Date;
  formattedDate: string;

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    this.currentDate = new Date();
    this.endDate = new Date();
    this.endDate.setMonth(this.currentDate.getMonth() + 12);
    this.formattedDate = this.getFormattedDate(this.currentDate);
  }

  getFormattedPrice(price: string): string {
    const numericPrice = parseFloat(price.replace(',', '.'));
    return !isNaN(numericPrice)
      ? numericPrice.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : price;
  }

  getFormattedDate(date: Date): string {
    const formattedDate =
      this.datePipe.transform(date, "dd 'de' MMMM 'de' yyyy", 'pt-BR') || '';
    return this.capitalizeFirstLetterOfMonth(formattedDate);
  }

  capitalizeFirstLetterOfMonth(dateString: string): string {
    const parts = dateString.split(' ');
    if (parts.length === 5) {
      parts[2] = parts[2].charAt(0).toUpperCase() + parts[2].slice(1);
      return parts.join(' ');
    }
    return dateString;
  }

  getValorTotal(): number {
    if (this.call && this.call.products) {
      return this.call.products.reduce((total, item) => {
        // Remova espaços em branco e substitua vírgulas por pontos
        const price = parseFloat(
          item.product.price.replace(/\s/g, '').replace(',', '.')
        );
        // Verifique se o valor é um número válido antes de somar
        if (!isNaN(price)) {
          return total + price;
        }
        return total;
      }, 0);
    }
    return 0;
  }
}
