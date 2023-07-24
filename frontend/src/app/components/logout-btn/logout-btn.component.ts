import {Component, Input} from '@angular/core';
import {logoutIcon, userIcon} from "@progress/kendo-svg-icons";
import {UsersAuthService} from "../../services/users-auth.service";

@Component({
  selector: 'app-logout-btn',
  templateUrl: './logout-btn.component.html',
  styleUrls: ['./logout-btn.component.scss']
})
export class LogoutBtnComponent {
  @Input() email: string = '';
  logOutBtn: boolean = false;

  protected readonly logoutIcon = logoutIcon;
  protected readonly userIcon = userIcon;

  constructor(private authUser: UsersAuthService) {
    this.email = localStorage.getItem('username')!;
  }

  logOut() {
    this.logOutBtn = true;
    this.authUser.logout();
  }
}
