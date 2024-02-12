import { AfterContentInit, Component, ContentChildren, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild } from '@angular/core';
import { CustomMatStepComponent } from './custom-mat-step/custom-mat-step.component';
declare var $: any;

@Component({
  selector: 'custom-mat-stepper',
  templateUrl: './custom-mat-stepper.component.html',
  styleUrls: ['./custom-mat-stepper.component.scss']
})
export class CustomMatStepperComponent implements OnInit, AfterContentInit {
  @Input('data') data: any = [];
  @Input('addClass') addClass: any = '';
  @Input('LAST_BUTTON_NAME') LAST_BUTTON_NAME: any = "";
  @ContentChildren(CustomMatStepComponent) MatStepComponent?: QueryList<CustomMatStepComponent>;
  @ViewChild('MatStepperHeaderPanel') MatStepperHeaderPanel?: ElementRef;
  @ViewChild('AdditionButtonPanel') AdditionButtonPanel?: ElementRef;
  @Output('event') event: any = new EventEmitter();
  @Output('TabEvent') TabEvent: any = new EventEmitter();
  @Output('lastbuttonEvent') lastbuttonEvent: any = new EventEmitter();
  @Input('LAST_BUTTON_VISIBLE') LAST_BUTTON_VISIBLE: boolean = false;
  @Input('BUTTON_PANEL_HIDE') BUTTON_PANEL_HIDE: boolean = true;

  BUTTON_COUNTER: number = 0;
  BACK_BUTTON_DISABLED: boolean = false;
  NEXT_BUTTON_DISABLED: boolean = false;
  HEADER_DATA: any = [];
  ERROR_MESSAGE_SHOW: boolean = false;

  ngAfterContentInit() {
    console.log(this.MatStepperHeaderPanel, this.MatStepComponent, this.AdditionButtonPanel, "MatStepperHeaderPanel")
    if (this.MatStepComponent?.length != 0) {
      this.MatStepComponent?.get(this.BUTTON_COUNTER)?.setActivePanel(true);
      this.MatStepComponent?.forEach((element: any, index) => {
        element?.index((index + 1));
        if (index == 0) {
          element['ActiveClass'] = true;
        } else {
          element['ActiveClass'] = false;
        }
        if (element?.NextTrue == false) {
          element['DisabledClass'] = true;
        } else {
          element['DisabledClass'] = false;
        }
        this.HEADER_DATA.push(element)
      });
      this.TabEvent.emit(this.HEADER_DATA[this.BUTTON_COUNTER]);
    }
    this.addClass=Object.assign(this.addClass,{
      'Padding-0':this.MatStepComponent?.length==1
    })
  }
  constructor() { }

  ngOnInit(): void {
  }


  lastbuttonclick() {
    this.lastbuttonEvent.emit(true);
  }

  setBack() {
    if (this.BUTTON_COUNTER != 0) {
      this.MatStepComponent?.forEach((element: any) => {
        element?.setActivePanel(false);
      });
      this.HEADER_DATA[this.BUTTON_COUNTER]['DisabledClass'] = false;
      this.BUTTON_COUNTER--;
      this.MatStepComponent?.get(this.BUTTON_COUNTER)?.setActivePanel(true);
      this.BACK_BUTTON_DISABLED = false;
      this.NEXT_BUTTON_DISABLED = false
      this.HEADER_DATA?.forEach((element: any) => {
        element['ActiveClass'] = false;
      });
      setTimeout(() => {
        this.HEADER_DATA[this.BUTTON_COUNTER]['ActiveClass'] = true;
        this.HEADER_DATA[this.BUTTON_COUNTER]['DisabledClass'] = false;
      }, 200);
      this.ERROR_MESSAGE_SHOW = false;
      this.BackScrollButton;
    } else {
      this.BACK_BUTTON_DISABLED = true;
      this.HEADER_DATA?.forEach((element: any) => {
        element['ActiveClass'] = false;
      });
      this.MatStepComponent?.forEach(element => {
        element?.setActivePanel(false);
      })
      this.HEADER_DATA[0]['ActiveClass'] = true;
      this.HEADER_DATA[0]['DisabledClass'] = false;
      this.MatStepComponent?.get(0)?.setActivePanel(true);
      this.ERROR_MESSAGE_SHOW = false;
    }
    this.TabEvent.emit(this.HEADER_DATA[this.BUTTON_COUNTER]);
  }

  get ClickBackButton() {
    return $('#CustomMatStepperButton')?.click();
  }

  TIMEOUT_CLEAR: any = null;
  setNext() {
    clearTimeout(this.TIMEOUT_CLEAR);
    if (this.MatStepComponent?.get(this.BUTTON_COUNTER)?.NextTrue == true && (this.MatStepComponent?.get(this.BUTTON_COUNTER)?.getFormValidation == true ||
      this.MatStepComponent?.get(this.BUTTON_COUNTER)?.getFormValidation == undefined)) {
      if (this.BUTTON_COUNTER < this.MatStepComponent?.length && this.BUTTON_COUNTER != (this.MatStepComponent?.length - 1)) {
        this.MatStepComponent?.forEach((element: any) => {
          element?.setActivePanel(false);
        });
        this.HEADER_DATA[this.BUTTON_COUNTER]['DisabledClass'] = false;
        if (this.MatStepComponent?.get(this.BUTTON_COUNTER)?.FormTrue == true && this.MatStepComponent?.get(this.BUTTON_COUNTER)?.getFormValidation == true) {
          this.MatStepComponent?.get(this.BUTTON_COUNTER)?.FormSubmit?.emit({ index: this.BUTTON_COUNTER, status: this.HEADER_DATA[this.BUTTON_COUNTER]['ActiveClass'] })
        }
        this.BUTTON_COUNTER++;
        this.BACK_BUTTON_DISABLED = false;
        this.HEADER_DATA?.forEach((element: any) => {
          element['ActiveClass'] = false;
        });
        this.TIMEOUT_CLEAR = setTimeout(() => {
          this.HEADER_DATA[this.BUTTON_COUNTER]['ActiveClass'] = true;
          this.HEADER_DATA[this.BUTTON_COUNTER]['DisabledClass'] = false;
        }, 100);
        this.MatStepComponent?.get(this.BUTTON_COUNTER)?.setActivePanel(true);
        this.NEXT_BUTTON_DISABLED = false;
        this.NextScrollButton
      } else {
        this.NEXT_BUTTON_DISABLED = true;
        this.BACK_BUTTON_DISABLED = false;
      }
      this.ERROR_MESSAGE_SHOW = false;
    } else {
      if (this.MatStepComponent?.get(this.BUTTON_COUNTER)?.getFormValidation == true) {
        this.MatStepComponent?.get(this.BUTTON_COUNTER)?.FormSubmit?.emit({ index: this.BUTTON_COUNTER, status: this.HEADER_DATA[this.BUTTON_COUNTER]['ActiveClass'] })
        this.MatStepComponent?.get(this.BUTTON_COUNTER)?.setNextTrue(true);
        this.setNext();
      }
      this.ERROR_MESSAGE_SHOW = true;
    }
    this.TabEvent.emit(this.HEADER_DATA[this.BUTTON_COUNTER]);
  }

  onTabChanges(value: any) {
    let tempBUTTON_COUNTER = parseInt(value?.counter) - 1;
    if (this.MatStepComponent?.get(tempBUTTON_COUNTER != 0 ? (tempBUTTON_COUNTER - 1) : 0)?.NextTrue == true) {
      this.BUTTON_COUNTER = parseInt(value?.counter) - 1;
      this.MatStepComponent?.forEach((element: any) => {
        element?.setActivePanel(false);
      });
      this.MatStepComponent?.get(this.BUTTON_COUNTER)?.setActivePanel(true);
      this.HEADER_DATA?.forEach((element: any) => {
        element['ActiveClass'] = false;
      });
      this.ERROR_MESSAGE_SHOW = false;
      setTimeout(() => {
        this.HEADER_DATA[this.BUTTON_COUNTER]['ActiveClass'] = true;
        this.HEADER_DATA[this.BUTTON_COUNTER]['DisabledClass'] = false;
      }, 200);
    } else {
      this.ERROR_MESSAGE_SHOW = true;
    }
    this.TabEvent.emit(value);
  }

  get BackScrollButton() {
    var scrollPos: any = $('.multiple-header-mat-panel')[0];
    $('.multiple-header-mat-panel').animate({ scrollLeft: parseInt(scrollPos?.scrollLeft) - 70 }, { duration: 100, queue: false });
    return;
  }

  get NextScrollButton() {
    var scrollPos: any = $('.multiple-header-mat-panel')[0];
    $('.multiple-header-mat-panel').animate({ scrollLeft: parseInt(scrollPos?.scrollLeft) + 70 }, { duration: 100, queue: false });
    return;
  }

  BackScroll($event: any) {
    var scrollPos: any = $($event)[0];
    $($event).animate({ scrollLeft: parseInt(scrollPos?.scrollLeft) - 100 }, { duration: 100, queue: false });
  }

  NextScroll($event: any) {
    var scrollPos: any = $($event)[0];
    $($event).animate({ scrollLeft: parseInt(scrollPos?.scrollLeft) + 100 }, { duration: 100, queue: false });
  }
}
