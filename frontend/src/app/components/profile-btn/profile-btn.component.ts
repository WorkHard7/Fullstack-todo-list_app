import {Component} from '@angular/core';
import {userIcon} from "@progress/kendo-svg-icons";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-profile-btn',
  templateUrl: './profile-btn.component.html',
  styleUrls: ['./profile-btn.component.scss']
})
export class ProfileBtnComponent {
  username: string = '';
  protected readonly userIcon = userIcon;

  constructor(private userService: UserService) {
    console.log('username: ', this.username);

    this.userService.username$.subscribe((username) => {
      console.log('username: ', username);

      this.username = username;
    });
  }

}
