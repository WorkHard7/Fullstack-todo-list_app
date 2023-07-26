import {Component} from '@angular/core';
import {logoutIcon, userIcon} from "@progress/kendo-svg-icons";
import {UsersAuthService} from "../../services/users-auth.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-logout-btn',
  templateUrl: './logout-btn.component.html',
  styleUrls: ['./logout-btn.component.scss']
})
export class LogoutBtnComponent {
  username: string = '';
  logOutBtn: boolean = false;

  protected readonly logoutIcon = logoutIcon;
  protected readonly userIcon = userIcon;

  constructor(
    private userService: UserService,
    private authUser: UsersAuthService,
    private router: Router) {

    console.log('username: ', this.username);

    this.userService.username$.subscribe((username) => {
      console.log('username: ', username);

      this.username = username;
    });
  }

  logOut() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.logOutBtn = true;
        this.authUser.logout();
      }
    })
  }
}
