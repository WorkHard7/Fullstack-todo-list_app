import {inject, Injectable} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
class WelcomePageGuard {

  constructor(
    private cookiesService: CookieService,
    private router: Router
  ) {
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

export const isWelcomePageGuard: CanActivateFn = () => {
  return inject(WelcomePageGuard).canActivate();
}
