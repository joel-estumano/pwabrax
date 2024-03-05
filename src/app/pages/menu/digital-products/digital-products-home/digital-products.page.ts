import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductClass } from 'src/app/classes/product/products';
import { Products } from 'src/app/interfaces/products';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-digital-products',
  templateUrl: './digital-products.page.html',
  styleUrls: ['./digital-products.page.scss'],
})
export class DigitalProductsPage implements OnDestroy {
  public search = '';

  constructor(
    public products: ProductClass,
    private navigation: NavigationService,
    private menu: MenuService,
    private breadcrumb: BreadcrumbService
  ) {}

  ionViewWillEnter() {
    this.menu.items.forEach((e) => {
      e.selected = e.name == 'Produtos Digitais';
    });
    this.breadcrumb.add(
      {
        name: 'Produtos Digitais',
        path: 'digital-products',
      },
      true
    );
  }

  ngOnDestroy(): void {
    this.products.reset();
  }

  searching(clear = false) {
    if (clear) this.search = '';
    const searched = this.products.value.filter((e: any) => {
      return (
        e.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
        e.type.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
        e.description.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    });
    this.products.show = searched;
  }

  add() {
    this.navigation.goTo('digital-products-crud');
  }

  edit(event) {
    const id = event.info[0];
    this.navigation.goToParam('digital-products-crud', id);
  }

  del(event) {
    const id = event.info[0];
    this.products.delete(id).then(() => {
      this.products.setClassAll<Products>().then((res) => {
        this.products.makeData(res);
      });
    });
  }
}
