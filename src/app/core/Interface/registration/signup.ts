import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export interface signupForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface SignupResponse {


}

export interface SignupError {

  error: {
    businessErrorDescription: string;

  };
}

export const SignupFormValidators = {
  fullName: [Validators.required, Validators.minLength(6)],
  email: [Validators.required, Validators.email],
  password: [Validators.required, Validators.minLength(8), passwordValidator()],
  confirmPassword: [Validators.required, Validators.minLength(8)],
  role: [Validators.required],
  gender: [Validators.required],
  dateOfBirth: [Validators.required],
};

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return { required: true };
    }

    if (!/[A-Z]/.test(value)) {
      return { passwordError: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(value)) {
      return { passwordError: 'Password must contain at least one lowercase letter' };
    }
    if (!/[0-9]/.test(value)) {
      return { passwordError: 'Password must contain at least one number' };
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return { passwordError: 'Password must contain at least one special character' };
    }
    if (value.length < 8) {
      return { passwordError: 'Password must be at least 8 characters long' };
    }

    return null;
  };
}
