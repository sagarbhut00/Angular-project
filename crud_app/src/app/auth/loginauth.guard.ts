import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { ApputilityService } from '../apputility.service';

@Injectable({
  providedIn: 'root'
})
export class LoginauthGuard implements CanActivate {

  constructor(private appservice: ApputilityService,
    private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.appservice.user.pipe(
      take(1),
      map(user => {
        if (user) {
          return this.router.createUrlTree(['/home']);
        }
        return true;
      })
    );
  }

}
