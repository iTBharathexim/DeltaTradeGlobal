import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import moment from 'moment';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { AppConfig } from '../../environments/environment';
import { Router } from '@angular/router';
import { WebsocketService } from './websocket.service';
(window as any).global = window;

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  ws: any = ''
  DEFAULT_LIST_OF_DATA: any = [
    {
      "quotes": [
        {
          "ask": 82.9064,
          "base_currency": "USD",
          "bid": 82.9006,
          "midpoint": "82.9006",
          "quote_currency": "INR",
          "oldbid": "",
          "oldask": "",
          "className": "",
          "bidclassName": "",
          "askclassName": "",
          "Next": false,
          "OuwardMargin": 0.05,
          "InwardMargin": 0.05,
          "expended": false,
          "open": 83.015,
          "close": 83.015,
          "high": 83.0301,
          "low": 82.843,
          "time": "9:34 pm, 20th Feb  24"
        },
        {
          "ask": 89.7,
          "base_currency": "EUR",
          "bid": 89.698,
          "midpoint": "89.698",
          "quote_currency": "INR",
          "oldbid": "",
          "oldask": "",
          "className": "",
          "bidclassName": "",
          "askclassName": "lowask",
          "Next": false,
          "OuwardMargin": 0,
          "InwardMargin": 0,
          "expended": false,
          "open": 89.4591,
          "close": 89.4591,
          "high": 89.8712,
          "low": 89.3143,
          "time": "9:34 pm, 20th Feb  24"
        },
        {
          "ask": 104.929,
          "base_currency": "GBP",
          "bid": 104.849,
          "midpoint": "104.849",
          "quote_currency": "INR",
          "oldbid": "",
          "oldask": "",
          "className": "",
          "bidclassName": "lowask",
          "askclassName": "lowask",
          "Next": false,
          "OuwardMargin": 0,
          "InwardMargin": 0,
          "expended": false,
          "open": 104.466,
          "close": 104.466,
          "high": 104.958,
          "low": 104.344,
          "time": "9:34 pm, 20th Feb  24"
        },
        {
          "ask": 10.5998,
          "base_currency": "HKD",
          "bid": 10.599,
          "midpoint": "10.599",
          "quote_currency": "INR",
          "oldbid": "",
          "oldask": "",
          "className": "",
          "bidclassName": "lowask",
          "askclassName": "lowask",
          "Next": false,
          "OuwardMargin": 0,
          "InwardMargin": 0,
          "expended": false,
          "open": 10.6147,
          "close": 10.6147,
          "high": 10.6161,
          "low": 10.598,
          "time": "9:34 pm, 20th Feb  24"
        },
        {
          "ask": 94.1822,
          "base_currency": "CHF",
          "bid": 94.1648,
          "midpoint": "94.1648",
          "quote_currency": "INR",
          "oldbid": "",
          "oldask": "",
          "className": "",
          "bidclassName": "",
          "askclassName": "highask",
          "Next": false,
          "OuwardMargin": 0,
          "InwardMargin": 0,
          "expended": false,
          "open": 94.032,
          "close": 94.032,
          "high": 94.3664,
          "low": 93.8513,
          "time": "9:34 pm, 20th Feb  24"
        },
        {
          "ask": 1.08206,
          "base_currency": "EUR",
          "bid": 1.082,
          "midpoint": "1.082",
          "quote_currency": "USD",
          "oldbid": "",
          "oldask": "",
          "className": "",
          "bidclassName": "lowask",
          "askclassName": "",
          "Next": false,
          "OuwardMargin": 0,
          "InwardMargin": 0,
          "expended": false,
          "open": 1.07755,
          "close": 1.07754,
          "high": 1.0839,
          "low": 1.07597,
          "time": "9:34 pm, 20th Feb  24"
        },
        {
          "ask": 61.7355,
          "base_currency": "SGD",
          "bid": 61.7185,
          "midpoint": "61.7185",
          "quote_currency": "INR",
          "oldbid": "",
          "oldask": "",
          "className": "",
          "bidclassName": "",
          "askclassName": "highask",
          "Next": false,
          "OuwardMargin": 0,
          "InwardMargin": 0,
          "expended": false,
          "open": 61.657,
          "close": 61.657,
          "high": 61.7513,
          "low": 61.6094,
          "time": "9:34 pm, 20th Feb  24"
        },
        {
          "ask": 0.55353,
          "base_currency": "JPY",
          "bid": 0.55346,
          "midpoint": "0.55346",
          "quote_currency": "INR",
          "oldbid": "",
          "oldask": "",
          "className": "",
          "bidclassName": "",
          "askclassName": "",
          "Next": false,
          "OuwardMargin": 0,
          "InwardMargin": 0,
          "expended": false,
          "open": 0.55227,
          "close": 0.55227,
          "high": 0.55386,
          "low": 0.55135,
          "time": "9:34 pm, 20th Feb  24"
        },
        {
          "ask": 54.425,
          "base_currency": "AUD",
          "bid": 54.417,
          "midpoint": "54.417",
          "quote_currency": "INR",
          "oldbid": "",
          "oldask": "",
          "className": "",
          "bidclassName": "lowask",
          "askclassName": "lowask",
          "Next": false,
          "OuwardMargin": 0,
          "InwardMargin": 0,
          "expended": false,
          "open": 54.213,
          "close": 54.213,
          "high": 54.532,
          "low": 54.1096,
          "time": "9:34 pm, 20th Feb  24"
        },
        {
          "ask": 11.5288,
          "base_currency": "CNY",
          "bid": 11.528,
          "midpoint": "11.528",
          "quote_currency": "INR",
          "oldbid": "",
          "oldask": "",
          "className": "",
          "bidclassName": "lowask",
          "askclassName": "lowask",
          "Next": false,
          "OuwardMargin": 0,
          "InwardMargin": 0,
          "expended": false,
          "open": 11.5349,
          "close": 11.5349,
          "high": 11.5369,
          "low": 11.5185,
          "time": "9:34 pm, 20th Feb  24"
        }
      ]
    }
  ];
  LIST_OF_DATA: any = [
    {
      "quotes": [
        {
          "ask": 82.9064,
          "base_currency": "USD",
          "bid": 82.9006,
          "midpoint": "82.9006",
          "quote_currency": "INR",
          "oldbid": "",
          "oldask": "",
          "className": "",
          "bidclassName": "",
          "askclassName": "",
          "Next": false,
          "OuwardMargin": 0.05,
          "InwardMargin": 0.05,
          "expended": false,
          "open": 83.015,
          "close": 83.015,
          "high": 83.0301,
          "low": 82.843,
          "time": "9:34 pm, 20th Feb  24"
        },
        {
          "ask": 89.7,
          "base_currency": "EUR",
          "bid": 89.698,
          "midpoint": "89.698",
          "quote_currency": "INR",
          "oldbid": "",
          "oldask": "",
          "className": "",
          "bidclassName": "",
          "askclassName": "lowask",
          "Next": false,
          "OuwardMargin": 0,
          "InwardMargin": 0,
          "expended": false,
          "open": 89.4591,
          "close": 89.4591,
          "high": 89.8712,
          "low": 89.3143,
          "time": "9:34 pm, 20th Feb  24"
        },
        {
          "ask": 104.929,
          "base_currency": "GBP",
          "bid": 104.849,
          "midpoint": "104.849",
          "quote_currency": "INR",
          "oldbid": "",
          "oldask": "",
          "className": "",
          "bidclassName": "lowask",
          "askclassName": "lowask",
          "Next": false,
          "OuwardMargin": 0,
          "InwardMargin": 0,
          "expended": false,
          "open": 104.466,
          "close": 104.466,
          "high": 104.958,
          "low": 104.344,
          "time": "9:34 pm, 20th Feb  24"
        },
        {
          "ask": 10.5998,
          "base_currency": "HKD",
          "bid": 10.599,
          "midpoint": "10.599",
          "quote_currency": "INR",
          "oldbid": "",
          "oldask": "",
          "className": "",
          "bidclassName": "lowask",
          "askclassName": "lowask",
          "Next": false,
          "OuwardMargin": 0,
          "InwardMargin": 0,
          "expended": false,
          "open": 10.6147,
          "close": 10.6147,
          "high": 10.6161,
          "low": 10.598,
          "time": "9:34 pm, 20th Feb  24"
        },
        {
          "ask": 94.1822,
          "base_currency": "CHF",
          "bid": 94.1648,
          "midpoint": "94.1648",
          "quote_currency": "INR",
          "oldbid": "",
          "oldask": "",
          "className": "",
          "bidclassName": "",
          "askclassName": "highask",
          "Next": false,
          "OuwardMargin": 0,
          "InwardMargin": 0,
          "expended": false,
          "open": 94.032,
          "close": 94.032,
          "high": 94.3664,
          "low": 93.8513,
          "time": "9:34 pm, 20th Feb  24"
        },
        {
          "ask": 1.08206,
          "base_currency": "EUR",
          "bid": 1.082,
          "midpoint": "1.082",
          "quote_currency": "USD",
          "oldbid": "",
          "oldask": "",
          "className": "",
          "bidclassName": "lowask",
          "askclassName": "",
          "Next": false,
          "OuwardMargin": 0,
          "InwardMargin": 0,
          "expended": false,
          "open": 1.07755,
          "close": 1.07754,
          "high": 1.0839,
          "low": 1.07597,
          "time": "9:34 pm, 20th Feb  24"
        },
        {
          "ask": 61.7355,
          "base_currency": "SGD",
          "bid": 61.7185,
          "midpoint": "61.7185",
          "quote_currency": "INR",
          "oldbid": "",
          "oldask": "",
          "className": "",
          "bidclassName": "",
          "askclassName": "highask",
          "Next": false,
          "OuwardMargin": 0,
          "InwardMargin": 0,
          "expended": false,
          "open": 61.657,
          "close": 61.657,
          "high": 61.7513,
          "low": 61.6094,
          "time": "9:34 pm, 20th Feb  24"
        },
        {
          "ask": 0.55353,
          "base_currency": "JPY",
          "bid": 0.55346,
          "midpoint": "0.55346",
          "quote_currency": "INR",
          "oldbid": "",
          "oldask": "",
          "className": "",
          "bidclassName": "",
          "askclassName": "",
          "Next": false,
          "OuwardMargin": 0,
          "InwardMargin": 0,
          "expended": false,
          "open": 0.55227,
          "close": 0.55227,
          "high": 0.55386,
          "low": 0.55135,
          "time": "9:34 pm, 20th Feb  24"
        },
        {
          "ask": 54.425,
          "base_currency": "AUD",
          "bid": 54.417,
          "midpoint": "54.417",
          "quote_currency": "INR",
          "oldbid": "",
          "oldask": "",
          "className": "",
          "bidclassName": "lowask",
          "askclassName": "lowask",
          "Next": false,
          "OuwardMargin": 0,
          "InwardMargin": 0,
          "expended": false,
          "open": 54.213,
          "close": 54.213,
          "high": 54.532,
          "low": 54.1096,
          "time": "9:34 pm, 20th Feb  24"
        },
        {
          "ask": 11.5288,
          "base_currency": "CNY",
          "bid": 11.528,
          "midpoint": "11.528",
          "quote_currency": "INR",
          "oldbid": "",
          "oldask": "",
          "className": "",
          "bidclassName": "lowask",
          "askclassName": "lowask",
          "Next": false,
          "OuwardMargin": 0,
          "InwardMargin": 0,
          "expended": false,
          "open": 11.5349,
          "close": 11.5349,
          "high": 11.5369,
          "low": 11.5185,
          "time": "9:34 pm, 20th Feb  24"
        }
      ]
    }
  ];
  CURRENT_TIME: string = moment().format('MMMM Do YYYY, h:mm:ss a'); // December 18th 2023, 7:14:47 am
  CURRENCY_LIST: any = ['USD', 'EUR', 'GBP', 'AUD', 'HKD', 'JPY', 'CHF', 'CNY', 'SGD', 'INR']
  CURRENCY_INR_LIST: any = ['USDINR', 'EURINR', 'GBPINR', 'AUDINR', 'HKDINR', 'JPYINR', 'CHFINR', 'CNYINR', 'SGDINR', 'EURUSD']

  MARKET_NEWS_DATA: any = [];
  apibase: string = ''
  LOADER_SHOW_HIDE: boolean = true;
  httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Request-Origin": "https://devapp.bharathexim.com",
    }),
  };
  UserData: any = null;
  FX_MARGIN_DATA_OUTWARD: any = [];
  CHECK_LENGTH: boolean = false;
  Subject: any = ''
  counter = 60;
  FORWARD_ASK_DATA: any = [];
  FORWARD_BID_ASK_DATA: any = [];
  FORWARD_BID_DATA: any = [];
  HISTORICAL_DATA: any = [];
  HISTORICAL_CHART_DATA: any = [];
  @ViewChild("chart") chart: ChartComponent;
  chartOptions: Partial<ChartOptions>;

  constructor(public http: HttpClient, private deviceInformationService: DeviceDetectorService,
    public router: Router,
    public websocket: WebsocketService,
    public toastr: ToastrService) {
    AppConfig.callback();
    this.apibase = AppConfig.BASE_URL;
    this.getUserOb();
  }

  addUserData(data: any) {
    this.UserData = (data);
  }

  UserLogout(callback: any, bool: any = false, addmore: any = {}) {
    if (localStorage.getItem('token') != undefined) {
      this.CheckUserExit({ emailId: localStorage.getItem('token') }).subscribe((res: any) => {
        this.UpdateLoginDetails(res[0]?._id, { isLoggin: bool, ...addmore }).subscribe((res) => {
          localStorage.removeItem('token');
          window?.clearInterval(this.TIME_INTERVAL);
          if (callback != undefined && callback != null) {
            callback();
          }
        })
      });
    }
  }

  UserSessionLogout(callback: any, bool: any = false, addmore: any = {}) {
    if (localStorage.getItem('token') != undefined) {
      this.CheckUserExit({ emailId: localStorage.getItem('token') }).subscribe((res: any) => {
        this.UpdateLoginDetails(res[0]?._id, { isLoggin: bool, ...addmore }).subscribe((res) => {
          if (callback != undefined && callback != null) {
            callback();
          }
        })
      });
    }
  }

  getCurrency() {
    return this.http.get('https://marketdata.tradermade.com/api/v1/live_currencies_list?api_key=OyGcOnWXJeVRK5FoDxad')
  }

  getData(currency: any) {
    let API_CREATE: any = [];
    API_CREATE.push(this.http.get(`https://marketdata.tradermade.com/api/v1/historical?api_key=OyGcOnWXJeVRK5FoDxad&currency=${this.CURRENCY_INR_LIST?.join(',')}&date=${moment().format('YYYY-MM-DD')}`)) //
    return forkJoin(API_CREATE);
  }

  getMarketNews() {
    let DATE: any = moment().subtract(1, 'days').format('YYYY-MM-DDThh:mm')
    console.log(DATE)
    return this.http.get(`https://api.marketaux.com/v1/news/all?countries=in&filter_entities=true&limit=10&published_after=${DATE}&api_token=WyqhgbB9d7jtQ63oi3RX3weswMxmCEFQ3CEiz6uT`)
  }

  connectionOptions: any = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
  };
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  socket: any = null
  TIME_INTERVAL: any = null;
  COUNTER: any = [];
  getTraderDataLive(currency: any, data: any) {
    let headers: any = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('mode', 'no-cors');
    headers.append('crossorigin', true);
    clearInterval(this.TIME_INTERVAL);
    let OUTWARD_DATA: any = [];
    let INWARD_DATA: any = [];
    this.loadMarginData('outward').then((outwardres: any) => {
      console.log(outwardres, this.FR_TRIGGER_DATA, "outwardres")
      OUTWARD_DATA = outwardres?.outward;
      this.loadMarginData('inward').then((inwardres: any) => {
        console.log(inwardres, "inwardres")
        INWARD_DATA = inwardres?.inward;
        this.COUNTER = [];
        this.CURRENCY_LIST.forEach((element: any) => {
          this.COUNTER[element] = 0
        });
        this.TIME_INTERVAL = setInterval(() => {
          // this.loadData();
          this.http.post(`https://livetradeapp.bharathexim.com/GetLiveData`,
            {
              CurrencyList: this.CURRENCY_LIST,
              api_key: "caebb18b-eea0-424b-b936-d85242eb7ab2"
            },
            { headers: headers }).subscribe((resData: any) => {
              console.log(resData, "getTraderDataLive")
              let JSONDATA: any = resData
              let dumdata: any = [];
              JSONDATA?.quotes?.forEach((element: any) => {
                dumdata[element['base_currency'] + '' + element['quote_currency']] = element
              });
              data[0]['request_time'] = JSONDATA?.meta?.request_time
              data.forEach((element: any) => {
                element?.quotes?.forEach((quoteselement: any, index: any) => {
                  if (OUTWARD_DATA != undefined) {
                    quoteselement['OuwardMargin'] = parseFloat(OUTWARD_DATA[quoteselement['base_currency']]) / 100
                  }
                  if (INWARD_DATA != undefined) {
                    quoteselement['InwardMargin'] = parseFloat(INWARD_DATA[quoteselement['base_currency']]) / 100
                  }
                  if (dumdata[quoteselement['base_currency'] + '' + quoteselement['quote_currency']] != undefined && dumdata[quoteselement['base_currency'] + '' + quoteselement['quote_currency']] != null) {
                    if (quoteselement['bid'] > parseFloat(dumdata[quoteselement['base_currency'] + '' + quoteselement['quote_currency']]['bid'])) {
                      quoteselement['bidclassName'] = 'lowbid'
                    } else if (quoteselement['bid'] < parseFloat(dumdata[quoteselement['base_currency'] + '' + quoteselement['quote_currency']]['bid'])) {
                      quoteselement['bidclassName'] = 'highbid'
                    } else {
                      quoteselement['bidclassName'] = ''
                    }

                    if (quoteselement['ask'] > parseFloat(dumdata[quoteselement['base_currency'] + '' + quoteselement['quote_currency']]['ask'])) {
                      quoteselement['askclassName'] = 'lowask'
                    } else if (quoteselement['ask'] < parseFloat(dumdata[quoteselement['base_currency'] + '' + quoteselement['quote_currency']]['ask'])) {
                      quoteselement['askclassName'] = 'highask'
                    } else {
                      quoteselement['askclassName'] = ''
                    }
                    setTimeout(() => {
                      quoteselement['bid'] = parseFloat(dumdata[quoteselement['base_currency'] + '' + quoteselement['quote_currency']]['bid'])
                      quoteselement['ask'] = parseFloat(dumdata[quoteselement['base_currency'] + '' + quoteselement['quote_currency']]['ask'])
                      quoteselement['request_time'] = dumdata[quoteselement['request_time']];
                      if (this.COUNTER[quoteselement['base_currency']] == 0) {
                        if (this.FR_TRIGGER_DATA?.length != 0) {
                          if (((this.FR_TRIGGER_DATA[0][quoteselement['base_currency']]?.TriggerRate - (.02)) <= quoteselement['bid']) && this.FR_TRIGGER_DATA[0][quoteselement['base_currency']]?.TriggerRate != 0) {
                            this.toastr.show(`Live rate is nearing to trigger value Currency(${quoteselement['base_currency']}) Trigger value(${this.FR_TRIGGER_DATA[0][quoteselement['base_currency']]?.TriggerRate})`)
                            this.COUNTER[quoteselement['base_currency']]++;
                            this.FR_TRIGGER_DATA[0][quoteselement['base_currency']]['TriggerRate'] = 0
                            let id = this.FR_TRIGGER_DATA[0]?.userId;
                            delete this.FR_TRIGGER_DATA[0]?.createdAt;
                            delete this.FR_TRIGGER_DATA[0]?.updatedAt;
                            delete this.FR_TRIGGER_DATA[0]?.userId;
                            delete this.FR_TRIGGER_DATA[0]?.__v;
                            delete this.FR_TRIGGER_DATA[0]?._id;
                            // this.TriggerUpdate(this.FR_TRIGGER_DATA[0],id).subscribe((res)=>{})
                          }
                        }
                      }
                    }, 200);
                  }
                });
              });
              console.log(JSONDATA, data, "JSONDATA");
            })
        }, 500);
      });
    });

  }

  Login(data: any) {
    return this.http.post(`${this.apibase}/LiveTradeApp/TradeAppLogin`, data);
  }

  LoginMPIN(data: any) {
    return this.http.post(`${this.apibase}/LiveTradeApp/TradeAppLoginMPIN`, data);
  }

  Registration(data: any) {
    return this.http.post(`${this.apibase}/LiveTradeApp/SingUp`, data);
  }

  ResetPassword(data: any) {
    return this.http.post(`${this.apibase}/LiveTradeApp/TradeAppResetPassword`, data);
  }

  UpdateLoginDetails(id: any, data: any) {
    return this.http.post(`${this.apibase}/LiveTradeApp/update`, { id: id, data: data });
  }

  PushNotification(data: any) {
    return this.http.post(`${this.apibase}/LiveTradeApp/PushNotification`, data);
  }

  UpdateDeviceId(id: any, data: any) {
    return this.http.post(`${this.apibase}/LiveTradeApp/updatedeviceId`, { id: id, deviceId: data });
  }

  SendOtpEmail(data: any) {
    return this.http.post(`${this.apibase}/LiveTradeApp/SendOtpEmail`, data);
  }


  SendOtpMobile(data: any) {
    return this.http.post(`${this.apibase}/LiveTradeApp/SendOtpMobile`, data);
  }

  CheckUserExit(data: any) {
    return this.http.post(`${this.apibase}/LiveTradeApp/getUser`, data);
  }

  getHistoricalData(data: any) {
    return this.http.post(`${this.apibase}/JsApiHistorical/data`, data);
  }

  getRbiRef() {
    return this.http.get(`${this.apibase}/RBIRef/get`);
  }

  getBenchMarkRates(data) {
    return this.http.post(`${this.apibase}/BenchMarks/get`, data);
  }

  CouponCodeValidation(data: any) {
    return this.http.post(`${AppConfig.COUPON_API}/LiveTradeApp/CouponValidation`, data);
  }

  creareOrder(data: any) {
    return this.http.post(`${AppConfig.COUPON_API}/LiveTradeApp/createOrder`, { data: data });
  }

  getRazorpayPlanAll() {
    return this.http.get(`${AppConfig.COUPON_API}/LiveTradeApp/RazorpayPlanAll`);
  }

  getSubscriptionPlanAll() {
    return this.http.get(`${AppConfig.COUPON_API}/SubscriptionPlan/get`);
  }

  getRazorpaySubscriptionAll() {
    return this.http.get(`${AppConfig.COUPON_API}/LiveTradeApp/RazorpaySubscriptionAll`);
  }

  getRazorpayOrderById(id: any) {
    return this.http.post(`${AppConfig.COUPON_API}/LiveTradeApp/OrderById`, { id: id });
  }

  getRazorpayOrderAll() {
    return this.http.get(`${AppConfig.COUPON_API}/LiveTradeApp/RazorpayOrderAll`);
  }

  SendContactUsEmail(data: any) {
    return this.http.post(`${AppConfig.COUPON_API}/LiveTradeApp/CONTACT_US_EMAIL`, { data: data });
  }

  getFXMargin(id: any, type: any) {
    return this.http.post(`${AppConfig.COUPON_API}/FXMarginDetails/get`, { userId: id, type: type });
  }

  CreateFXMargin(data: any) {
    return this.http.post(`${AppConfig.COUPON_API}/FXMarginDetails/post`, { data: data });
  }

  MarginUpdate(data: any, id: any) {
    return this.http.post(`${AppConfig.COUPON_API}/FXMarginDetails/update`, { data: data, id: id });
  }

  getFXTrigger(id: any) {
    return this.http.post(`${AppConfig.COUPON_API}/FXTrigger/get`, { userId: id });
  }

  CreateFXTrigger(data: any) {
    return this.http.post(`${AppConfig.COUPON_API}/FXTrigger/post`, { data: data });
  }

  TriggerUpdate(data: any, id: any) {
    return this.http.post(`${AppConfig.COUPON_API}/FXTrigger/update`, { data: data, id: id });
  }

  getDeviceInfo() {
    return {
      isMobile: this.deviceInformationService.isMobile(),
      isTablet: this.deviceInformationService.isTablet(),
      isDesktop: this.deviceInformationService.isDesktop(),
      OsDeviceInfo: this.deviceInformationService.getDeviceInfo().os,
      osVersion: this.deviceInformationService.getDeviceInfo().os_version,
      browser: this.deviceInformationService.getDeviceInfo().browser,
      browserVersion: this.deviceInformationService.getDeviceInfo().browser_version,
      browserMajorVersion: this.deviceInformationService.getDeviceInfo().browser_version,
      userAgent: this.deviceInformationService.getDeviceInfo().userAgent
    }
  }

  UpdateUserPaymentDetails(updatedata: any, other: any) {
    return new Promise((resolve, reject) => {
      this.CheckUserExit({ emailId: localStorage.getItem('token') }).subscribe((res: any) => {
        console.log(res, "CheckUserExit")
        if (res?.length != 0) {
          let InfoPaymentStatus = res[0]?.PaymentStatus;
          InfoPaymentStatus.push(updatedata);
          this.UpdateLoginDetails(res[0]?._id, { PaymentStatus: InfoPaymentStatus, ...other }).subscribe((updatedataRes) => {
            resolve(updatedataRes);
          }, (error) => resolve(error))
        }
      })
    })
  }

  UpdateUserDetails(updatedata: any) {
    return new Promise((resolve, reject) => {
      this.CheckUserExit({ emailId: localStorage.getItem('token') }).subscribe((res: any) => {
        console.log(res, "CheckUserExit")
        if (res?.length != 0) {
          this.UpdateLoginDetails(res[0]?._id, updatedata).subscribe((updatedataRes) => {
            resolve(updatedataRes);
          }, (error) => resolve(error))
        }
      })
    })
  }

  getUserOb() {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem('token') != undefined && localStorage.getItem('token') != null && localStorage.getItem('token') != '') {
        this.CheckUserExit({ emailId: localStorage.getItem('token') }).subscribe((res: any) => {
          if (res?.length != 0) {
            this.UserData = res[0];
            resolve(this.UserData)
          } else {
            resolve([])
          }
        });
      }
    });
  }

  checkUserExpired() {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem('token') != undefined && localStorage.getItem('token') != null && localStorage.getItem('token') != '') {
        this.CheckUserExit({ emailId: localStorage.getItem('token') }).subscribe((res: any) => {
          if (res?.length != 0) {
            if (compareDates(res[0]?.FreeTrailPeroidStratDate, res[0]?.FreeTrailPeroidEndDate) == true) {
              resolve(true)
            } else {
              resolve(false)
            }
          }
        })
        const compareDates = (d1: any, d2: any) => {
          var Enddate = new Date(d2)
          var dateCheck = new Date()
          return dateCheck.getTime() <= Enddate.getTime()
        };
      }
    })
  }

  FR_TRIGGER_DATA: any = [];
  FX_MARGIN_DATA_INWARD: any = []
  loadData() {
    this.getUserOb().then((res: any) => {
      this.getFXTrigger(res?._id).subscribe((res: any) => {
        console.log(res, "loadOutwardData")
        this.FR_TRIGGER_DATA = res?.FXMarginTrigger;
        let JsApiCommonSubscriber = res?.JsApiCommonSubscriber;

        if (res?.FXMarginTrigger?.length == 0) {
          this.CHECK_LENGTH = true;
          this.FX_MARGIN_DATA_OUTWARD = [];
          this.FX_MARGIN_DATA_INWARD = [];
          this.CURRENCY_LIST?.forEach((element: any) => {
            if (element != 'INR') {
              this.FX_MARGIN_DATA_OUTWARD.push({
                key: element,
                TriggerRate: 0,
                LiveRate: 0
              })
              this.FX_MARGIN_DATA_INWARD.push({
                key: element,
                TriggerRate: 0,
                LiveRate: 0
              })
            }
          });
          Object.keys(JsApiCommonSubscriber)?.forEach((element: any, index: any) => {
            let elementCurrncy = element?.split("_");
            let filterItemOutward = this.FX_MARGIN_DATA_OUTWARD?.filter((item: any) => item?.key == elementCurrncy[0])
            if (filterItemOutward?.length != 0) {
              filterItemOutward[0]["LiveRate"] = JsApiCommonSubscriber[element]?.QUOTE_BID
            }
            let filterItemInward = this.FX_MARGIN_DATA_INWARD?.filter((item: any) => item?.key == elementCurrncy[0])
            if (filterItemInward?.length != 0) {
              filterItemInward[0]["LiveRate"] = JsApiCommonSubscriber[element]?.QUOTE_ASK
            }
          });
          // this.LIST_OF_DATA[0]?.quotes?.forEach((element: any, index: any) => {
          //   if (this.FX_MARGIN_DATA_OUTWARD[index]?.key == element?.base_currency) {
          //     this.FX_MARGIN_DATA_OUTWARD[index]["LiveRate"] = element?.bid
          //   }
          //   if (this.FX_MARGIN_DATA_INWARD[index]?.key == element?.base_currency) {
          //     this.FX_MARGIN_DATA_INWARD[index]["LiveRate"] = element?.ask
          //   }
          // });
        } else {
          this.CHECK_LENGTH = false;
          this.FX_MARGIN_DATA_OUTWARD = [];
          this.FX_MARGIN_DATA_INWARD = [];

          this.CURRENCY_LIST?.forEach((element: any) => {
            if (element != 'INR') {
              this.FX_MARGIN_DATA_OUTWARD.push({
                key: element,
                TriggerRate: res?.FXMarginTrigger[0]?.Outward[element]?.TriggerRate,
                LiveRate: res?.FXMarginTrigger[0]?.Outward[element]?.LiveRate
              })
              this.FX_MARGIN_DATA_INWARD.push({
                key: element,
                TriggerRate: res?.FXMarginTrigger[0]?.Inward[element]?.TriggerRate,
                LiveRate: res?.FXMarginTrigger[0]?.Inward[element]?.LiveRate
              })
            }
          });
          Object.keys(JsApiCommonSubscriber)?.forEach((element: any, index: any) => {
            let elementCurrncy = element?.split("_");
            let filterItemOutward = this.FX_MARGIN_DATA_OUTWARD?.filter((item: any) => item?.key == elementCurrncy[0])
            if (filterItemOutward?.length != 0) {
              filterItemOutward[0]["LiveRate"] = JsApiCommonSubscriber[element]?.QUOTE_BID
            }
            let filterItemInward = this.FX_MARGIN_DATA_INWARD?.filter((item: any) => item?.key == elementCurrncy[0])
            if (filterItemInward?.length != 0) {
              filterItemInward[0]["LiveRate"] = JsApiCommonSubscriber[element]?.QUOTE_ASK
            }
          });
        }
      })
    })
  }

  loadMarginData(type: any) {
    return new Promise((resolve, reject) => {
      this.getUserOb().then((res: any) => {
        this.getFXMargin(res?._id, type).subscribe((res: any) => {
          resolve(res)
        })
      })
    })
  }

  loadMarginData2(id, type: any) {
    return new Promise((resolve, reject) => {
      this.getFXMargin(id, type).subscribe((res: any) => {
        resolve(res)
      })
    })
  }

  interval = null;
  SHOW_SESSION: boolean = false;
  URL_LIST: any = ["/Login", "/Registration", "/ResetPassword"];
  intervaltime: number = 1000;
  async _mouseleave(App: any) {
    this.SHOW_SESSION = false;
    if (this.URL_LIST?.filter((item: any) => item == this.router?.url)?.length == 0) {
      this.interval = setInterval(async () => {
        if (this.counter == 30) {
          this.SHOW_SESSION = true
        }
        let { isActive } = await App.getState();
        if (this.counter == 1) {
          this.SHOW_SESSION = false
          this.UserLogout(() => {
            clearInterval(this.interval);
            this.counter = 60;
            this.router?.navigate(['/Login']);
          });
          console.log(this.counter, "setTimeout")
        }
        this.counter--;
        console.log("SHOW_SESSION", isActive, this.counter, this.SHOW_SESSION)
      }, 1000)
    }
  }
}
