import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UsersAuthService} from "../../services/users-auth.service";

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss']
})
export class LogInFormComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private authUser: UsersAuthService
  ) {
  }

  ngOnInit(): void {
    this.getErrorMessageFromLocalStorage();

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
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

    this.saveUserToLocalStorage(email);
  }

  private saveUserToLocalStorage(email: string) {
    localStorage.setItem('username', JSON.stringify(email));
  }

  private getErrorMessageFromLocalStorage() {
    this.errorMessage = localStorage.getItem('errorMessage');
    localStorage.removeItem('errorMessage');
  }
}
