import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard {

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
