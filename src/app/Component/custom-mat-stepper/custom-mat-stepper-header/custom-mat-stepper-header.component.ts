import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'custom-mat-stepper-header',
  templateUrl: './custom-mat-stepper-header.component.html',
  styleUrls: ['./custom-mat-stepper-header.component.scss']
})
export class CustomMatStepperHeaderComponent implements OnInit {
  @Input('CUSTOM_MATSTEP_LABEL') CUSTOM_MATSTEP_LABEL: string = '';
  @Input('COUNTER') COUNTER: number = 1;
  @Input('ActiveClass') ActiveClass: boolean = false;
  @Input('DisabledClass') DisabledClass: boolean = false;
  @Output('event') event: any = new EventEmitter();
  CHANGE_EVENT_ID: any = 0;

  onTabChanges(value: any) {
    this.event.emit({ counter: this.COUNTER, name: value });
  }
  ngOnInit(): void {

  }
}
