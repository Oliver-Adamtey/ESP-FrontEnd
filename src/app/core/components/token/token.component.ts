import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '@services/token/token.service';
import { environment } from '@environments/environment';
import { ErrorComponent } from "@component/signup-error-handling/error/error.component";
import { SuccessComponent } from "@component/login-error-handling/success/success.component";
import { NotificationService } from '@notifications//notification.service';
import { PageResponse } from '@interface/registration/login-register';

@Component({
    selector: 'app-token',
    standalone: true,
    templateUrl: './token.component.html',
    styleUrl: './token.component.css',
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterLink,
        FormsModule,
        ErrorComponent,
        SuccessComponent
    ]
})
export class TokenComponent {


  tokenForm: FormGroup;
  isSubmitted: boolean = false;
  userEmail: string | null;
  tokenInput?: number

  isUnauthorized: boolean = false;
  isToken: boolean = false;
  isExpired: boolean = false
  invalidToken: boolean = false
  isEmail: boolean = false
  isError: boolean = false

  success: string = 'OTP Verfied successfully'
  expired: string = 'Expired Token'
  errorMessage: string = 'Invalid Token'
  enterValue: string = 'Enter Token key'
  invalid: string = 'Enter Token key'
  Error: string = 'Server is down. Please try again late'





  emailRequired: string = 'Email is not Provided '

  constructor(private tokenservice: TokenService, private router: Router,   private notificationService: NotificationService,
  ) {
    this.tokenForm = new FormGroup({
      token: new FormControl("", [Validators.required]),

    });

    this.userEmail = sessionStorage.getItem(environment.RESET_EMAIL);


  }

  onSubmit() {
    const token = parseInt(this.tokenForm.value.token);

    const data = {
        otp: token,
        email: this.userEmail
    };

    console.log(data);

    if (!this.tokenForm.get('token')?.value) {
        this.isToken = true;
        return;
    }

    if(!this.tokenForm.valid){
alert('Token field');
    }

    if (this.tokenForm.valid) {


        if (this.userEmail) {
            this.tokenservice.sendTokenData(data).subscribe({
                next: (response: any) => {
                    this.notificationService.showSuccess('Token sent successfully');
                    setTimeout(() => {
                      this.router.navigateByUrl('/reset');
                    }, 2000);
                },
                error: (error: HttpErrorResponse) => {
                  const pageResponse: PageResponse = error.error;
                  this.notificationService.showError(pageResponse.message);

                }
            });
        } else {
            console.error('User email is not provided.');
            this.isEmail = true;
        }
    } else {

    }
}







}







