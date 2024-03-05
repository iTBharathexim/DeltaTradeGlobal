import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
declare var $: any;

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomModelComponent),
  multi: true,
};

@Component({
  selector: 'custom-model',
  templateUrl: './custom-model.component.html',
  styleUrls: ['./custom-model.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class CustomModelComponent implements OnInit, OnChanges {
  @Input('name') name: any;
  @Input('width') width: any;
  @Input('height') height: any;
  @Input('maxwidth') maxwidth: any;
  @Input('maxheight') maxheight: any;
  @Input('minwidth') minwidth: any;
  @Input('minheight') minheight: any;
  @Input('customstyle') customstyle: any;
  @Input('modalbodyheight') modalbodyheight: any;
  @Input('modalbodystyle') modalbodystyle: any;
  @Input('FooterButton') FooterButton: boolean = false;
  @Input('EventButton') EventButton: boolean = false;
  @Input('FooterButtonText') FooterButtonText: any = 'Ok';
  @Input('id') id: any;
  @Output('ModelChange') ModelChange = new EventEmitter<any>();
  @Input('condition') condition: any = '';
  @Output('footerbutton') FOOTER_BUTTON_EVENT = new EventEmitter<any>();
  @Output('headerbutton') headerbutton = new EventEmitter<any>();
  @ViewChild('PopUpOpenClose') PopUpOpenClose?: ElementRef;
  @Input('buttondisabled') buttondisabled: boolean = false;
  @Input('HeaderEventButton') HeaderEventButton: any = '';
  @Input('minimizedisabled') minimizedisabled: boolean = true;
  @Input('removebg') removebg: boolean = true;
  @Input('RemoveBgTop') RemoveBgTop: boolean = true;
  @Input('HIDDEN_SHOW') HIDDEN_SHOW: boolean = false;
  @Input('ModalTitleStyle') ModalTitleStyle: any = '';
  @Input('CloseIconColor') CloseIconColor: any = 'black';

  toggleminimize: boolean = false;
  footerbuttontext: any = [];

  constructor(public eleref: ElementRef) { }

  ngOnInit(): void {
    this.footerbuttontext[this.id] = this.condition;
    // document.body.appendChild(this.eleref.nativeElement);
    setTimeout(() => {
      $(window).on('resize', () => {
        this.addULheight()
      });
    }, 200);
  }

  get displayHidden() {
    return $('.upload-modal#' + this.id).css('display', 'none');
  }

  get displayHide() {
    return $('.upload-modal#' + this.id).css('display', 'none');
  }

  get displayShow() {
    setTimeout(() => {
      this.addULheight();
    }, 100);
    return $('.PopupOpen#' + this.id).click()
  }

  OpenPopup() {
    $('.dropdown-controller')?.css('display', 'flex')
  }

  ClosePopup() {
    this.displayHidden
    this.ModelChange.emit('null');
  }

  OKBUTTON() {
          if (this.condition == true) {
      this.FOOTER_BUTTON_EVENT.emit(this.condition);
      this.displayHidden
    } else {
      this.FOOTER_BUTTON_EVENT.emit(false);
    }
  }

  HEADERBUTTON(PopUpOpenClose: any) {
    if (this.condition == true) {
      this.headerbutton.emit(this.condition);
      PopUpOpenClose.style.display = "none";
    } else {
      this.headerbutton.emit(false);
    }
  }

  touchEvent: any = null;
  // Drag method
  private dragElement(element: any): void {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById("mydivheader")) {
      let div: any = document.getElementById("mydivheader");
      div.onmousedown = dragMouseDown;
    } else {
      element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e: any) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e: any) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      element.style.position = "absolute";
      element.style.top = (element.offsetTop - pos2) + "px";
      element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
    const touchHandler = (event: any) => {
      var touch = event.changedTouches[0];
      let simulatedEvent: any = document.createEvent("MouseEvent");
      simulatedEvent.initMouseEvent({
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
      }, true, true, window, 1,
        touch.screenX, touch.screenY,
        touch.clientX, touch.clientY, false,
        false, false, false, 0, null);
      this.touchEvent = event
      console.log(event, "sfvfdsfdsfdsfd")
      touch.target.dispatchEvent(simulatedEvent);
      event.preventDefault();
    }

    function init() {
      document.addEventListener("touchstart", touchHandler, true);
      document.addEventListener("touchmove", touchHandler, true);
      document.addEventListener("touchend", touchHandler, true);
      document.addEventListener("touchcancel", touchHandler, true);
    }
    // init();
  }

  addULheight() {
    let elem: any = document.querySelector('.upload-modal#' + this.id);
    if (elem != undefined && elem != null) {
      let rect = elem.getBoundingClientRect();
      $('.draggableBody').css({ 'width': (parseInt(rect?.width) - 10) + 'px','height': (parseInt(rect?.height) - 100) + 'px' })
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
}
