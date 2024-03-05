import { TestBed } from '@angular/core/testing';

import { SicoobService } from './sicoob.service';

describe('SicoobService', () => {
  let service: SicoobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SicoobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
