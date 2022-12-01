import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authservice: AuthService,
    private router: Router) { }

  canActivate(): boolean {
    return this.checkLogin();
  }

  checkLogin() {
    let isSignIn = this.authservice.getToken();
    if (!isSignIn) {
      this.router.navigate(['']);
      return false;
    } else {
      return true
    }
  }
}

