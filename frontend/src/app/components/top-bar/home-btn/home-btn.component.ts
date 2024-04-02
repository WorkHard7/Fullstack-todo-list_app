import {Component} from '@angular/core';
import {homeIcon} from "@progress/kendo-svg-icons";
import {Router} from "@angular/router";
import {Utils} from "../../../utils/utils";

@Component({
  selector: 'app-home-btn',
  templateUrl: './home-btn.component.html',
  styleUrls: ['./home-btn.component.scss']
})
export class HomeBtnComponent extends Utils{
  homeIcon = homeIcon;
  loading: boolean = false;

  constructor(private router: Router) {
    super();
  }

  isSignupOrLoginPageOrTodos(): boolean {
    return this.router.url === '/signup' || this.router.url === '/login' || this.router.url === '/todos';
  }

  navigateToHomePage() {
    this.loading = true;
    this.setLowerOpacity();

    this.router.navigate(['/todos']);
  }
}
