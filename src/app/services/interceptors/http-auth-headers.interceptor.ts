import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class HttpAutHeadersInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = environment.sicoob.token;
        const client_id = environment.sicoob.clientId;
        const request = req.clone({
            setHeaders: {
                'Access-Control-Allow-Headers':
                'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`,
                'client_id':client_id
            }
        });
        return next.handle(token ? request : req);
    }
}    
