import { AbstractControl, ValidatorFn } from '@angular/forms';

export class ConfrimPasswordValidationService {

  static matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
        return null;
      }

      if (control!.value !== matchingControl!.value) {
        const error = { confirmedValidator: 'Passwords do not match.' };
        matchingControl!.setErrors(error);
        return error;
      } else {
        matchingControl!.setErrors(null);
        return null;
      }
    }
  }
  static matchValidatorWithMessage(controlName: string, matchingControlName: string,Message:any): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (matchingControl?.errors && !matchingControl?.errors?.['confirmedValidator']) {
        return null;
      }

      if (control?.value !== matchingControl?.value) {
        const error = { confirmedValidator: Message };
        matchingControl?.setErrors(error);
        return error;
      } else {
        matchingControl?.setErrors(null);
        return null;
      }
    }
  }
}