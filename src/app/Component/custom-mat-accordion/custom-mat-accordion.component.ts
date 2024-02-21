import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare var $:any;

@Component({
  selector: 'custom-mat-accordion',
  templateUrl: './custom-mat-accordion.component.html',
  styleUrls: ['./custom-mat-accordion.component.scss'],
  host: {
    '[attr.aria-expanded]': '_isExpanded()',
    '[attr.aria-disabled]': '_isDisabled()',
    '[style.height]': '_getHeaderHeight()',
    // '(click)': '_toggle($event)',
    '(keydown)': '_keydown($event)',
  },
})
export class CustomMatAccordionComponent implements OnInit, AfterViewInit {
  @Input('addClass') addClass: any = ''
  @Output('onChangeEvent') onChangeEvent: any = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  isDisabled: boolean = false;
  _isDisabled() {
    return this.isDisabled;
  }

  @Input("Expanded")Expanded: boolean = false;
  _isExpanded() {
    return this.Expanded;
  }

  _getHeaderHeight() {

  }

  _toggle(event: any) {
    $('custom-mat-accordion').each(function() { this.setAttribute('aria-expanded', 'false')});
    // let children: any = Array.from($(event?.target).find('.Collesape'));
    // if (children?.length != 0) {
    //   if (!$(event?.currentTarget).find('.content').hasClass('Show-Content')) {
    //     $('.Show-Content').removeClass('Show-Content');
    //     $(event?.currentTarget).find('.content').addClass('Show-Content')
    //     this.Expanded = true;
    //     // this.onChangeEvent.emit(this.Expanded)
    //   } else {
    //     this.Expanded = false;
    //     // this.onChangeEvent.emit(this.Expanded)
    //     $(event?.currentTarget).find('.content').removeClass('Show-Content');
    //   }
    // }
    if (this.Expanded==true) {
      this.onChangeEvent.emit(false)
    }else{
      this.onChangeEvent.emit(true)
    }
  }

  _keydown($event: any) {

  }
  ngAfterViewInit() {

  }
}
