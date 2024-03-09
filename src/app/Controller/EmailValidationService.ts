import { AbstractControl, ValidatorFn } from '@angular/forms';

export class EmailValidationService {

  static pattern(value: any): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && (isNaN(c.value) || !(c?.value)?.test(value))) {
        return { 'Macthed': true };
      }
      return null;
    };
  }

  static LastPatternMatched() {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      const workingEmailValidator = (email: any) => {
        if (email?.indexOf('@') != -1) {
          // 'gmail', 'gmail.com','gmail.co'
          return ['']?.indexOf(email?.split('@')[1])!=-1?true:false
        }
        return false;
      }
      if (c?.value && (isNaN(c.value))) {
        let Bool = workingEmailValidator(c?.value)
        if (Bool) {
          return { 'Macthed': workingEmailValidator(c?.value) };
        }
      }
      return null;
    };
  }
}