import {Component} from '@angular/core';
import {menuIcon} from "@progress/kendo-svg-icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
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
