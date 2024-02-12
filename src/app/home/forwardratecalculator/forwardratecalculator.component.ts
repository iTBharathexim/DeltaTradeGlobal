import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-forwardratecalculator',
  templateUrl: './forwardratecalculator.component.html',
  styleUrls: ['./forwardratecalculator.component.scss']
})
export class ForwardratecalculatorComponent implements OnInit {
  CURREENT_DATE: string = moment().format('h:mm a, Do MMM  YY');
  DISPLAY_MODE:any='';

  constructor(public apiUser: ApiService) { }

  ngOnInit(): void {
  }

}
