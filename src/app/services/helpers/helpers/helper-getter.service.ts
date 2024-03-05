import { Injectable } from '@angular/core';
import { ScreenService } from '../../screen/screen.service';
import { TranslateService } from '../../translate/translate.service';
import { CacheService } from '../../cache/cache.service';
import { CrudService } from '../../firebase/crud/crud.service';
import { PaginationService } from '../../pagination/pagination.service';

@Injectable({
  providedIn: 'root',
})
export class HelperGetterService {
  constructor(
    public crud: CrudService,
    public cache: CacheService,
    public screen: ScreenService,
    public translate: TranslateService,
    public pagination: PaginationService
  ) {}
}
