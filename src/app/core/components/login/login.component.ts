import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginService } from '../../services/Login/login.service';

import { loginPageTexts, loginPageImages } from './text';
import { DangerComponent } from "../../../shared/Email and Pass Required/danger.component";
import { PreloadComponent } from "../../../shared/create-event-preload/preload.component";
import { LoginPreloadComponent } from "../../../shared/login-preload/login-preload.component";


@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [
        ReactiveFormsModule,
        CommonModule, RouterLink,
        RegistrationComponent,
        CommonModule,
        ForgotPasswordComponent,
        DangerComponent,
        PreloadComponent,
        LoginPreloadComponent
    ]
})




export class LoginComponent {


  loginPageTexts = loginPageTexts
  loginPageImages = loginPageImages


  Login: FormGroup;
  data: any;
  // errormessage: string = "provide valid credentials";
  isError: boolean = false;
  isFailed: boolean = false;
  isSubmitted: boolean = false;
  loading: boolean = false;


  constructor(private login: LoginService, private router: Router) {
    this.Login = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)])
    });
  }


  onSubmit() {
    if (this.Login.valid) {
      const postData = this.Login.value;
      this.loading = true;
      this.login.login(postData).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          alert('Login successful');
          this.loading = false;
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('Token', response.access_token);
          localStorage.setItem('fullName', response.fullName);


          if (response.userRole === "ADMIN") {
            this.router.navigateByUrl('/admin-dash');
          } else if (response.userRole === "ORGANIZER") {
            this.router.navigateByUrl('/org-dash');
          } else {
            console.error('Unknown user role:', response.userRole);
            this.router.navigateByUrl('/login');
          }
        },
        error: (error) => {
          this.loading = false;
          this.isError = true;
          console.error('Error logging in:', error);
          if (error && error.error && error.error.businessErrorDescription === "Login and password is incorrect") {

            alert('Login or password is incorrect');
          } else if (error && error.error && error.error.businessErrorDescription === "User account is locked") {
            alert('User account is locked, click on forgot password');
          } else {
            // alert('An error occurred while logging in');
            this.isFailed = true;
          }
        }
      });
    } else {
      this.isError = true;
      this.loading = false;
    }
  }



  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  Signup(){
    this.router.navigate(['/signup']);
  }


  forgot(){
    this.router.navigate(['/forgot']);
  }


  Home(){
    this.router.navigate(['/']);
  }



}
