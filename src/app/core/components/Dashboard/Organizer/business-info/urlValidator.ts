import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Improved URL Validator Function
export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const urlPattern = /^(https?:\/\/)?((([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,})|localhost)(:\d+)?(\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]*)?$/;
    const isValid = urlPattern.test(control.value);
    return isValid ? null : { invalidUrl: true }; // Return an error object if the URL is invalid
  };
}
