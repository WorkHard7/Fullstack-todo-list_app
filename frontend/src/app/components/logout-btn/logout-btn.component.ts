import {Component} from '@angular/core';
import {logoutIcon} from "@progress/kendo-svg-icons";
import {UsersAuthService} from "../../services/users-auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-logout-btn',
  templateUrl: './logout-btn.component.html',
  styleUrls: ['./logout-btn.component.scss']
})
export class LogoutBtnComponent {
  logOutBtn: boolean = false;
  protected readonly logoutIcon = logoutIcon;

  constructor(private authUser: UsersAuthService) {
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
