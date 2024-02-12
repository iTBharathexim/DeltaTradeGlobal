import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'custom-mat-panel-description',
  templateUrl: './custom-mat-panel-description.component.html',
  styleUrls: ['./custom-mat-panel-description.component.scss'],
  host: {
    '[attr.aria-expanded]': '_isExpanded()',
    '[attr.aria-disabled]': '_isDisabled()',
    '[style.height]': '_getHeaderHeight()',
    '(click)': '_toggle($event)',
    '(keydown)': '_keydown($event)',
  },
})
export class CustomMatPanelDescriptionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  isDisabled: boolean = false;
  _isDisabled() {
    return this.isDisabled;
  }

  Expanded: boolean = false;
  _isExpanded() {
    return this.Expanded;
  }

  _getHeaderHeight() {

  }
  isDisplay: string = 'none'
  _getDisplay() {
    return this.isDisplay
  }

  toggleDisaply(value: any) {
    this.isDisplay = value;
  }

  _toggle(event: any) {
    console.log(event, "CustomMatExpansionPanelComponent")
  }

  _keydown($event: any) {

  }


}
