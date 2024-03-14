import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import moment from 'moment';
import { LoggerInfoService } from '../Component/logger-info/logger-info.service';
import { App } from '@capacitor/app';
import { AndoridFileSystemService } from '../Controller/AndoridFileSystem';
import { FCmController } from '../Controller/FCM-Controllor';
import { WebsocketService } from '../services/websocket.service';
import { CustomConfirmDialogModelComponent } from '../Component/custom-confirm-dialog-model/custom-confirm-dialog-model.component';
import { CapacitorEvent } from 'capacitor-plugin-event';
import { JsApiCommonSubscriber } from '../home/DataService/NetJSApi';

@Component({
  selector: 'app-mpin-login-page',
  templateUrl: './mpin-login-page.component.html',
  styleUrls: ['./mpin-login-page.component.scss']
})
export class MPINLoginPageComponent implements OnInit {
  userForm: any = new FormGroup({
    email: new FormControl(localStorage.getItem('token')),
    MPIN: new FormControl()
  });
  CURREENT_DATE: string = moment().format('YYYY-MM-DD')
  errorShow: any = ''
  TIMER: any = null;

  constructor(public userService: ApiService, public router: Router,
    public fCmcontroller: FCmController,
    public websocketService: WebsocketService,
    public JsApiCommonsubscriber: JsApiCommonSubscriber,
    public customConfirmDialogModelComponent: CustomConfirmDialogModelComponent,
    public toastr: ToastrService, public LoggerInfoService: LoggerInfoService,
    public andoridFileSystemService: AndoridFileSystemService) {
    this.userService.NEW_LOADER_SHOW_HIDE = false;
  }

  LOGO_ANIMATION: any = {
    LOGO_ICON_1: false,
    LOGO_ICON_2: false,
    LOGO_ICON_3: false,
    LOGO_ICON_4: false,
    LOGO_ICON_5: false,
    LOGO_ICON_6: false,
  }

  ngOnInit(): void {
  }

  onFormSubmit() {
    this.userService.LoginMPIN(this.userForm.value).subscribe((res: any) => {
      this.LoggerInfoService.showInfo();
      if (res?.docs?.error == undefined) {
        clearInterval(this.TIMER)
        localStorage.setItem('token', res?.docs?.data?.emailId)
        if (res?.docs?.data?.isLoggin == false) {
          if (res?.docs?.data?.CouponVerified == true && res?.docs?.data?.emailIdVerified == true) {
            localStorage.setItem('token', res?.docs?.data?.emailId)
            this.userService.UpdateLoginDetails(res?.docs?.data?._id, {
              isLoggin: true, DeviceInfoLogin: this.userService.getDeviceInfo(),
              LoginCounter: res?.docs?.data?.LoginCounter != undefined ? res?.docs?.data?.LoginCounter + 1 : 1,
              WebSocketId: this.websocketService.socket?.id
            }).subscribe((res1) => {
              if (this.fCmcontroller.getPlatform()?.toString() != 'web') {
                this.fCmcontroller.getDeviceId().then((userId: any) => {
                  this.userService.UpdateDeviceId(res?.docs?.data?.emailId, userId).subscribe((res) => { })
                  this.userService.PushNotification({
                    registrationToken: userId,
                    title: "Login Successful..",
                    body: "Login Successful.."
                  }).subscribe((rez) => {
                    let navigationExtras: NavigationExtras = {
                      queryParams: {
                        "type": 'home'
                      }
                    };
                    CapacitorEvent.SessionTimerStart({ value: "3" }).then((res) => {
                      this.router.navigate(['LogoAnimation'], navigationExtras);
                    });
                  })
                })
              } else {
                let navigationExtras: NavigationExtras = {
                  queryParams: {
                    "type": 'home'
                  }
                };
                this.router.navigate(['LogoAnimation'], navigationExtras)
              }
              this.userService.loadMargin(res?.docs?.data?._id);
            })
          } else {
            let navigationExtras: NavigationExtras = {
              queryParams: {
                "item": JSON.stringify({ item: res?.docs?.data?.emailId })
              }
            };
            this.router.navigate(["/Registration"], navigationExtras);
          }
        } else {
          this.customConfirmDialogModelComponent?.YesNoDialogModel("Notification", "You have already logged in, do you want to close all previous sessions?", (value: any) => {
            if (value?.value == 'Yes') {
              if (this.fCmcontroller.getPlatform()?.toString() != 'web') {
                this.userService.LogoutAllDevice(res?.docs?.data?._id, {
                  isLoggin: false,
                  lastactivetime: 0
                }).subscribe((res1) => {
                  this.toastr.success("Please login now...");
                })
                this.fCmcontroller.getDeviceId().then((CurrentDeviceId: any) => {
                  res?.docs?.data?.deviceId?.forEach(userId => {
                    if (CurrentDeviceId != userId) {
                      this.userService.PushNotification({
                        registrationToken: userId,
                        title: "SessionLogoutAllDevice",
                        body: "Logout all session Successfully.."
                      }).subscribe((rez) => {
                      })
                    }
                  });
                });
              } else {
                this.userService.LogoutAllDevice(res?.docs?.data?._id, {
                  isLoggin: false,
                  lastactivetime: 0
                }).subscribe((res1) => {
                  this.toastr.success("Please login now...");
                })
              }
            }
          }, { 'color': 'red' }, { 'color': 'green' })
        }
      } else {
        if (res?.docs == null) {
          this.toastr.error("Somethings wrongs.....")
        } else {
          this.errorShow = JSON.stringify(res?.docs) + '1'
          this.toastr.error(res?.docs?.error)
        }
      }
    }, (err) => {
      this.toastr.error(err?.error?.text);
      this.errorShow = JSON.stringify(err) + '2'
    })
  }

  RoleType: any = ''
  ChangesRoleType(role: any) {
    this.RoleType = role?.value;
  }

  OpenPopup(TermsofService_PANEL: any) {
    TermsofService_PANEL?.displayShow
  }

  CloseApp() {
    App.exitApp()
  }

}
