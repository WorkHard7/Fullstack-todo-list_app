import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  constructor(private router: Router) {
  }

  isSignupOrLoginPage(): boolean {
    return this.router.url === '/signup' || this.router.url === '/login';
  }
}
