import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { CustomConfirmDialogModelComponent } from './Component/custom-confirm-dialog-model/custom-confirm-dialog-model.component';
import { App } from '@capacitor/app';
import { WebsocketService } from './services/websocket.service';
import { UserIdleService } from './Controller/user-idle-manager/user-idle/user-idle.servies';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { CapacitorEvent } from 'capacitor-plugin-touch-event';
import { PushNotificationsController } from './Controller/PushNotificationsController';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    '(click)': '_toggle($event)',
    '(keydown)': '_keydown($event)',
    // '(mouseleave)': '_mouseleave($event)'
  },
})
export class AppComponent implements OnInit, OnDestroy {
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date;
  title = 'angular-idle-timeout';
  URL_LIST: any = ["/Login", "/Registration", "/ResetPassword"];
  LOGOUT_TIME: number = 300;

  constructor(public router?: Router, public userService?: ApiService,
    public customConfirmDialogModelComponent?: CustomConfirmDialogModelComponent, public websocketService?: WebsocketService,
    private Customidle?: UserIdleService) {
    this.userService.LOADER_SHOW_HIDE = true
    if (this.URL_LIST?.filter((item: any) => item == router?.url)?.length != 0) {
      this.userService.LOADER_SHOW_HIDE = false;
    } else {
      this.userService.LOADER_SHOW_HIDE = true;
    }
    router?.events?.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.Customidle.logout();
        if (this.URL_LIST?.filter((item: any) => item == event?.url)?.length == 0) {
          this.Customidle?.onStart(this.LOGOUT_TIME / 60, this.LOGOUT_TIME / 60, (value) => {
            if (value != null) {
              if (this.URL_LIST?.filter((item: any) => item == this.router?.url)?.length == 0) {
                let splitIdeTime: any = value?.split(":")
                if (splitIdeTime?.length != 0) {
                  if (splitIdeTime[0] == "0") {
                    let count = parseInt(splitIdeTime[1]);
                    this.userService.counter = count;
                    if (count < 30 && count > 0) {
                      this.userService.SHOW_SESSION = true
                    }
                    if (count == 0) {
                      this.userService.SHOW_SESSION = false;
                      this.userService.UserLogout(() => {
                        Customidle?.logout();
                        Customidle.idleTimerLeft = null;
                        this.router?.navigate(['/Login']);
                        websocketService.disconnect()
                        location.reload();
                      }, false, { lastactivetime: 0 });
                    }
                  }
                }
              }
            }
          });
        }
      }
    });
    this.AppEventEnabled()

    websocketService.listen('userDetails').subscribe((res: any) => {
      console.log(res, "WebsocketServiceUserDetails")
      if (res?.length != 0) {
        this.Customidle.logout();
        this.router?.navigate(['/Login']);
      }
    })
  }

  ngOnInit(): void {
    if (Capacitor.getPlatform() != 'web') {
      PushNotificationsController.LoadPushNotifications();
      CapacitorEvent.register().then((res) => { });
      CapacitorEvent.addListener('onUserLogout', (result: any) => {
        this.userService.UserLogout(() => {
          this.Customidle?.logout();
          this.Customidle.idleTimerLeft = null;
          this.router?.navigate(['/Login']);
          this.websocketService.disconnect()
          location.reload();
        }, false, { lastactivetime: 0 });
      });
      CapacitorEvent.addListener('OnTimerCountDown', (result: any) => {
        this.userService.COUNT_DOWN = msToTime(parseInt(result?.value));
        let splitIdeTime: any = this.userService.COUNT_DOWN?.split(":")
        if (splitIdeTime?.length != 0) {
          if (splitIdeTime[1] == "00") {
            let count = parseInt(splitIdeTime[2]);
            this.userService.counter = count;
            if (count <= 30 && count > 0) {
              this.userService.SHOW_SESSION = true
            }
            if (count == 0) {
              this.userService.SHOW_SESSION = false;
            }
          }
        }
      })
      function msToTime(duration) {
        var milliseconds = Math.floor((duration % 1000) / 100);
        var seconds: any = Math.floor((duration / 1000) % 60);
        var minutes: any = Math.floor((duration / (1000 * 60)) % 60);
        var hours: any = Math.floor((duration / (1000 * 60 * 60)) % 24);
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        return hours + ":" + minutes + ":" + seconds;
      }
    }

    document.addEventListener("visibilitychange", () => {
      if (this.URL_LIST?.filter((item: any) => item == this.router?.url)?.length == 0) {
        // if (document.hidden) {
        //   let date = new Date();
        //   date.setSeconds(this.LOGOUT_TIME);
        //   localStorage.setItem('ExpriedTime', date.getTime()?.toString());
        //   // this.userService?.UserSessionLogout(null, false, { lastactivetime: date.getTime() });
        // } else {
        //   let remanningTime: any = parseInt(localStorage.getItem('ExpriedTime')) - new Date().getTime();
        //   if (remanningTime < 0 || remanningTime == 0) {
        //     this.userService?.UserLogout(() => {
        //       this.userService.SHOW_SESSION = false;
        //       this.Customidle?.logout();
        //       this.router?.navigate(['/Login']);
        //       location.reload();
        //       this.websocketService.disconnect();
        //     }, false, { lastactivetime: 0 });
        //   }
        // }
      }
    });
    const registerNotifications = async () => {
      let permStatus = await PushNotifications.checkPermissions();
      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }
      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }
      await PushNotifications.register();
    }
    registerNotifications();
  }

  compareDates(a, b) {
    if (a < b) return -1;
    if (a > b) return +1;
    return 0;
  }

  isActiveCounter: number = 1;
  async AppEventEnabled() {
    await App.addListener('appUrlOpen', data => {
      console.log('App opened with URL:', data);
    });

    await App.addListener('appRestoredResult', data => {
      console.log('Restored state:', data);
    });

    await App.addListener('backButton', ({ canGoBack }) => { })

    await App.removeAllListeners().then(async () => {
      await App.addListener('backButton', ({ canGoBack }) => {
        if (canGoBack == false) {
          this.customConfirmDialogModelComponent?.YesNoDialogModel("Confirm", "Are you sure you want to exit?", (value: any) => {
            if (value?.value == 'Yes') {
              App.exitApp();
              this.userService?.UserLogout(() => {
                this.router?.navigate(['/Login']);
                this.websocketService.disconnect();
                if (Capacitor.getPlatform() === 'andorid') {
                  App.exitApp();
                }
              });
            }
          })
        } else {
          window.history.back();
        }
      });
    });
  }

  counter: any = 60;
  _toggle(event: any) {
    this.counter = 60;
    this.userService.counter = 60;
    this.userService.intervaltime = 0;
    this.userService.SHOW_SESSION = false
  }

  _keydown($event: any) {
  }

  ngOnDestroy(): void {
  }
}
