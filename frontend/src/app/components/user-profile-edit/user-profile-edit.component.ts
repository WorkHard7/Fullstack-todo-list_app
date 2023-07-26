import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent {
  profileForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  private createForm() {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submitProfileForm() {

  }

  passwordIsInvalid(profileForm: FormGroup, controlName: string): boolean {
    const control = profileForm.get(controlName);
    return control ? (control.invalid && control.dirty && control.touched) : false;
  }
}
