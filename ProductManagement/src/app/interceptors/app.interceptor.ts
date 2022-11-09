import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

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
        console.log(modifiedReq);
        return next.handle(modifiedReq);
    }
}