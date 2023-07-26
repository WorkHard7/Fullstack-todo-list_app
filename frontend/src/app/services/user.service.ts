import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usernameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public readonly username$ = this.usernameSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.initializeUsernameFromLocalStorage();
  }

  setUsername(username: string) {
    this.usernameSubject.next(username);
    localStorage.setItem('username', username);
  }

  getUserProfile(): Observable<any> {
    const headers = this.makeAuthenticatedRequest();

    if (!headers) {
      this.router.navigate(['/login']);
      return of([]);
    }

    return this.http.get<any>('http://localhost:8080/api/users/profile', {headers});
  }

  changeName(name: string): Observable<any> {
    const headers = this.makeAuthenticatedRequest();

    if (!headers) {
      this.router.navigate(['/login']);
      return of([]);
    }

    const body = {
      'name': name
    }

    return this.http.patch<any>('http://localhost:8080/api/users/profile/edit/name', body, {headers});
  }

  changeEmail(email: string): Observable<any> {
    const headers = this.makeAuthenticatedRequest();

    if (!headers) {
      this.router.navigate(['/login']);
      return of([]);
    }

    const body = {
      'email': email
    }

    return this.http.patch<any>('http://localhost:8080/api/users/profile/edit/email', body, {headers});
  }

  changePassword(password: string, new_password: string, password_confirmation: string): Observable<any> {
    const headers = this.makeAuthenticatedRequest();

    if (!headers) {
      this.router.navigate(['/login']);
      return of([]);
    }

    const body = {
      'password': password,
      'new_password': new_password,
      'new_password_confirmation': password_confirmation
    }

    return this.http.patch<any>('http://localhost:8080/api/users/profile/edit/password', body, {headers});
  }

  makeAuthenticatedRequest(): HttpHeaders | undefined {
    const token = this.cookieService.get('token');

    if (!token) {
      return undefined;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return headers;
  }

  private initializeUsernameFromLocalStorage() {
    const username = localStorage.getItem('username');

    if (username) {
      this.usernameSubject.next(username);
    }
  }
}
