import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UserProfileGuard {

  constructor(private cookiesService: CookieService, private router: Router) {
  }

  canActivate(): boolean {
    const token = this.cookiesService.get('token');

    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
