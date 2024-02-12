import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'custom-mat-step',
  templateUrl: './custom-mat-step.component.html',
  styleUrls: ['./custom-mat-step.component.scss']
})
export class CustomMatStepComponent implements OnInit {
  @Input('MATSTEP_LABEL') MATSTEP_LABEL: string = ''
  @Input('NextTrue') NextTrue: boolean = false;
  @Input('Form') Form?: FormGroup;
  @Input('FormTrue') FormTrue: any = false;
  @Input('FormIndex') FormIndex: any = -1;
  @Output('FormSubmit') FormSubmit: any = new EventEmitter();
  counter: number = 1;
  @Input('ActivePanel') ActivePanel: boolean = false;
  CHANGE_EVENT_ID: any = 0;
  @Input('errorMessage') errorMessage: any = '';

  constructor() { }

  ngOnInit(): void {
  }

  index(value:any) {
    this.counter = value;
  }

  setActivePanel(value: boolean) {
    this.ActivePanel = value;
  }

  setNextTrue(NextTrue:any) {
    this.NextTrue = NextTrue
  }
  get getFormValidation() {
    return this.Form != undefined ? this.Form?.status == 'VALID' ? true : false : undefined;
  }
}
