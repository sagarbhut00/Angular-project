import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service/auth.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SigninGuard implements CanActivate {
  constructor(private authservice: AuthService,
              private router: Router,
              public location: Location) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authservice.getToken()) {
      return this.router.navigate(['dashboard']);
      // this.location.back();
    }
    return true;
  }

}