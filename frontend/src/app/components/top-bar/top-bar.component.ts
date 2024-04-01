import {Component} from '@angular/core';
import {homeIcon} from "@progress/kendo-svg-icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  homeIcon = homeIcon;

  constructor(private router: Router) {
  }

  isSignupOrLoginPage(): boolean {
    return this.router.url === '/signup' || this.router.url === '/login';
  }

  isSignupOrLoginPageOrTodos(): boolean {
    return this.router.url === '/signup' || this.router.url === '/login' || this.router.url === '/todos';
  }
}
