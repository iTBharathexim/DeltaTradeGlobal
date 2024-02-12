import { AfterViewInit, Component, Host, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'custom-mat-expansion-panel',
  templateUrl: './custom-mat-expansion-panel.component.html',
  styleUrls: ['./custom-mat-expansion-panel.component.scss'],
  host: {
    '[attr.aria-expanded]': '_isExpanded()',
    '[attr.aria-disabled]': '_isDisabled()',
    '[style.height]': '_getHeaderHeight()',
    '(keydown)': '_keydown($event)',
  },
})
export class CustomMatExpansionPanelComponent implements OnInit, AfterViewInit {
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
  _keydown($event: any) {

  }

  ngAfterViewInit(): void {
    let children: any = Array.from($('.custom-mat-expansion-panel').find('*'));
    children?.forEach((element: any) => {
      $(element).css({ "cursor": "pointer" })
      $(element).addClass("Collesape")
    });
  }

}
