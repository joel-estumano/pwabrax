import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  limit = 10;
  constructor() {}

  getPagesLength(res: Array<any>, limit) {
    const pages = (res?.length + 1) / limit;
    return Math.ceil(pages);
  }

  getPage(res: Array<any>, page = 1, limit) {
    const limitter = limit;
    const start = page * limitter - limitter;
    const index = page * limitter;
    const data = res.slice(start, index);
    return data;
  }

  makeData(res, limit = this.limit) {
    const pages: any = [];
    const pagesLenght = this.getPagesLength(res, limit);
    let currentPage = 1;
    while (pagesLenght >= currentPage) {
      const page = this.getPage(res, currentPage, limit);
      if (page.length > 0) pages.push(page);
      currentPage++;
    }
    return pages;
  }

  generateTabs(currentPage, pagesLenght) {
    const tabs: any = [];
    let start = currentPage - 2;
    let end = currentPage + 2;

    if (start < 1) {
      end += Math.abs(start) + 1;
      start = 1;
    }

    if (end > pagesLenght) {
      start -= end - pagesLenght;
      end = pagesLenght;
    }
    if (start < 1) start = 1;

    for (let i = start; i <= end; i++) {
      tabs.push(i);
    }
    return tabs;
  }
}
