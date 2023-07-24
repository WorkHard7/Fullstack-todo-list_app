import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchValue: string = '';

  constructor(public router: Router) {
  }

  searchClick(inputValue: string): void {
    this.searchValue = inputValue;
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isHomePage(): boolean {
    return this.router.url === '/todos';
  }

  isSignupPage(): boolean {
    return this.router.url === '/signup';
  }

  routeNotFound(): boolean {
    return (this.router.url !== '/todos' && this.router.url !== '/login' && this.router.url !== '/signup');
  }
}
