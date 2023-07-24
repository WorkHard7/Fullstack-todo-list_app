import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersAuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
  }

  signup(name: string, email: string, password: string, password_confirmation: string) {
    const headers = this.makeAuthenticatedRequest();

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
        localStorage.setItem('username', name);

        this.router.navigate(['/todos']);
      },
      error: (err) => {
        console.error('Error occurred during signup: ', err);
        window.location.reload();
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
        console.log('response upon login: ', response);
        const now = new Date();
        now.setHours(now.getHours() + 2);

        const token = response['authorisation'].token;
        console.log('token', token);
        console.log('expiration time', now);

        this.cookieService.set('token', token, now, '/');
        this.router.navigate(['/todos'])
      },
      error: (err) => {
        if (err.status === 401) {
          localStorage.setItem('errorMessage', 'Invalid credentials!');
          window.location.reload();
        }
      },
    })
  }

  logout(): void | Observable<any> {
    const headers = this.makeAuthenticatedRequest();

    if (!headers) {
      this.router.navigate(['/login']);
      return of([]);
    }

    this.http.post('http://localhost:8080/api/users/logout', {}, {headers}).subscribe({
      next: (response: any) => {
        this.cookieService.delete('token');
        localStorage.removeItem('username');

        this.router.navigate(['/login']);
      }
    })
  }

  makeAuthenticatedRequest(): HttpHeaders | undefined {
    const token = this.cookieService.get('token');

    console.log('token?', token);

    if (!token) {
      return undefined;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return headers;
  }
}
