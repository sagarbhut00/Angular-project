import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SigninGuard implements CanActivate {
  constructor(private authservice: AuthService,
    private router: Router) {
  }

  canActivate() {
    if (this.authservice.getToken()) {
      this.router.navigate(['/dashboard']);
    }
    return true;
  }

}