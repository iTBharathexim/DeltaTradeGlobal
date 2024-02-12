import { AbstractControl, ValidatorFn } from '@angular/forms';

export class MaxMinValidationService {
   static checkLimit(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        if (c.value && (isNaN(c.value) || c.value?.length < min || c.value?.length > max)) {
            return { 'range': true };
        }
        return null;
    };
  }
}