import {Component, OnInit} from '@angular/core';
import {UsersAuthService} from "../../services/users-auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('closed', style({
        height: '0',
        opacity: '0',
        display: 'none',
      })),
      state('open', style({
        height: '*',
        opacity: '1',
        overflow: 'visible',
      })),
      transition('closed <=> open', animate('300ms ease-out')),
    ]),
  ],
})
export class UserProfileComponent implements OnInit {
  faAngleDown: IconDefinition = faAngleDown;
  faAngleUp: IconDefinition = faAngleUp;

  isNameFormOpen: boolean = false;
  isEmailFormOpen: boolean = false;
  isPasswordFormOpen: boolean = false;

  name: string = '';
  email: string = '';
  errorMessage = null;
  successMessage = null;

  nameForm!: FormGroup;
  emailForm!: FormGroup;
  passwordForm!: FormGroup;

  constructor(
    private authService: UsersAuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.createNameForm();
    this.createEmailForm();
    this.createPasswordForm();
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (response: any) => {
        this.name = response.user.name;
        this.email = response.user.email;
      }
    });
  }

  private createNameForm() {
    this.nameForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  private createEmailForm() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  private createPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [
        Validators.required, Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{6,}$/)
      ]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  changeName() {
    this.isEmailFormOpen = false;
    this.isPasswordFormOpen = false;

    this.isNameFormOpen = !this.isNameFormOpen
  }

  changeEmail() {
    this.isNameFormOpen = false;
    this.isPasswordFormOpen = false;

    this.isEmailFormOpen = !this.isEmailFormOpen;
  }

  changePassword() {
    this.isNameFormOpen = false;
    this.isEmailFormOpen = false;

    this.isPasswordFormOpen = !this.isPasswordFormOpen;
  }

  passwordDoesNotMatch(passwordForm: FormGroup): boolean {
    const passwordControl = passwordForm.get('newPassword');
    const confirmPasswordControl = passwordForm.get('confirmPassword');

    if (passwordControl?.touched && confirmPasswordControl?.touched) {
      return passwordControl.value !== confirmPasswordControl.value;
    }
    return false;
  }

  passwordIsInvalid(passwordForm: FormGroup): boolean {
    const passwordControl = passwordForm.get('newPassword');
    return passwordControl ? (passwordControl.invalid && passwordControl.dirty && passwordControl.touched) : false;
  }

  submitNameForm() {
    if (!this.nameForm.valid) {
      return;
    }

    const name = this.nameForm.get('name')?.value;

    this.userService.changeName(name).subscribe({
      next: (response: any) => {
        this.name = response.user.name;
        this.successMessage = response.message;
        this.nameForm.reset();

        this.setTimeOutForSuccessMessage();
        this.userService.setUsername(this.name);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.setTimeOutForErrorMessage();
      }
    })
  }

  submitEmailForm() {
    if (!this.emailForm.valid) {
      return;
    }

    const email = this.emailForm.get('email')?.value;

    this.userService.changeEmail(email).subscribe({
      next: (response: any) => {
        this.email = response.user.email;
        this.successMessage = response.message;
        this.emailForm.reset();

        this.setTimeOutForSuccessMessage();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.setTimeOutForErrorMessage();
      }
    })
  }

  submitPasswordForm() {
    if (!this.passwordForm.valid) {
      return;
    }

    const oldPassword = this.passwordForm.get('oldPassword')?.value;
    const newPassword = this.passwordForm.get('newPassword')?.value;
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value;
    this.passwordForm.reset();

    this.userService.changePassword(oldPassword, newPassword, confirmPassword).subscribe({
      next: (response: any) => {
        this.successMessage = response.message;

        this.setTimeOutForSuccessMessage();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.setTimeOutForErrorMessage();
      }
    })
  }

  setTimeOutForSuccessMessage() {
    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
  }

  setTimeOutForErrorMessage() {
    setTimeout(() => {
      this.errorMessage = null;
    }, 5000);
  }
}
