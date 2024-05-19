import { ForgotpasswordService } from './../../services/forgot password/forgotpassword.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  ForgotPassword: FormGroup;
  isSubmitted: boolean =  false;
  userEmail: any;
  error: boolean = false;

  constructor(private forgotpasswordService: ForgotpasswordService, private router: Router) {
    this.ForgotPassword = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    if (this.ForgotPassword.valid) {
        this.isSubmitted = true;
        const email = this.ForgotPassword.value.email;

        this.userEmail = email;
        localStorage.setItem(environment.RESET_EMAIL, email);

        this.forgotpasswordService.ForgotPassword(this.ForgotPassword.value).subscribe({
            next: (response: any) => {
                console.log('Password reset successful', response);
                if (response.status === 200) {
                    alert('Email sent successfully');
                    this.router.navigateByUrl('/reset-password-token');
                } else {
                    console.error('Unexpected status code:', response.status);
                }
            },
            error: (error: any) => {
                console.error('Error:', error);
                if (error.error && error.error.businessErrorDescription === "Internal error, contact the Admin") {
                    alert("Token sent check your email address");
                } else {
                  alert('Email sent successfully');
                  this.router.navigateByUrl('/reset-password-token');
                  // alert('Error occurred');


                }
            }
        });
    } else {
        alert('Email is required and must be valid.');
    }
}

  Login(){
    this.router.navigate(['/login']);
  }

}
