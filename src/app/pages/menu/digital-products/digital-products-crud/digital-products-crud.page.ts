import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductClass } from 'src/app/classes/product/products';
import { Products } from 'src/app/interfaces/products';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-digital-products-crud',
  templateUrl: './digital-products-crud.page.html',
  styleUrls: ['./digital-products-crud.page.scss'],
})
export class DigitalProductsCrudPage {
  public id;
  product: Products = {
    title: '',
    type: '',
    price: '',
    description: '',
  };
  constructor(
    public products: ProductClass,
    private navigation: NavigationService,
    private screen: ScreenService,
    private route: ActivatedRoute,
    private breadcrumb: BreadcrumbService,
    private menu: MenuService
  ) {
    this.route.queryParams.subscribe(async (params: any) => {
      this.id = params.params;
      if (this.id) {
        this.product = this.products.find(this.id) ? this.products.find(this.id) : await this.products.getHttp(this.id);
      }

      if (this.id && !this.product)
        return this.navigation.goTo('digital-products');
    });
  }

  ionviewWillEnter() {
    this.menu.items.forEach((e) => {
      e.selected = e.name == 'Produtos Digitais';
    });

    this.breadcrumb.add({ name: 'Novo', path: 'digital-products-crud' });
  }

  selectType(event) {
    this.product.type = event.detail.value;
  }

  goBack() {
    this.navigation.goTo('digital-products');
  }

  async send() {
    await this.screen.presentLoading();
    if (this.id) {
      await this.products.update(this.product, this.id).then(() => {
        this.products.setClassAll<Products>().then((res) => {
          this.products.fill(res);
          this.products.value = res;
          this.products.makeData(res);
          this.screen.dismissLoading();
          this.navigation.goTo('digital-products');
        });
      });
    } else {
      await this.products.add(this.product).then(() => {
        this.products.setClassAll<Products>().then((res) => {
          this.products.makeSet(res);
          this.screen.dismissLoading();
          this.navigation.goTo('digital-products');
        });
      });
    }
  }
}
