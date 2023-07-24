import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UsersAuthService} from "../../services/users-auth.service";

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
  signupForm!: FormGroup;
  loading = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.createForm();
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: UsersAuthService,
    private router: Router
  ) {
  }

  createForm(): void {
    this.signupForm = this.formBuilder.group({
      name: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^\s*\S.{1,}\S\s*$/)
        ]
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['',
        [
          Validators.required, Validators.minLength(6),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{6,}$/)
        ]
      ],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  passwordDoesNotMatch(signupForm: FormGroup): boolean {
    const passwordControl = signupForm.get('password');
    const repeatPasswordControl = signupForm.get('password_confirmation');

    if (passwordControl?.touched && repeatPasswordControl?.touched) {
      return passwordControl.value !== repeatPasswordControl.value;
    }

    return false;
  }

  submitSignupForm(): void {
    this.loading = true;

    if (this.signupForm.invalid) {
      return;
    }

    const name = this.signupForm.get('name')?.value;
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    const repeatPassword = this.signupForm.get('password_confirmation')?.value;

    this.authService.signup(name, email, password, repeatPassword);
  }

  passwordIsInvalid(myForm: FormGroup): boolean {
    const passwordControl = myForm.get('password');
    return passwordControl ? (passwordControl.invalid && passwordControl?.dirty && passwordControl?.touched) : false;
  }
}