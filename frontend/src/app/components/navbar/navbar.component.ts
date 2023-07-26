import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {menuIcon} from "@progress/kendo-svg-icons";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  listIcon = menuIcon;

  constructor(private router: Router) {
  }

  isSignupOrLoginPage(): boolean {
    return this.router.url === '/signup' || this.router.url === '/login';
  }

  isSignupOrLoginPageOrTodos(): boolean {
    return this.router.url === '/signup' || this.router.url === '/login' || this.router.url === '/todos';
  }
}
