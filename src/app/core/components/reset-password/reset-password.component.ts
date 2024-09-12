import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { ResetPasswordService } from '@services/reset password/reset-password.service';
import { CommonModule } from '@angular/common';
import { InvalidPasswordComponent } from '@component/login-error-handling/invalid-password/invalid-password.component';
import { ErrorComponent } from '@component/signup-error-handling/error/error.component';
import { LoginComponent } from '../login/login.component';
import { SuccessComponent } from "@component/success/success.component";
import { NotificationService } from '@notifications//notification.service';
import { PageResponse } from '@interface/registration/login-register';
import { HttpErrorResponse } from '@angular/common/http';
import { matchPasswords, SignupFormValidators } from '../../utils/validators';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
  imports: [
    CommonModule,
    RouterLink,
    LoginComponent,
    FormsModule,
    ReactiveFormsModule,
    ErrorComponent,
    InvalidPasswordComponent,
    SuccessComponent
  ]
})
export class ResetPasswordComponent {

  ResetPassImg: string = 'assets/esp/resetPass-bg.png';
  Event: string = 'Event';
  Vista: string = 'Vista';
  Reset: string = 'Reset password';
  ReturnPlan: string = 'Take control of your account security: Reset your password to safeguard your information.';
  NewPass: string = 'New Password';
  ConfirmPassword: string = 'Confirm Password';
  Changepassword: string = 'Change password';
  BackToLogin: string = ' Back to log in';
  loading: boolean = false;

  ResetSer: FormGroup;
  isSubmitted: boolean = false;
  userEmail: string | null;

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  success: string = 'Password changed successfully'
  unAthorized: string = 'Unauthorized user'

  required: string = 'All fields are required'
  serverErrorMessage = "Server is down. Please try again later.";


  isError: boolean = false;
  isMatch: boolean = false;
  isRequired: boolean = false;
  isNotFetch: boolean = false;
  isSuccess: boolean = false;

  constructor(private Resetservice: ResetPasswordService, private router: Router, private notificationService: NotificationService
  ) {
    this.ResetSer = new FormGroup({
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        this.passwordPatternValidator(/\d/, { hasDigit: true }),
        this.passwordPatternValidator(/[A-Z]/, { hasUppercase: true }),
        this.passwordPatternValidator(/[a-z]/, { hasLowercase: true }),
        this.passwordPatternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true }),

      ]),
      confirmPassword: new FormControl("", [Validators.required, Validators.minLength(8)]),
      email: new FormControl("")
    },
    { validators: matchPasswords('password', 'confirmPassword') }
  );

    this.userEmail = sessionStorage.getItem('resetEmail');
  }

  passwordsMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  };

  passwordPatternValidator(pattern: RegExp, validatorProps: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!pattern.test(control.value)) {
        return validatorProps;
      }
      return null;
    };
  }


  onSubmit() {
    if (this.ResetSer.invalid) {
      this.ResetSer.get('email')?.patchValue(this.userEmail)
      this.isRequired = true;
      return;
    }

    this.isSubmitted = true;
    const password = this.ResetSer.value.password;
    const confirmPassword = this.ResetSer.value.confirmPassword;

    const data = {
      password: password,
      email: this.userEmail,
      confirmPassword: confirmPassword
    };

    this.loading = true;
    this.Resetservice.ResetPassword(data).subscribe({
      next: (response: any) => {
        this.notificationService.showSuccess('Password reset successful');
        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 1000);
        sessionStorage.removeItem('resetEmail');

      },

      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
        console.log(error);
      },
    });

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  handleError(error: any) {
    if (error && error.error && error.error.businessErrorDescription === "Unauthorized" && error.error.error === "Invalid email") {
      this.isError = true;
    } else if (error && error.status === 417) {
      this.isMatch = true;
    } else if (error && error.error && error.error.error) {
      alert('An error occurred: ' + error.error.error);
    } else {
      this.isNotFetch = !this.isNotFetch;

    }
  }


  Home() {
    this.router.navigate(['/']);
  }

  Login() {
    this.router.navigate(['/login']);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
