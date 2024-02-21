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
    public toastr: ToastrService, public LoggerInfoService: LoggerInfoService,
    public andoridFileSystemService: AndoridFileSystemService) {
    userService.UserLogout(null);
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
      console.log(res, 'LoginMPIN')
      this.LoggerInfoService.showInfo();
      if (res?.docs?.error == undefined) {
        clearInterval(this.TIMER)
        let remanningTime: any = Math.round((parseInt(res?.docs?.data?.lastactivetime) - parseInt(new Date().getTime()?.toString())) / 1000);
        if (remanningTime < 0 || remanningTime == 0) {
          // if (res?.docs?.data?.isLoggin == false) {
          if (res?.docs?.data?.CouponVerified == true && res?.docs?.data?.emailIdVerified == true) {
            localStorage.setItem('token', res?.docs?.data?.emailId)
            this.userService.UpdateLoginDetails(res?.docs?.data?._id, {
              isLoggin: true, DeviceInfoLogin: this.userService.getDeviceInfo(),
              LoginCounter: res?.docs?.data?.LoginCounter != undefined ? res?.docs?.data?.LoginCounter + 1 : 1
            }).subscribe((res1) => {
              this.fCmcontroller.ChangeDeviceId(res?.docs?.data?.emailId);
              console.log(this.fCmcontroller.getDeviceId(), "getDeviceId")
              if (this.fCmcontroller.getPlatform()?.toString() != 'web') {
                this.fCmcontroller.getDeviceId().then((userId: any) => {
                  this.userService.PushNotification({
                    registrationToken: userId,
                    title: "Login Successfully..",
                    body: "Login Successfully.."
                  }).subscribe((rez) => {
                    this.websocketService.connect()
                    this.router.navigate(['home'])
                    console.log(rez, "PushNotification")
                    setTimeout(() => {
                      location.reload();
                    }, 10);
                  })
                })
              } else {
                setTimeout(() => {
                  location.reload();
                }, 10);
                this.websocketService.connect()
                this.router.navigate(['home'])
              }
            })
          } else {
            let navigationExtras: NavigationExtras = {
              queryParams: {
                "item": JSON.stringify({ item: res?.docs?.data?.emailId })
              }
            };
            this.router.navigate(["/Registration"], navigationExtras);
          }
          // } else {
          //   this.toastr.error("You are already logged in on a different device.\n Please wait for a few minutes, and try again.")
          // }
        } else {
          this.toastr.error("You are already logged in on a different device.\n Please wait for a few minutes, and try again.")
          this.TIMER = setInterval(() => {
            console.log(remanningTime, "remanningTime")
            if (remanningTime < 0 || remanningTime == 0) {
              clearInterval(this.TIMER)
              this.userService.UpdateLoginDetails(res?.docs?.data?._id, {
                isLoggin: false,
              }).subscribe((res1) => {
                this.toastr.show("Now your try login...");
              })
            }
            remanningTime--;
          }, 1000);
          console.log(remanningTime, remanningTime > 0, "lastactivetime")
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
      console.log(err, 'sdfsdhfsdklfhdsfksdfsdfds')
    })
    console.log(this.userForm.value, 'sdsgjdfgsdfdf')
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
