import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public router: Router) {
  }

  isSignupLoginOrWelcomePage(): boolean {
    return this.router.url === '/signup' || this.router.url === '/login' || this.router.url === '/';
  }
}
