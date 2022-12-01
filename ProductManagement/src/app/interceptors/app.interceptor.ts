import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service/auth.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(private authservice: AuthService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let temp = this.authservice.getToken();
        let token = localStorage.getItem('Token');

        if (!temp) {
            return next.handle(req);
        } else {
            const modifiedReq = req.clone({
                setHeaders: {
                    "authorization": 'Bearer ' + token
                }
            })
            return next.handle(modifiedReq);
        }
    }
}