import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaxMinValidationService } from '../Controller/MaxMinValidationService';
import { ConfrimPasswordValidationService } from '../Controller/ConfrimPasswordValidationService';
import { ToastrService } from 'ngx-toastr';
import moment from 'moment';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  userForm: any = new FormGroup({
    mobileNo: new FormControl(null, [Validators.required, MaxMinValidationService.checkLimit(10, 10)]),
    MobileOTPVerified: new FormControl(null, []),
    emailId: new FormControl(null, [Validators.required]),
    emailIdVerified: new FormControl(null, [Validators.required, MaxMinValidationService.checkLimit(6, 6)]),
    termscondition: new FormControl(false, [Validators.required]),
  });
  userForm2: any = new FormGroup({
    MPIN: new FormControl(null, [Validators.required, MaxMinValidationService.checkLimit(6, 6)]),
    ConfirmMPIN: new FormControl(null, [Validators.required, MaxMinValidationService.checkLimit(6, 6)])
  }, {
    validators: ConfrimPasswordValidationService.matchValidatorWithMessage('MPIN', 'ConfirmMPIN', 'Comfirm MPIN not matched....')
  });
  userForm3: any = new FormGroup({
    companyName: new FormControl(),
    firstName: new FormControl(),
  });
  userForm4: any = new FormGroup({
    couponCodeName: new FormControl(null, [Validators.required, MaxMinValidationService.setMaxValue(6,6)]),
  });
  isLinear = false;
  MOBILE_EMAIL_VALIDATION: boolean = false;

  constructor(public userService: ApiService,
    public router: Router,
    public toastr: ToastrService,
    public route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: any) => {
      if (params?.item != undefined) {
        let PARSE_DATA: any = JSON.parse(params?.item)
        this.userForm.controls['emailId']?.setValue(PARSE_DATA?.item);
        this.SendOtpEmail();
      }
    });
    if (localStorage.getItem('token') != undefined) {
      this.userForm.controls['emailId'].setValue(localStorage.getItem('token'))
      this.userService.CheckUserExit({ emailId: localStorage.getItem('token') }).subscribe((res: any) => {
        this.userService.UpdateLoginDetails(res[0]?._id, { isLoggin: false }).subscribe((res) => {
          localStorage.removeItem('token');
          window?.clearInterval(this.userService.TIME_INTERVAL);
        })
      });
    }
  }
  MPIN_SHOW: boolean = false;
  USER_DETAILS: boolean = false;
  CURREENT_DATE: string = moment().format('YYYY-MM-DD')

  ngOnInit(): void {
  }

  onFormEmailValidation() {
    if (this.VERIFY_OTP_EMAIL == true && this.VERIFY_OTP_MOBILE == true) {
      this.MPIN_SHOW = true;
      this.SEND_OTP_EMAIL = false;
      this.USER_DETAILS = false
      this.CouponCodeValidation = false;
      this.EMAIL_VALIDATION = false;
      this.SEND_OTP_EMAIL = false;
      this.MOBILE_EMAIL_VALIDATION = true;
    }
  }

  onFormMPINValidation() {
    if (this.userForm2?.status != "INVALID") {
      this.userService.CheckUserExit({ emailId: this.userForm.value?.emailId }).subscribe((res: any) => {
        this.userService.UpdateLoginDetails(res[0]?._id, this.userForm2.value).subscribe((res1: any) => {
          if (res1?.status) {
            this.USER_DETAILS = true
          } else {
            this.toastr.success(res1?.msg);
            this.USER_DETAILS = false
          }
        })
      }, (err) => {
        this.toastr.error(err?.error?.text);
        this.USER_DETAILS = false
        console.log(err, 'sdfsdhfsdklfhdsfksdfsdfds')
      })
    } else {
      this.USER_DETAILS = false
      this.toastr.error('Please fill all input box')
    }
  }

  onFormUpdateUserdeatils() {
    if (this.userForm3?.status != "INVALID") {
      this.userService.CheckUserExit({ emailId: this.userForm.value?.emailId }).subscribe((res: any) => {
        this.userForm3.value.termscondition = true;
        this.userForm3.value.userId = this.userForm3.value.firstName?.replace(/ /g, '')?.toLowerCase() + '_' + this.generateotp();
        this.userService.UpdateLoginDetails(res[0]?._id, this.userForm3.value).subscribe((res1: any) => {
          if (res1?.status) {
            this.CouponCodeValidation = true
          } else {
            this.toastr.success(res1?.msg);
            this.CouponCodeValidation = false
          }
        })
      }, (err) => {
        this.toastr.error(err?.error?.text);
        this.CouponCodeValidation = false
        console.log(err, 'sdfsdhfsdklfhdsfksdfsdfds')
      })
    } else {
      this.CouponCodeValidation = false
      this.toastr.error('Please fill all input box')
    }
  }

  CouponCodeValidation: boolean = false;
  CouponData: any = [];

  onFormCouponCodeValidation() {
    this.userService.CouponCodeValidation(this.userForm4.value).subscribe((res: any) => {
      this.CouponData = res
      if (res?.status == true) {
        this.userService.CheckUserExit({ emailId: this.userForm.value?.emailId }).subscribe((res: any) => {
          this.userService.UpdateLoginDetails(res[0]?._id, {
            DeviceInfoRegistartion: this.userService.getDeviceInfo(),
            CouponVerified: true, FreeTrailPeroid: true,
            FreeTrailPeroidStratDate: moment().format('dddd, MMMM DD, YYYY h:mm A'),
            FreeTrailPeroidEndDate: moment(this.addDays(new Date(), this.CouponData?.data[0]?.TrailDays)).format('dddd, MMMM DD, YYYY h:mm A'),
            ExpiredTimeStamp: moment(this.addDays(new Date(), this.CouponData?.data[0]?.TrailDays)).unix()
          }).subscribe((res1: any) => {
            if (res1?.status) {
            } else {
              this.toastr.success(res1?.msg);
              this.CouponCodeValidation = false
            }
          })
        }, (err) => {
          this.toastr.error(err?.error?.text);
          this.CouponCodeValidation = false
          console.log(err, 'sdfsdhfsdklfhdsfksdfsdfds')
        })
      }
    }, (err) => {
      this.toastr.error(err?.error?.text);
      console.log(err, 'sdfsdhfsdklfhdsfksdfsdfds')
    })
  }

  onFormUpdateCouponCode() {
    console.log(this.userForm3, this.addDays(new Date(), this.CouponData?.data[0]?.TrailDate), this.CouponData, "onFormUpdateCouponCode")
    if (this.userForm4?.status != "INVALID") {
      if (this.CouponData?.status == true) {

      } else {
        this.toastr.error("Your coupon code is not valid...")
      }
    } else {
      this.CouponCodeValidation = false
      this.toastr.error('Please fill all input box')
    }
  }

  addDays(date: any, days: any) {
    var result = new Date();
    result.setDate(result.getDate() + parseInt(days));
    return result;
  }

  RoleType: any = ''
  ChangesRoleType(role: any) {
    this.RoleType = role?.value;
  }

  generateotp() {
    var digits = '1234567890';
    var otp = ''
    for (let i = 0; i < 4; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }

  EMAIL_VALIDATION: boolean = false;
  MOBILE_VALIDATION: boolean = false;
  SEND_OTP_EMAIL: boolean = false;
  SendOtpEmail() {
    if (this.userForm.value?.emailId != "" && this.userForm.value?.emailId != undefined && this.userForm.value?.emailId != null && this.userForm.controls?.emailId?.errors?.Macthed == undefined) {
      this.userService.CheckUserExit({ emailId: this.userForm.value?.emailId }).subscribe((res: any) => {
        if (res[0]?.CouponVerified == false || res[0]?.emailIdVerified == false || res?.length == 0) {
          if (res?.length == 0) {
            this.userForm.value.role = "TradeApp"
            this.userService.Registration(this.userForm.value).subscribe((res1: any) => {
              if (res1?.status) {
                this.userService.SendOtpEmail({ emailId: this.userForm.value?.emailId, subject: "OTP for Registration" }).subscribe((res1: any) => {
                  if (res1?.status) {
                    this.SEND_OTP_EMAIL = true;
                    this.toastr.success("OTP sent to your mail id");
                  } else {
                    this.SEND_OTP_EMAIL = false;
                    this.toastr.error(res1?.message);
                  }
                })
              } else {
                this.toastr.error(res1?.msg);
              }
            })
          } else {
            this.SEND_OTP_EMAIL = false;
            this.MPIN_SHOW = false
            this.USER_DETAILS = false
            this.CouponCodeValidation = false;
            this.EMAIL_VALIDATION = false;
            this.MOBILE_VALIDATION = false;
            this.MOBILE_EMAIL_VALIDATION = false;
            if (res[0]?.emailIdVerified == true) {
              this.MOBILE_VALIDATION = false;
              this.MPIN_SHOW = false
              this.USER_DETAILS = false
              this.CouponCodeValidation = false;
              this.EMAIL_VALIDATION = false;
              this.MOBILE_EMAIL_VALIDATION = true;
              if (res[0]?.MobileOTPVerified == true) {
                this.MOBILE_VALIDATION = false;
                this.SEND_OTP_EMAIL = false;
                this.MPIN_SHOW = false
                this.USER_DETAILS = false
                this.EMAIL_VALIDATION = false;
                this.MOBILE_EMAIL_VALIDATION = true;
                if (res[0]?.MPIN != undefined) {
                  this.MOBILE_EMAIL_VALIDATION = true;
                  this.MOBILE_VALIDATION = false;
                  this.SEND_OTP_EMAIL = false;
                  this.MPIN_SHOW = false
                  this.USER_DETAILS = false
                  this.EMAIL_VALIDATION = false;
                  if (res[0]?.companyName != undefined) {
                    this.MOBILE_EMAIL_VALIDATION = true;
                    this.MOBILE_VALIDATION = false;
                    this.SEND_OTP_EMAIL = false;
                    this.MPIN_SHOW = false
                    this.USER_DETAILS = false
                    this.EMAIL_VALIDATION = false;
                    if (res[0]?.CouponVerified == true) {
                      this.MOBILE_EMAIL_VALIDATION = true;
                      this.SEND_OTP_EMAIL = false;
                      this.MPIN_SHOW = false
                      this.USER_DETAILS = false
                      this.CouponCodeValidation = false;
                      this.EMAIL_VALIDATION = false;
                      this.router.navigate(['/Login'])
                    } else {
                      this.MOBILE_EMAIL_VALIDATION = true;
                      this.MOBILE_VALIDATION = false;
                      this.SEND_OTP_EMAIL = false;
                      this.MPIN_SHOW = false
                      this.USER_DETAILS = false
                      this.CouponCodeValidation = true;
                      this.EMAIL_VALIDATION = true;
                    }
                  } else {
                    this.MOBILE_EMAIL_VALIDATION = true;
                    this.MOBILE_VALIDATION = false;
                    this.SEND_OTP_EMAIL = false;
                    this.MPIN_SHOW = false
                    this.CouponCodeValidation = false
                    this.USER_DETAILS = true;
                    this.EMAIL_VALIDATION = true;
                  }
                } else {
                  this.MOBILE_EMAIL_VALIDATION = true;
                  this.SEND_OTP_EMAIL = false;
                  this.CouponCodeValidation = false
                  this.USER_DETAILS = false;
                  this.MPIN_SHOW = true;
                  this.EMAIL_VALIDATION = true;
                }
              } else {
                this.SEND_OTP_EMAIL = false;
                this.CouponCodeValidation = false
                this.USER_DETAILS = false;
                this.MPIN_SHOW = false;
                this.EMAIL_VALIDATION = true;
                this.MOBILE_VALIDATION = true;
                this.MOBILE_EMAIL_VALIDATION = false;
              }
            } else {
              this.MOBILE_EMAIL_VALIDATION = false;
              this.MOBILE_VALIDATION = false;
              this.MPIN_SHOW = false
              this.CouponCodeValidation = false
              this.USER_DETAILS = false;
              this.EMAIL_VALIDATION = false;
              this.userService.SendOtpEmail({ emailId: this.userForm.value?.emailId, subject: "OTP for Registration" }).subscribe((res1: any) => {
                if (res1?.status) {
                  this.SEND_OTP_EMAIL = true;
                  this.toastr.success("OTP sent to your mail id");
                } else {
                  this.SEND_OTP_EMAIL = false;
                  this.toastr.error(res1?.message);
                }
              })
            }
          }
        } else {
          this.EMAIL_VALIDATION = false;
          this.toastr.error("Email ID already exists...")
        }
      }, (err) => {
        this.EMAIL_VALIDATION = false;
        this.toastr.error(err?.error?.text);
        console.log(err, 'sdfsdhfsdklfhdsfksdfsdfds')
      })
    } else {
      this.EMAIL_VALIDATION = false;
      this.toastr.error('Please fill all input box')
    }
  }

  VERIFY_OTP_EMAIL: boolean = false;
  VerifyOtpEmail() {
    if (this.userForm.value?.emailIdVerified != "" && this.userForm.value?.emailIdVerified != undefined && this.userForm.value?.emailIdVerified != null && this.userForm.controls?.emailIdVerified?.errors == undefined) {
      this.userService.CheckUserExit({ emailId: this.userForm.value?.emailId }).subscribe((res: any) => {
        if (res[0]?.emailIdOTP == this.userForm.value?.emailIdVerified) {
          this.userService.UpdateLoginDetails(res[0]?._id, { emailIdVerified: true }).subscribe((res1: any) => {
            if (res1?.status) {
              this.VERIFY_OTP_EMAIL = true;
              this.MOBILE_VALIDATION = true;
            } else {
              this.MOBILE_VALIDATION = false;
              this.toastr.success(res1?.msg);
            }
          })
        } else {
          this.VERIFY_OTP_EMAIL = false
          this.toastr.error("Wrong OTP....")
        }
      }, (err) => {
        this.VERIFY_OTP_EMAIL = false
        this.toastr.error(err?.error?.text);
        console.log(err, 'sdfsdhfsdklfhdsfksdfsdfds')
      })
    } else {
      this.SEND_OTP_EMAIL = false;
      this.toastr.error('Please fill all input box')
    }
  }

  SEND_OTP_MOBILE: boolean = false;
  SendOtpMOBILE() {
    if (this.userForm.value?.mobileNo != "" && this.userForm.value?.mobileNo != undefined && this.userForm.value?.mobileNo != null && this.userForm.controls?.mobileNo?.errors?.Macthed == undefined) {
      this.userService.CheckUserExit({ emailId: this.userForm.value?.emailId }).subscribe((res: any) => {
        this.userService.UpdateLoginDetails(res[0]?._id, { mobileNo: this.userForm.value?.mobileNo }).subscribe((res1: any) => {
          this.userService.SendOtpMobile({ otp: res[0]?.MobileOTP, mobile: this.userForm.value?.mobileNo, emailId: this.userForm.value?.emailId }).subscribe((res1: any) => {
            if (res1?.status) {
              this.SEND_OTP_MOBILE = true;
              this.toastr.success("OTP sent to your Mobile No.");
            } else {
              this.SEND_OTP_MOBILE = false;
              this.toastr.error(res1?.message);
            }
          })
        });
      });
    } else {
      this.SEND_OTP_MOBILE = false;
      this.toastr.error('Please fill all input box')
    }
  }

  VERIFY_OTP_MOBILE: boolean = false;
  VerifyOtpMobile() {
    if (this.userForm.value?.MobileOTPVerified != "" && this.userForm.value?.MobileOTPVerified != undefined && this.userForm.value?.MobileOTPVerified != null && this.userForm.controls?.MobileOTPVerified?.errors == undefined) {
      this.userService.CheckUserExit({ emailId: this.userForm.value?.emailId }).subscribe((res: any) => {
        if (res[0]?.MobileOTP == this.userForm.value?.MobileOTPVerified) {
          this.userService.UpdateLoginDetails(res[0]?._id, { MobileOTPVerified: true }).subscribe((res1: any) => {
            if (res1?.status) {
              this.VERIFY_OTP_MOBILE = true;
              if (this.VERIFY_OTP_EMAIL == false) {
                this.VERIFY_OTP_EMAIL = true;
              }
            } else {
              this.toastr.success(res1?.msg);
            }
          })
        } else {
          this.VERIFY_OTP_MOBILE = false
          this.toastr.error("Wrong OTP....")
        }
      }, (err) => {
        this.toastr.error(err?.error?.text);
        console.log(err, 'sdfsdhfsdklfhdsfksdfsdfds')
      })
    } else {
      this.SEND_OTP_EMAIL = false;
      this.toastr.error('Please fill all input box')
    }
  }

  OpenPopup(TermsofService_PANEL: any) {
    TermsofService_PANEL?.displayShow
  }

  VIEW_SBSCRIPTION_PANEL: boolean = false;
  addToken() {
    localStorage.setItem('token', this.userForm.value?.emailId);
    this.VIEW_SBSCRIPTION_PANEL = false;
    setTimeout(() => {
      this.VIEW_SBSCRIPTION_PANEL = true;
    }, 300);
  }

}
