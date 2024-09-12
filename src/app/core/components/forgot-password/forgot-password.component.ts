import { ForgotpasswordService } from './../../services/forgot password/forgotpassword.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { NotFoundComponent } from '@component/Forgot/not-found/not-found.component';
import { ErrorComponent } from '@component/signup-error-handling/error/error.component';
import { SuccessComponent } from '@component/success/success.component';
import { ErrorResponse, PasswordResetResponse } from '@interface/forgot password/forgot-password';
import { NotificationService } from '@notifications//notification.service';
import { PageResponse } from '@interface/registration/login-register';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NotFoundComponent,
    ErrorComponent,
    SuccessComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  ForgotPassword: FormGroup;
  isSubmitted: boolean = false;
  userEmail: any;
  error: boolean = false;
  notFound: boolean = false;
  isInvalid: boolean = false;

  success = "Email sent successfully";
  notFoundMessage = "Failed to Respond";
  errorMessage = "Field is required";
  serverErrorMessage = "Server is down. Please try again later.";
  isServer: boolean = false;

  constructor(private forgotpasswordService: ForgotpasswordService, private router: Router, private notificationService: NotificationService) {
    this.ForgotPassword = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    if (this.ForgotPassword.valid) {
      const email = this.ForgotPassword.value.email;
      this.userEmail = email;
      sessionStorage.setItem(environment.RESET_EMAIL, email);

      this.forgotpasswordService.ForgotPassword(this.ForgotPassword.value).subscribe({
        next: (response: PasswordResetResponse) => {

          this.notificationService.showSuccess('Email sent successful');
            setTimeout(() => {
              this.router.navigateByUrl('/reset-password-token');
            }, 2000);

        },
        error: (error: HttpErrorResponse) => {
          const pageResponse: PageResponse = error.error;
          this.notificationService.showError(pageResponse.message);

        }
      });
    } else {
      this.error = true;
      sessionStorage.removeItem('forgotEmail');
      this.isInvalid = !this.isInvalid;
    }
  }

  Login() {
    this.router.navigate(['/login']);
  }
  Home(){
    this.router.navigate(['']);

  }
}
