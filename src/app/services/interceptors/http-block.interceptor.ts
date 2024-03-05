import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { CurrentRequestsService } from "../http/current-requests.service";

@Injectable()
export class HttpBlockInterceptor implements HttpInterceptor {
    constructor(private currentRequestsService: CurrentRequestsService) {}

    intercept(
        req: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        if (this.currentRequestsService.canRequest(req)) {
            return next
                .handle(req)
                .pipe(
                    catchError((error: any) => {
                        return throwError(error);
                    }),
                    finalize(() => {
                        this.currentRequestsService.removeRequest(req);
                    })
                )
                .pipe(
                    map((event: any) => {
                        if (event instanceof HttpResponse) {
                        }
                        return event;
                    })
                );
        }
    }
}
