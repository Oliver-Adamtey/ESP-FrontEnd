import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../services/token/token.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-token',
  standalone: true,
  imports: [

    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    FormsModule,

  ],
  templateUrl: './token.component.html',
  styleUrl: './token.component.css'
})
export class TokenComponent {


  tokenForm: FormGroup;
  isSubmitted: boolean = false;
  userEmail: string | null;
  tokenInput?: number





  constructor(private tokenservice: TokenService, private router: Router) {
    this.tokenForm = new FormGroup({
      token: new FormControl("", [Validators.required]),

    });

    this.userEmail = localStorage.getItem(environment.RESET_EMAIL);


  }

  onSubmit() {
    const token = parseInt(this.tokenForm.value.token);

    const data= {
        otp: token,
        email: this.userEmail
    };

    console.log(data);

    if (this.tokenForm.valid) {
        this.isSubmitted = true;

        if (this.userEmail) {
            this.tokenservice.sendTokenData(data).subscribe({
                next: (response: any) => {
                    console.log('Token sent successfully:', response);
                    if (response.status === 200) {
                        alert('OTP verified successfully');
                        this.router.navigateByUrl('/reset');
                    } else {
                        console.error('Unexpected status code:', response.status);
                    }
                },


                error: (error: any) => {
                    console.error('Error sending token:', error);
                    if (error && error.status === 200) {
                      alert('Account Activated Successfully');
                      this.router.navigateByUrl('/reset');

                    } else if (error && error.status === 417) {
                        alert('Expired token');
                    }


                    else if (error && error.error && error.error.businessErrorDescription === "Internal error, contact the Admin") {
                        alert('Invalid Token');
                    } else {
                        alert('Internal error, contact the Admin');
                    }
                }
            });
        } else {
            console.error('User email is not provided.');
            alert('User email is not provided')
        }
    } else {
        alert('Token is required.');
    }
}






}







