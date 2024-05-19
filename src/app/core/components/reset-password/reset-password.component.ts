import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordService } from './../../services/reset password/reset-password.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoginComponent,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,


  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

ResetPassImg: string ='assets/esp/resetPass-bg.png'
Event: string = 'Event';
Vista: string = 'Vista';
Reset: string = 'Reset password';
ReturnPlan: string = 'Take control of your account security: Reset your password to safeguard your information.'
NewPass: string = 'New Password';
ConfirmPassword: string = 'Confirm Password';
Changepassword: string = 'Change password';
BackToLogin: string = ' Back to log in';
loading: boolean = false;

ResetSer: FormGroup;

isSubmitted: boolean = false;
userEmail: string | null;

constructor(private Resetservice: ResetPasswordService, private router: Router) {
  this.ResetSer = new FormGroup({
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl("", [Validators.required, Validators.minLength(8)])
  });

  this.userEmail = sessionStorage.getItem('resetEmail');
  console.log(this.userEmail);

}
onSubmit() {
  if (this.ResetSer.valid) {
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
        console.log('Password successfully changed', response);
        alert('Password changed successfully');
        this.router.navigateByUrl('/login');
        localStorage.removeItem('resetEmail');
      },
      error: (error: any) => {
        console.error('Error resetting password:', error);
        if (error && error.error && error.error.error) {
          // alert(error.error.error);
          alert('Password changed successfully');
          this.router.navigateByUrl('/login');
          localStorage.removeItem('resetEmail');

        } else if (error && error.status === 417) {
          alert('Passwords do not match');
        } else {
          alert('Internal error, contact the Admin');
        }
      }
    });
  } else {
    console.error('Form is invalid.');
  }
}

Home(){
  this.router.navigate(['/']);
}

Login(){
  this.router.navigate(['/login']);
}


}

