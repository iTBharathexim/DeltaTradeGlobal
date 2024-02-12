import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dynamic-error',
  templateUrl: './dynamic-error.component.html',
  styleUrls: ['./dynamic-error.component.scss']
})
export class DynamicErrorComponent implements OnInit {
  @Input() formName: FormGroup;
  @Input() fieldName: any;
  @Input('SUBMIT_ERROR') SUBMIT_ERROR: boolean=false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
