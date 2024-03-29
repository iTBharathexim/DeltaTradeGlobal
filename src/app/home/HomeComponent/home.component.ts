import { Component, ElementRef, EventEmitter, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import moment from 'moment';
import { Router } from '@angular/router';
declare var $:any;
import { App } from '@capacitor/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'angular-mobile-app';
  data: any = [];
  @Output('ModeChanges') ModeChanges = new EventEmitter();
  @Output('SUBSCRIPTION_CHECK') SUBSCRIPTION_CHECK = new EventEmitter();
  constructor(public apiservice: ApiService, public router: Router, public ref: ElementRef) {
    this.apiservice.LOADER_SHOW_HIDE = true
  }
  VISIBLE_TRADE_APP: any = '';
  USER_DETAILS: any = [];
  DISPLAY_MODE: string = ''
  SUBSCRIPTION_DETAILS: any = null;
  @ViewChild("SUBSCRIPTION_DETAILS_PANEL") SUBSCRIPTION_DETAILS_PANEL: any;

  ngOnInit(): void {
    console.log(window.history, "window.history")
    this.addULheight();
    $(window).on('resize', () => {
      this.addULheight()
    });
    this.apiservice.LOADER_SHOW_HIDE = true;
    if (localStorage.getItem('token') != undefined && localStorage.getItem('token') != null && localStorage.getItem('token') != '') {
      this.apiservice.CheckUserExit({ emailId: localStorage.getItem('token') }).subscribe((res: any) => {
        if (res?.length != 0) {
          this.USER_DETAILS = res[0];
          this.SUBSCRIPTION_DETAILS = null;
          delete res[0]?.PlanDetails;
          let last_Order_Id_Status_TRUE = res[0]?.order_id
          if (last_Order_Id_Status_TRUE != undefined && last_Order_Id_Status_TRUE != null) {
            this.SUBSCRIPTION_DETAILS = Object.assign(last_Order_Id_Status_TRUE, res[0])
          }
          this.apiservice.getRazorpayOrderById(last_Order_Id_Status_TRUE?.id).subscribe((RazorpayOrderById: any) => {
            console.log(RazorpayOrderById, "RazorpayOrderById")
          })
          this.DISPLAY_MODE = this.USER_DETAILS?.DisplayMode
          let CompareDates = compareDates(res[0]?.FreeTrailPeroidStratDate, res[0]?.FreeTrailPeroidEndDate);
          if (CompareDates == true) {
            this.VISIBLE_TRADE_APP = false;
          } else {
            this.router.navigate(['/Subscription'])
            this.VISIBLE_TRADE_APP = true;
          }
          this.SUBSCRIPTION_CHECK.emit(this.VISIBLE_TRADE_APP);
          this.ModeChanges.emit(this.DISPLAY_MODE)
        } else {
          this.logout()
        }
      })
      this.SHOWPAGE('MAIN');
      const compareDates = (d1: any, d2: any) => {
        var Enddate = new Date(d2)
        var dateCheck = new Date()
        return dateCheck.getTime() <= Enddate.getTime()
      };
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, "sadasfdsfdf")
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

  ModeChange() {
    if (this.DISPLAY_MODE == 'Light') {
      this.DISPLAY_MODE = 'Dark'
    } else if (this.DISPLAY_MODE == 'Dark') {
      this.DISPLAY_MODE = 'Light'
    }
    this.ModeChanges.emit(this.DISPLAY_MODE)
    if (localStorage.getItem('token') != undefined && localStorage.getItem('token') != null && localStorage.getItem('token') != '') {
      this.apiservice.CheckUserExit({ emailId: localStorage.getItem('token') }).subscribe((res: any) => {
        this.apiservice.UpdateLoginDetails(res[0]?._id, { DisplayMode: this.DISPLAY_MODE }).subscribe((res) => {
        })
      })
    }
  }

  ICON_TOGGLE: boolean = false;
  toggleClass() {
    this.addULheight();
    this.ICON_TOGGLE = !this.ICON_TOGGLE;
  }

  VIEW_PAGE: any = {
    MAIN: false,
    ABOUTUS: false
  }

  SHOWPAGE(KeyName: any) {
    for (const key in this.VIEW_PAGE) {
      this.VIEW_PAGE[key] = false;
    }
    this.VIEW_PAGE[KeyName] = true;
    if (KeyName != 'MAIN') {
      window?.clearInterval(this.apiservice.TIME_INTERVAL);
    }
  }

  navigateUrlHome(url: any) {
    window?.clearInterval(this.apiservice.TIME_INTERVAL);
    setTimeout(() => {
      this.router.navigate([url])
    }, 200);
  }

  addULheight() {
    let elem1: any = document.querySelector(".controller");
    console.log(elem1,"dsdsdsd")
    if (elem1 != undefined && elem1 != null) {
      let rect = elem1.getBoundingClientRect();
      $('.body').css({ 'height': (parseInt(rect?.height) -51) + 'px', 'width': (parseInt(rect?.width) + .5) + 'px' })
    }

    let elem: any = document.querySelector(".controller .body");
    if (elem != undefined && elem != null) {
      let rect = elem.getBoundingClientRect();
      $('.navigation__links').css({ 'height': (parseInt(rect?.height) + 1) + 'px', 'width': (parseInt(rect?.width) + .5) + 'px' })
    }

  }

  HistroyBack() {
    window.history.back()
  }

  HistroyNext() {
    window.history.forward()
  }
  CloseApp() {
    App.exitApp()
  }
}
