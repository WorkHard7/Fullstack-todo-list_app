import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {CookieService} from "ngx-cookie-service";

export const SignupAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const cookiesService = inject(CookieService);

  const token = cookiesService.get('token');

  if (token) {
    router.navigate(['todos']);
    return false;
  } else {
    return true;
  }
}
