import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { CustomConfirmDialogModelComponent } from './Component/custom-confirm-dialog-model/custom-confirm-dialog-model.component';
import { App } from '@capacitor/app';
import { WebsocketService } from './services/websocket.service';
import { UserIdleService } from './Controller/user-idle-manager/user-idle/user-idle.servies';
import { PushNotifications } from '@capacitor/push-notifications';

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
  constructor(public router?: Router, public userService?: ApiService,
    public customConfirmDialogModelComponent?: CustomConfirmDialogModelComponent, public websocketService?: WebsocketService,
    private Customidle?: UserIdleService) {
    router?.events?.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.Customidle.logout();
        if (this.URL_LIST?.filter((item: any) => item == event?.url)?.length == 0) {
          this.Customidle?.onStart(2, 2, (value) => {
            console.log(value,"onStart")
            if (value != null) {
              if (this.URL_LIST?.filter((item: any) => item == this.router?.url)?.length == 0) {
                let splitIdeTime: any = value?.split(":")
                if (splitIdeTime?.length != 0) {
                  if (splitIdeTime[0]=="0") {
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
                      });
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

  }

  ngOnInit(): void {
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
    // Get FCM token instead of the APN one returned by Capacitor
    // Enable the auto initialization of the library
   

    // this.websocketService?.listen('test').subscribe((res) => {
    //   console.log(res, "socket.io")
    //   this.userService?.getUserOb().then((res1: any) => {
    //     console.log(res1, "hkjhjkh")
    //     if (res1?.length != 0) {
    //       this.websocketService.emit('usersession', {
    //         url: `${this.userService?.apibase}/LiveTradeApp/update`,
    //         updatedata: {
    //           id: res1?._id,
    //           data: {
    //             UserSession: {
    //               time: new Date(),
    //               userId: res1?._id
    //             }
    //           }
    //         }
    //       })
    //     }
    //   })
    // })
  }

  isActiveCounter: number = 1;
  async AppEventEnabled() {

    // setInterval(async () => {
    //   let { isActive } = await App.getState();
    //   if (isActive == false) {
    //     this.userService.SHOW_SESSION = false;
    //     this.userService._mouseleave(App);
    //     this.isActiveCounter = 0;
    //     this.userService.intervaltime = 0;
    //   } else {
    //     this.isActiveCounter = 1
    //   }
    //   this.isActiveCounter++;
    //   console.log(isActive, this.isActiveCounter, "isActiveCounter")
    // }, this.userService?.intervaltime);
    // await App.addListener('appStateChange', async ({ isActive }) => {
    //   console.log('App state changed. Is active?', isActive);
    // });

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
