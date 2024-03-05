import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpAutHeadersInterceptor } from "./http-auth-headers.interceptor";
import { HttpBlockInterceptor } from "./http-block.interceptor";
import { HttpRequestInterceptor } from "./http-request.interceptor";

export const HttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpAutHeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: HttpBlockInterceptor, multi: true },
   // { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
]