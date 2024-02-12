import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMatStepperComponent } from './custom-mat-stepper.component';
import { CustomMatStepperHeaderComponent } from './custom-mat-stepper-header/custom-mat-stepper-header.component';
import { CustomMatStepComponent } from './custom-mat-step/custom-mat-step.component';
import { CustomMatStepLastButtonComponent } from './custom-mat-step-last-button/custom-mat-step-last-button.component';

@NgModule({
  declarations: [
    CustomMatStepperComponent,
    CustomMatStepperHeaderComponent,
    CustomMatStepComponent,
    CustomMatStepLastButtonComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CustomMatStepperComponent,
    CustomMatStepperHeaderComponent,
    CustomMatStepComponent,
    CustomMatStepLastButtonComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomMatStepperModule { }
