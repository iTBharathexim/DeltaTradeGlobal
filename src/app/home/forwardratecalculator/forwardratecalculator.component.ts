import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { ApiService } from '../../services/api.service';
import { JsApiCommonSubscriber } from '../DataService/NetJSApi';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forwardratecalculator',
  templateUrl: './forwardratecalculator.component.html',
  styleUrls: ['./forwardratecalculator.component.scss']
})
export class ForwardratecalculatorComponent implements OnInit {
  CURREENT_DATE: string = moment().format('h:mm a, Do MMM  YY');
  DISPLAY_MODE: any = '';
  today = '';
  startDate = "yyyy-mm-dd";
  MAX_DATE_TODAY: any;
  constructor(public netJSApi: JsApiCommonSubscriber, private _snackBar: MatSnackBar) {
    let d = new Date();
    if (netJSApi.Currentday == "Saturday") {
      d.setDate(d.getDate() + 4);
      this.today = new Date(d).toISOString().split('T')[0];
    } else if (netJSApi.Currentday == "Sunday") {
      d.setDate(d.getDate() + 3);
      this.today = new Date(d).toISOString().split('T')[0];
    } else {
      d.setDate(d.getDate() + 2);
      this.today = new Date(d).toISOString().split('T')[0];
    }
    let d2 = new Date();
    d2.setDate(d2.getDate() + 360);
    this.MAX_DATE_TODAY = new Date(d2).toISOString().split('T')[0];
    netJSApi.lastDate = this.today;
    netJSApi.lastDate2 = this.today;
    setInterval(() => {
      this.CURREENT_DATE = moment().format('h:mm a, Do MMM  YY');
    }, 1000);

    this.netJSApi.FORWARD_CALCULATOR['ask'] = {
      finalValue: 0,
      spot: 0,
      outright: 0,
      Premium: 0
    }
    this.netJSApi.FORWARD_CALCULATOR['bid'] = {
      finalValue: 0,
      spot: 0,
      outright: 0,
      Premium: 0
    }
  }

  ngOnInit(): void {
  }

  startdatefun(startdate, value: any) {
    if (this.netJSApi.days[moment(value).day()] == "Saturday" || this.netJSApi.days[moment(value).day()] == "Sunday" ||
      this.netJSApi.apiservice.HOLIDAYS_INDIA.filter((item: any) => item?.date?.toString() == moment(value).format('MMMM DD, YYYY')?.toString())?.length != 0) {
      this.openSnackBar("Selected date is currency Holiday. Please select different date", "", {
        duration: 2000,
        panelClass: ['blue-snackbar']
      });
      startdate.value = '';
      this.netJSApi.lastDate = new Date().toISOString().split('T')[0]
      this.netJSApi.lastDate2 = new Date().toISOString().split('T')[0];
      return;
    } else {
      let d = new Date(value);
      d.setDate(d.getDate());

      let d1 = new Date(value);
      d1.setDate(d1.getDate() + 30);
      let date1 = this.datediff(new Date(), new Date(d));
      let date2 = this.datediff(new Date(), new Date(d1));
      if (date2 >= 360) {
        this.netJSApi.lastDate = new Date(d).toISOString().split('T')[0]
        this.netJSApi.lastDate2 = this.MAX_DATE_TODAY;
      } else {
        this.netJSApi.lastDate = new Date(value).toISOString().split('T')[0]
        this.netJSApi.lastDate2 = new Date(d1).toISOString().split('T')[0];
      }
    }
  }
  CHECK_BUTTON_ENABLED: any = true;
  SelectStartEnddate(CurrencyName, startdate: any, value: any, enddate) {
    if (CurrencyName == undefined || CurrencyName == '' || CurrencyName == null) {
      this.openSnackBar("Please select 1st Currency Name...", "", {
        duration: 2000,
        panelClass: ['blue-snackbar']
      });
      enddate.value = ''
      this.CHECK_BUTTON_ENABLED = true;
      return;
    }
    if (startdate == undefined || startdate == '' || startdate == null) {
      this.openSnackBar("Please select 1st Start Date...", "", {
        duration: 2000,
        panelClass: ['blue-snackbar']
      });
      enddate.value = ''
      this.CHECK_BUTTON_ENABLED = true;
      return;
    }
    if (this.netJSApi.days[moment(value).day()] == "Saturday" || this.netJSApi.days[moment(value).day()] == "Sunday" ||
      this.netJSApi.apiservice.HOLIDAYS_INDIA.filter((item: any) => item?.date?.toString() == moment(value).format('MMMM DD, YYYY')?.toString())?.length != 0) {
      this.openSnackBar("Selected date is currency Holiday. Please select different date", "", {
        duration: 2000,
        panelClass: ['blue-snackbar']
      });
      enddate.value = ''
      this.CHECK_BUTTON_ENABLED = true;
      return;
    }
    this.CHECK_BUTTON_ENABLED = false;
  }

  SelectStartEnddate2(CurrencyName, startdate: any, enddate: any) {
    if (CurrencyName == undefined || CurrencyName == '' || CurrencyName == null) {
      this.openSnackBar("Please select 1st Currency Name...", "", {
        duration: 2000,
        panelClass: ['blue-snackbar']
      });
      enddate = ''
      this.CHECK_BUTTON_ENABLED = true;
      return;
    }
    if (startdate == undefined || startdate == '' || startdate == null) {
      this.openSnackBar("Please select 1st Start Date...", "", {
        duration: 2000,
        panelClass: ['blue-snackbar']
      });
      enddate = ''
      this.CHECK_BUTTON_ENABLED = true;
      return;
    }
    this.netJSApi.apiservice.getForwardCalculator({
      CurrencyName: CurrencyName,
      BidDays: this.datediff(new Date(), new Date(startdate)),
      Askdays: this.datediff(new Date(), new Date(enddate))
    }).subscribe((res: any) => {
      this.netJSApi.FORWARD_CALCULATOR = res?.data;
    })
  }

  datediff(first, second) {
    const diffTime = Math.abs(first - second);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  treatAsUTC(date): any {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
  }

  daysBetween(startDate: any, endDate: any) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (this.treatAsUTC(endDate) - this.treatAsUTC(startDate)) / millisecondsPerDay;
  }

  openSnackBar(message: string, action: string, config: any) {
    this._snackBar.open(message, action, config);
  }

}
