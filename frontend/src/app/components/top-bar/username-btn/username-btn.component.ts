import {Component} from '@angular/core';
import {userIcon} from "@progress/kendo-svg-icons";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {Utils} from "../../../utils/utils";

@Component({
  selector: 'app-username-btn',
  templateUrl: './username-btn.component.html',
  styleUrls: ['./username-btn.component.scss']
})
export class UsernameBtnComponent extends Utils{
  username: string = '';
  loading: boolean = false;
  protected readonly userIcon = userIcon;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    super();
    console.log('username: ', this.username);

    this.userService.username$.subscribe((username) => {
      console.log('username: ', username);

      this.username = username;
    });
  }

  navigateToUserProfile() {
    if (this.router.url !== '/profile') {
      this.loading = true;
      this.setLowerOpacity();
      this.router.navigate(['/profile']);
    }
  }
}
