import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CustomModelComponent } from './custom-model/custom-model.component';
import { CustomModelHeaderComponent } from './custom-model/custom-model-header/custom-model-header.component';
import { CustomMatAccordionComponent } from './custom-mat-accordion/custom-mat-accordion.component';
import { CustomMatExpansionPanelComponent } from './custom-mat-accordion/custom-mat-expansion-panel/custom-mat-expansion-panel.component';
import { CustomMatPanelDescriptionComponent } from './custom-mat-accordion/custom-mat-panel-description/custom-mat-panel-description.component';
import { LoggerInfoService } from './logger-info/logger-info.service';
import { NeumorphismTemplateComponent } from './neumorphism-template/neumorphism-template.component';
import { TermsConditionTemplateComponent } from './terms-condition-template/terms-condition-template.component';
import { CustomMatStepperModule } from './custom-mat-stepper/custom-mat-stepper.module';
import { UploadServiceValidatorService } from './form-components/Upload/service/upload-service-validator.service';
import { GlobalsAccessService } from './form-components/Upload/service/globals-access.service';

@NgModule({
  declarations: [
    CustomModelComponent,
    CustomModelHeaderComponent,
    CustomMatAccordionComponent,
    CustomMatExpansionPanelComponent,
    CustomMatPanelDescriptionComponent,
    NeumorphismTemplateComponent,
    TermsConditionTemplateComponent
  ],
  imports: [
    CommonModule,
    CustomMatStepperModule
  ],
  providers:[LoggerInfoService,UploadServiceValidatorService,GlobalsAccessService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [
    CustomModelComponent,
    CustomModelHeaderComponent,
    CustomMatAccordionComponent,
    CustomMatExpansionPanelComponent,
    CustomMatPanelDescriptionComponent,
    TermsConditionTemplateComponent,
    CustomMatStepperModule,
  ]
})
export class CustomComponentModule { }
