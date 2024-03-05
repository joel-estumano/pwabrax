import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { DateService } from 'src/app/services/date/date.service';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss'],
})
export class SubHeaderComponent {
  @Input() title: string;
  page = this.getRouteName();
  today = new Date();

  constructor(
    public breadcrumbs: BreadcrumbService,
    public date: DateService,
    private router: Router
  ) {}

  getRouteName() {
    const route: string = this.router.url.split('/')[1];
    return route.charAt(0).toUpperCase() + route.slice(1);
  }
}
