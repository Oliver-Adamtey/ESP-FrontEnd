
import { Validators } from "@angular/forms";

export interface signupForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export const SignupFormValidators = {
  fullName: [Validators.required, Validators.minLength(6)],
  email: [Validators.required, Validators.email],
  password: [Validators.required, Validators.minLength(8)],
  confirmPassword: [Validators.required, Validators.minLength(8)],
  role: [Validators.required]
};

export interface SignupResponse {


}

export interface SignupError {
  
  error: {
    businessErrorDescription: string;

  };
}

