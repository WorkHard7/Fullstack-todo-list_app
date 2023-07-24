import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {

  constructor(private cookiesService: CookieService, private router: Router) {
  }

  canActivate(): boolean {
    const token = this.cookiesService.get('token');

    if (token) {
      this.router.navigate(['todos']);
      return false;
    } else {
      return true;
    }
  }
}
