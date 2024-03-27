import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import $ from "jquery";
import { ApiService } from '../../services/api.service';
import { FCmController } from 'src/app/Controller/FCM-Controllor';
import { Capacitor } from '@capacitor/core';
import { CapacitorEvent } from 'capacitor-plugin-event';

@Component({
  selector: 'app-onboarding-screen',
  templateUrl: './onboarding-screen.component.html',
  styleUrls: ['./onboarding-screen.component.scss']
})
export class OnboardingScreenComponent implements OnInit {
  PAGE_VISIBLE: boolean = false;
  constructor(public router: Router,
    public fCmcontroller: FCmController,
    public userService: ApiService) {
    this.PAGE_VISIBLE = false;
  }

  ngOnInit(): void {
    this.PAGE_VISIBLE = true;
    this.loadAnimation();
    // if (this.fCmcontroller.getPlatform()?.toString() != 'web') {
    //   this.fCmcontroller.getDeviceId().then((DeviceId) => {
    //     this.userService.getDeviceRegister(DeviceId).subscribe((DeviceRes: any) => {
    //       if (DeviceRes?.data?.length != 0) {
    //         if (DeviceRes?.data[0]?.OnboardingScreen == true) {
    //           this.router.navigate((['/Login']))
    //           this.PAGE_VISIBLE = false;
    //         } else {
    //           this.PAGE_VISIBLE = true;
    //           setTimeout(() => {
    //             this.loadAnimation();
    //           }, 200);
    //         }
    //       } else {
    //         this.userService.DeviceRegister({ UserDevice: this.userService.getDeviceInfo(), deviceId: DeviceId, OnboardingScreen: false }).subscribe((DeviceRes: any) => {
    //           this.PAGE_VISIBLE = true;
    //           setTimeout(() => {
    //             this.loadAnimation();
    //           }, 200);
    //         });
    //       }
    //     })
    //   })
    // } else {
    //   this.router.navigate(['/Login'])
    //   this.PAGE_VISIBLE = false;
    //   // this.PAGE_VISIBLE = true;
    //   // setTimeout(() => {
    //   //   this.loadAnimation();
    //   // }, 200);
    // }
  }

  loadAnimation() {
    (function () {
      $(document).ready(function () {
        var walkthrough;
        walkthrough = {
          index: 0,
          nextScreen: function () {
            if (this.index < this.indexMax()) {
              this.index++;
              return this.updateScreen();
            }
          },
          prevScreen: function () {
            if (this.index > 0) {
              this.index--;
              return this.updateScreen();
            }
          },
          updateScreen: function () {
            this.reset();
            this.goTo(this.index);
            return this.setBtns();
          },
          setBtns: function () {
            var $lastBtn, $nextBtn, $prevBtn;
            $nextBtn = $('.next-screen');
            $prevBtn = $('.prev-screen');
            $lastBtn = $('.finish');
            if (walkthrough.index === walkthrough.indexMax()) {
              $nextBtn.prop('disabled', true);
              $prevBtn.prop('disabled', false);
              return $lastBtn.addClass('active').prop('disabled', false);
            } else if (walkthrough.index === 0) {
              $nextBtn.prop('disabled', false);
              $prevBtn.prop('disabled', true);
              return $lastBtn.removeClass('active').prop('disabled', true);
            } else {
              $nextBtn.prop('disabled', false);
              $prevBtn.prop('disabled', false);
              return $lastBtn.removeClass('active').prop('disabled', true);
            }
          },
          goTo: function (index) {
            $('.screen').eq(index).addClass('active');
            return $('.dot').eq(index).addClass('active');
          },
          reset: function () {
            return $('.screen, .dot').removeClass('active');
          },
          indexMax: function () {
            return $('.screen').length - 1;
          },
          closeModal: function () {
            $('.walkthrough, .shade').removeClass('reveal');
            return setTimeout((() => {
              $('.walkthrough, .shade').removeClass('show');
              this.index = 0;
              return this.updateScreen();
            }), 200);
          },
          openModal: function () {
            $('.walkthrough, .shade').addClass('show');
            setTimeout((() => {
              return $('.walkthrough, .shade').addClass('reveal');
            }), 200);
            return this.updateScreen();
          }
        };
        $('.next-screen').click(function () {
          return walkthrough.nextScreen();
        });
        $('.prev-screen').click(function () {
          return walkthrough.prevScreen();
        });
        $('.close').click(function () {
          return walkthrough.closeModal();
        });
        $('.open-walkthrough').click(function () {
          return walkthrough.openModal();
        });
        walkthrough.openModal();
        $(window).on('resize', () => {
          this.addULheight()
        });
        // Optionally use arrow keys to navigate walkthrough
        return $(document).keydown(function (e) {
          switch (e.which) {
            case 37:
              // left
              walkthrough.prevScreen();
              break;
            case 38:
              // up
              walkthrough.openModal();
              break;
            case 39:
              // right
              walkthrough.nextScreen();
              break;
            case 40:
              // down
              walkthrough.closeModal();
              break;
            default:
              return;
          }
          e.preventDefault();
        });
      });
    }).call(this);
    this.addULheight();
  }

  navigateUrlHome(url: any) {
    this.fCmcontroller.getDeviceId().then((DeviceRes) => {
      console.log(DeviceRes, "getDeviceId")
      if (Capacitor.getPlatform() != 'web') {
        CapacitorEvent.onBoardingScreenCompleted().then((res)=>{
            this.router.navigate([url])
        })
      }
      // this.userService.updateDeviceRegister(DeviceRes, { OnboardingScreen: true }).subscribe((DeviceRes: any) => {
      // });
    })
  }

  addULheight() {
    let elem1: any = document.querySelector(".walkthrough");
    if (elem1 != undefined && elem1 != null) {
      let rect = elem1.getBoundingClientRect();
      $('.screen .logo').css({ 'height': (parseInt(rect?.height) - 80) + 'px', 'width': (parseInt(rect?.width)) + 'px' })
    }
  }

}
