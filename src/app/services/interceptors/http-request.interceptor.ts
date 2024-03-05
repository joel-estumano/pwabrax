import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { LoadingService } from '../http/loading.service';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  private totalRequests = 0;

  constructor(private loadingService: LoadingService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.loadingService.setLoading(true);
    return next
      .handle(req)
      .pipe(
        catchError((error: any) => {
          return throwError(() => error);
        }),
        finalize(() => {
          this.totalRequests--;
          if (this.totalRequests == 0) {
            this.loadingService.setLoading(false);
          }
        })
      ).pipe(
        map((event: any) => {
          if (event instanceof HttpResponse) {
            //
          }
          return event;
        })
      );
  }
}