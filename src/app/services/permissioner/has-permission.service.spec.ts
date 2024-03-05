import { TestBed } from '@angular/core/testing';

import { HasPermissionService } from './has-permission.service';

describe('HasPermissionService', () => {
  let service: HasPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HasPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
