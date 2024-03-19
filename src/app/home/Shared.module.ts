import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { CustomComponentModule } from '../Component/custom-component.module';
import { CustomConfirmDialogModelComponent } from '../Component/custom-confirm-dialog-model/custom-confirm-dialog-model.component';
import { CustomConfirmDialogModelService } from '../Component/custom-confirm-dialog-model/custom-confirm-dialog-model.service';
import { FormComponentsComponent } from '../Component/form-components/Upload/upload-components/form-components.component';
import { DynamicErrorComponent } from '../Component/form-components/dynamic-error/dynamic-error.component';
import { MoreContentComponent } from '../Component/form-components/Upload/upload-components/more-content/more-content.component';
import { InnerDynamicErrorComponent } from '../Component/form-components/Upload/upload-components/inner-dynamic-error/inner-dynamic-error.component';
import { BusinessEmailValidatorDirective } from '../Controller/business-email-validator.directive';
import { ComponentFocus } from '../Controller/ComponentFocus';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CanvasJSAngularStockChartsModule } from '@canvasjs/angular-stockcharts';
import { MobileValidatorDirective } from '../Controller/mobile-validator.directive';
import { CalendarHeatmapModule } from 'ng-calendar-heatmap';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    CustomConfirmDialogModelComponent,
    FormComponentsComponent,
    DynamicErrorComponent,
    MoreContentComponent,
    InnerDynamicErrorComponent,
    BusinessEmailValidatorDirective,
    ComponentFocus,
    MobileValidatorDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule,
    CustomComponentModule,
    NgApexchartsModule,
    CanvasJSAngularChartsModule,
    CanvasJSAngularStockChartsModule,
    CalendarHeatmapModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule,
    CustomComponentModule,
    CustomConfirmDialogModelComponent,
    FormComponentsComponent,
    DynamicErrorComponent,
    MoreContentComponent,
    InnerDynamicErrorComponent,
    BusinessEmailValidatorDirective,
    MobileValidatorDirective,
    ComponentFocus,
    NgApexchartsModule,
    CanvasJSAngularChartsModule,
    CanvasJSAngularStockChartsModule,
    CalendarHeatmapModule,
    BrowserAnimationsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [CustomConfirmDialogModelService, CustomConfirmDialogModelComponent]
})
export class SharedModule { }
