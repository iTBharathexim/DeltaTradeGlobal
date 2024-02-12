import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'terms-condition-template',
  templateUrl: './terms-condition-template.component.html',
  styleUrls: ['./terms-condition-template.component.scss']
})
export class TermsConditionTemplateComponent implements OnInit {
  CURREENT_DATE: string = moment().format('YYYY-MM-DD')

  constructor() { }

  ngOnInit(): void {
  }

}
