import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() res;
  @Input() currentPage = 0;
  @Input() start = 0;
  @Input() tabs = [];
  @Output() pageChange = new EventEmitter();
  constructor() {}

  changePage(event) {
    this.pageChange.emit(event);
  }
}
