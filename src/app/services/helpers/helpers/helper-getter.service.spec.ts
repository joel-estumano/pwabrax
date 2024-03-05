import { TestBed } from '@angular/core/testing';

import { HelperGetterService } from './helper-getter.service';

describe('HelperGetterService', () => {
  let service: HelperGetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelperGetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
