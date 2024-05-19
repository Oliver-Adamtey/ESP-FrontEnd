import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationService } from '../../services/Registration/registration.service';
import { PreloadComponent } from '../../../shared/create-event-preload/preload.component';
import { SignupFormValidators, SignupResponse, SignupError } from '../Interface/registration/signup';

import { signupPageImages, signupPageTexts } from './text';
import { AllFieldComponent } from "../../../shared/All Field/all-field.component";
import { SuccessComponent } from "../../../shared/success/success.component";
import { SignupPreloadComponent } from "../../../shared/signup-preload/signup-preload.component";

@Component({
    selector: 'app-registration',
    standalone: true,
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.css',
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterLink,
        LoginComponent,
        HttpClientModule,
        FormsModule,
        PreloadComponent,
        AllFieldComponent,
        SuccessComponent,
        SignupPreloadComponent
    ]
})


export class RegistrationComponent {

  signupPageImages = signupPageImages
  signupPageTexts = signupPageTexts


  Registration: FormGroup;

  isSubmitted: boolean = false;
  showPassword: boolean = false;
  showPassword1: boolean = false;
  isError: boolean = false;
  isExisting: boolean = false;
  loading: boolean = false;

  constructor(private register: RegistrationService, private router: Router) {
    this.Registration = new FormGroup({
      fullName: new FormControl("", SignupFormValidators.fullName),
      email: new FormControl("", SignupFormValidators.email),
      password: new FormControl("", SignupFormValidators.password),
      confirmPassword: new FormControl("", SignupFormValidators.confirmPassword),
      role: new FormControl("", SignupFormValidators.role),
    });
  }

  onSubmit(): void {
    if (this.Registration.valid) {
      this.loading = true;
      const postData = this.Registration.value;
      this.register.signup(postData).subscribe({
        next: (response: SignupResponse) => {
          console.log('Signup successful', response);
          alert('Successfully signed up, check your email');
          this.isSubmitted = true;
          this.loading = false;
          this.saveFormDataToLocalstorage(postData);
          this.router.navigateByUrl('/login');
        },
        error: (error: SignupError) => {
          console.error('Error creating post:', error);
          if (error.error.businessErrorDescription === "Internal error, contact the Admin") {
            alert('User already exists');
            this.isExisting = true;
            this.loading = false;


          } else {
            console.error('Internal error, contact the Admin');

            this.isError = true;
            this.loading = false;

          }
        }
      });
    } else {
      this.isError = true;
      this.loading = false;

    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  togglePasswordVisibility1(): void {
    this.showPassword1 = !this.showPassword1;
  }

  private saveFormDataToLocalstorage(formData: string): void {
    localStorage.setItem('registrationData', JSON.stringify(formData).toString());

  }

  Login() {
    this.router.navigate(['/login']);
  }

  Home() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {


  }


}





