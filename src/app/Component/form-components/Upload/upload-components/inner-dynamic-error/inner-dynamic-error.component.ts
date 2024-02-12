import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'inner-dynamic-error',
  templateUrl: './inner-dynamic-error.component.html',
  styleUrls: ['./inner-dynamic-error.component.scss']
})
export class InnerDynamicErrorComponent implements OnInit {
  @Input() formName: FormGroup;
  @Input() fieldName: any;
  @Input('SUBMIT_ERROR') SUBMIT_ERROR: boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

}
