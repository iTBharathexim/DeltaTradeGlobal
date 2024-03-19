import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';
import moment from 'moment';
import { Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import { FCmController } from '../../Controller/FCM-Controllor';
import { JsApiCommonSubscriber } from '../DataService/NetJSApi';
import { CapacitorEvent } from 'capacitor-plugin-event';
import { Capacitor } from '@capacitor/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-live-trade-app',
  templateUrl: './live-trade-app.component.html',
  styleUrls: ['./live-trade-app.component.scss'],
  animations: [
    trigger('HighClose', [
      state('open', style({
        backgroundColor: '#f65d5d',
        color: "white",
        Borderradius: "10px",
        padding: "5px"
      })),
      state('closed', style({
        backgroundColor: '#4cf140',
        color: "white",
        Borderradius: "10px",
        padding: "5px"
      })),
      transition('* => closed', [
        animate('0.1s')
      ]),
      transition('* => open', [
        animate('0.1s')
      ]),
    ]),
  ],
})
export class LiveTradeAppComponent implements OnInit, OnChanges, OnDestroy {
  title = 'angular-mobile-app';
  data: any = [];
  constructor(
    public apiservice: ApiService,
    public fCmcontroller: FCmController,
    public websocketService: WebsocketService,
    public JsApiCommonsubscriber: JsApiCommonSubscriber,
    public router: Router) {
    // if (Capacitor.getPlatform() != 'web') {
    //   CapacitorEvent.addListener("OnScreenState", (result: any) => {
    //     if (result?.value == true) {
    //       this.apiservice.LIST_OF_DATA = this.apiservice.DEFAULT_LIST_OF_DATA;
    //       // this.websocketService.connect();
    //       // this.JsApiCommonsubscriber.loadJSApi();
    //     }
    //   })
    // }
  }
  VISIBLE_TRADE_APP: any = '';
  USER_DETAILS: any = [];
  DISPLAY_MODE: any = ''
  WHITELISTING: any = ['JPY', 'AUD', 'CNY'];

  ngOnInit(): void {
    // this.apiservice.LIST_OF_DATA = [];
    // this.apiservice.LIST_OF_DATA = this.apiservice.DEFAULT_LIST_OF_DATA;
    // this.websocketService.connect();
    // this.JsApiCommonsubscriber.loadJSApi();
  }


  onDaApiCall() {
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
    }, (error: any) => { })
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  onTabChanged(event: any) {
    if (event?.name == "FX LIVE") {
      // this.websocketService.connect();
    } else if (event?.name == "Forward") {
      // this.apiservice.StartWebSocket();
    } else if (event?.name == "NEWS") {
      // this.websocketService.disconnect();
      this.apiservice.getMarketNews().subscribe((res: any) => {
        this.apiservice.MARKET_NEWS_DATA = res?.data;
      })
    }
  }

  ApiForwardCall(event, item: any, index, FORWARD_BID_ASK_DATA) {
    if (event == true) {
      this.apiservice.getForwardData({ CurrencyName: item?.Original_Currency }).subscribe((res:any) => {
        FORWARD_BID_ASK_DATA[index] = Object.assign(FORWARD_BID_ASK_DATA[index],res.data);
      })
    }
  }

  getCurrentTimeMoment(date: any) {
    return moment(date).format('h:mm a, Do MMM  YY'); // December 18th 2023, 7:14:47 am
  }

  setFloatFixed(data: any) {
    return data != 0 && data != undefined && data != null && data != "N/A" ? (data).toFixed(4) : 0;
  }

  Collepse(event, index, data) {
    data?.forEach((element, i) => {
      if (i != index) {
        element['expended'] = false;
      } else {
        element['expended'] = event;
      }
    });
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

  ngOnDestroy(): void {
    // this.websocketService.disconnect();
  }
}
