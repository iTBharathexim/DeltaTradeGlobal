import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';
import moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-live-trade-app',
  templateUrl: './live-trade-app.component.html',
  styleUrls: ['./live-trade-app.component.scss']
})
export class LiveTradeAppComponent implements OnInit, OnChanges {
  title = 'angular-mobile-app';
  data: any = [];
  constructor(public apiservice: ApiService, public router: Router) {
    this.apiservice.LOADER_SHOW_HIDE = true
  }
  VISIBLE_TRADE_APP: any = '';
  USER_DETAILS: any = [];
  DISPLAY_MODE: any = ''

  ngOnInit(): void {
    this.apiservice.LOADER_SHOW_HIDE = true;
    if (localStorage.getItem('token') != undefined && localStorage.getItem('token') != null && localStorage.getItem('token') != '') {
      this.apiservice.CheckUserExit({ emailId: localStorage.getItem('token') }).subscribe((res: any) => {
        if (res?.length != 0) {
          this.USER_DETAILS = res[0]
          this.DISPLAY_MODE = this.USER_DETAILS?.DisplayMode
          console.log(res, "CheckUserExit")
          this.apiservice.getData('INR').subscribe((res1: any) => {
            console.log(res1, "sdfsdfsdfdsfds")
            res1.forEach((element: any) => {
              element?.quotes?.forEach((quoteselement: any) => {
                quoteselement['bid'] = 0;
                quoteselement['ask'] = 0;
                quoteselement['oldbid'] = 0;
                quoteselement['oldask'] = 0;
                quoteselement['className'] = '';
                quoteselement['Next'] = false;
                quoteselement['OuwardMargin'] = 0;
                quoteselement['InwardMargin'] = 0;
              });
            });
            this.apiservice.LIST_OF_DATA = res1;
            this.apiservice.getTraderDataLive('INR', res1);
            this.apiservice.LOADER_SHOW_HIDE = false
          }, (error: any) => { })
        } else {
          this.logout()
        }
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, "sadasfdsfdf")

  }
  onTabChanged(event: any) {
    console.log(event, "sdfsdfdsf")
    if (event?.tab?.textLabel=="FX LIVE") {
      this.apiservice.LIST_OF_DATA = [];
      this.apiservice.LOADER_SHOW_HIDE = true;
      this.apiservice.getData(event?.tab?.textLabel).subscribe((res1: any) => {
        console.log(res1, "sdfsdfsdfdsfds")
        res1.forEach((element: any) => {
          element?.quotes?.forEach((quoteselement: any) => {
            quoteselement['bid'] = 0;
            quoteselement['ask'] = 0;
            quoteselement['className'] = '';
            quoteselement['oldbid'] = 0;
            quoteselement['oldask'] = 0;
          });
        });
        this.apiservice.LIST_OF_DATA = res1;
        this.apiservice.getTraderDataLive(event?.tab?.textLabel, res1);
        this.apiservice.LOADER_SHOW_HIDE = false;
      })
    } else if (event?.tab?.textLabel == "Forward") {
      // this.apiservice.StartWebSocket();
    }
    else {
      this.apiservice.LOADER_SHOW_HIDE = false
      this.apiservice.getMarketNews().subscribe((res: any) => {
        console.log(res, "getMarketNews");
        this.apiservice.MARKET_NEWS_DATA = res?.data;
      })
    }
    console.log(event?.tab?.textLabel, "onTabChanged")
  }

  getCurrentTimeMoment(date: any) {
    return moment(date).format('h:mm a, Do MMM  YY'); // December 18th 2023, 7:14:47 am
  }

  setFloatFixed(data: any) {
    return data != 0 && data != undefined && data != null ? (data).toFixed(3) : 0;
  }

  logout() {
    this.apiservice.UpdateLoginDetails(this.USER_DETAILS?._id, { isLoggin: false }).subscribe((res) => {
      localStorage.removeItem('token');
      this.router.navigate(['/Login'])
      window?.clearInterval(this.apiservice.TIME_INTERVAL);
    })
  }

  NetInwardRate(spot: any, cashspot: any, margin: any) {
    return (parseFloat(spot) - parseFloat(cashspot) - parseFloat(margin)).toFixed(3);
  }

  NetOutwardRate(spot: any, cashspot: any, margin: any) {
    return (parseFloat(spot) - parseFloat(cashspot) + parseFloat(margin)).toFixed(3);
  }
}
