import { Component } from '@angular/core';
import { TermClass } from 'src/app/classes/terms/terms';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage {
  accept;
  constructor(public termClass: TermClass) {}
}
