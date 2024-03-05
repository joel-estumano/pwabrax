import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading = new Subject<boolean>();

  constructor() {}

  setLoading(itsLoading: boolean) {
    this.loading.next(itsLoading);
  }

  public getObs(): Observable<boolean> {
    return this.loading.asObservable();
  }
}