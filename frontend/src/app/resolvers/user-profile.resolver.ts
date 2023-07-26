import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {catchError, EMPTY, map, Observable} from 'rxjs';
import {UserService} from "../services/user.service";

export const UserProfileResolver: ResolveFn<Observable<any>> = () => {
  const userService = inject(UserService);

  return userService.getUserProfile()
    .pipe(
      map((response: any) => {
        return response.user;
      }),
      catchError((error: any) => {
        return EMPTY;
      })
    );
}
