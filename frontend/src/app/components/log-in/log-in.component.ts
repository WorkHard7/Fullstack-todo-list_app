import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersAuthService} from "../../services/users-auth.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authUser: UsersAuthService
  ) {
  }

  ngOnInit(): void {
    this.getErrorMessageFromLocalStorage();

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submitLoginForm(): void {
    this.loading = true;

    if (this.loginForm.invalid) {
      return;
    }
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authUser.login(email, password);
  }

  private getErrorMessageFromLocalStorage() {
    this.errorMessage = localStorage.getItem('errorMessage');
    localStorage.removeItem('errorMessage');
  }
}
