import { Injectable } from '@angular/core';
import { CacheService } from '../cache/cache.service';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  breadcrumbs: Array<{
    name: string;
    path: string;
  }> = [];

  constructor(private cache: CacheService) {}

  init() {
    // this.clear();
    this.breadcrumbs = [
      {
        name: 'Home',
        path: 'home',
      },
    ];
  }

  async add(item: { name: string; path: string }, upper = false) {
    const current = await this.cache.get('breadcrumbs');
    if (!current || current.length === 0 || upper) {
      this.init();
    } else {
      this.breadcrumbs = current;
    }

    this.breadcrumbs = this.breadcrumbs.filter((breadcrumb) => {
      return breadcrumb.path !== item.path;
    });

    this.breadcrumbs.push(item);

    this.cache.set('breadcrumbs', this.breadcrumbs);
  }

  private clear() {
    this.breadcrumbs = [];
  }
}
