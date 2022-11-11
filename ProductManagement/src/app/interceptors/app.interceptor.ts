import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('Token');

        if (!token) {
            return next.handle(req);
        }
        const modifiedReq = req.clone({
            setHeaders: {
                "authorization": 'Bearer ' + token
            }
        })
        return next.handle(modifiedReq);
    }
}