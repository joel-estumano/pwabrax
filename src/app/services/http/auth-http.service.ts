import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class AuthHttpService {
    private apiUrl: string = environment.sicoob.apiUrl;

    constructor(private httpClient: HttpClient) { }

    public get(url: string) {
        return this.httpClient.get(`${this.apiUrl}${url}`).pipe(catchError((err) => {
            return this.errorHandler(err);
        }));
    }

    public post(url: string, data: any) {
        return this.httpClient.post(`${this.apiUrl}${url}`, data).pipe(catchError((err) => {
            return this.errorHandler(err);
        }));
    }

    public put(url: string, data: any) {
        return this.httpClient.put(`${this.apiUrl}${url}`, data).pipe(catchError((err) => {
            return this.errorHandler(err);
        }));
    }

    public delete(url: string) {
        return this.httpClient.delete(`${this.apiUrl}${url}`).pipe(catchError((err) => {
            return this.errorHandler(err);
        }));
    }

    private errorHandler(error: HttpErrorResponse) {
        return throwError(error);
    }
}
