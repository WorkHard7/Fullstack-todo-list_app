import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {catchError, EMPTY, Observable, of} from "rxjs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class UsersAuthService {
  name: string = '';
  email: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService
  ) {
  }

  signup(name: string, email: string, password: string, password_confirmation: string) {
    const headers = this.userService.makeAuthenticatedRequest();

    const body = {
      'name': name,
      'email': email,
      'password': password,
      'password_confirmation': password_confirmation
    }

    this.http.post('http://localhost:8080/api/users/signup', body, {headers}).subscribe({
      next: (response: any) => {
        const now = new Date();
        now.setHours(now.getHours() + 2);
        const token = response['authorisation'].token;

        this.cookieService.set('token', token, now, '/');
        this.userService.setUsername(response['user'].name);

        this.router.navigate(['/todos']);
      },
      error: (err) => {
        if (err.status === 409) {
          localStorage.setItem('errorMessage', err.error.message);

          console.error('Validation error, ', err.error);
          window.location.reload();
        }
      }
    });
  }

  login(email: string, password: string) {
    const body = {
      'email': email,
      'password': password
    }

    this.http.post('http://localhost:8080/api/users/login', body).subscribe({
      next: (response: any) => {
        const now = new Date();
        now.setHours(now.getHours() + 2);

        const token = response['authorisation'].token;
        this.userService.setUsername(response['user'].name);

        this.cookieService.set('token', token, now, '/');
        this.router.navigate(['/todos'])
      },
      error: (err) => {
        localStorage.setItem('errorMessage', 'Invalid credentials!');
        window.location.reload();
      },
    })
  }

  logout(): void | Observable<any> {
    const headers = this.userService.makeAuthenticatedRequest();

    if (!headers) {
      this.router.navigate(['/login']);
      return of([]);
    }

    this.http.post('http://localhost:8080/api/users/logout', {}, {headers}).subscribe({
      next: (response: any) => {
        this.cookieService.delete('token');
        this.userService.setUsername('');

        this.router.navigate(['/']);
      }
    })
  }

  tokenValidation(headers: HttpHeaders): Observable<boolean | any> {
    return this.http.post('http://localhost:8080/api/token/check', {}, {headers})
      .pipe(
        catchError((err) => {
          console.error('An error occurred while validating token', err);
          return of(false);
        })
      )
  }
}
