import {inject, Injectable} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {UsersAuthService} from "../services/users-auth.service";

@Injectable({
  providedIn: 'root'
})
class AuthGuard {

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private authService: UsersAuthService
  ) {
  }

  canActivate(): boolean | Observable<any> {
    const token = this.cookieService.get('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

      return this.authService.tokenValidation(headers)
        .pipe(
          catchError(() => {
            this.cookieService.delete('token');
            this.router.navigate(['/login']);
            return of(false);
          })
        );
    } else {
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}

export const isAuthGuard: CanActivateFn = () => {
  return inject(AuthGuard).canActivate();
}
