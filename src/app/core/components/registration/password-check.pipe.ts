import { Pipe, PipeTransform } from '@angular/core';

// Interfaces for password strength and conditions
export interface PasswordConditions {
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumeric: boolean;
  hasSpecial: boolean;
  isValidLength: boolean;
}

export interface PasswordStrength {
  level: 'Very Weak' | 'Weak' | 'Medium' | 'Strong';
  conditions: PasswordConditions;
}

@Pipe({
  name: 'passwordCheck',
  standalone: true
})
export class PasswordCheckPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    const conditions: PasswordConditions = {
      hasUpperCase: /[A-Z]/.test(value),
      hasLowerCase: /[a-z]/.test(value),
      hasNumeric: /[0-9]/.test(value),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      isValidLength: value.length >= 8
    };

    const validConditionsCount = [conditions.hasUpperCase, conditions.hasLowerCase, conditions.hasNumeric, conditions.hasSpecial].filter(Boolean).length;

    let strength: PasswordStrength;

    if (!conditions.isValidLength) {
      strength = { level: 'Very Weak', conditions };
    } else {
      switch (validConditionsCount) {
        case 4:
          strength = { level: 'Strong', conditions };
          break;
        case 3:
          strength = { level: 'Medium', conditions };
          break;
        case 2:
          strength = { level: 'Weak', conditions };
          break;
        default:
          strength = { level: 'Very Weak', conditions };
      }
    }

    return strength.level;
  }
}
