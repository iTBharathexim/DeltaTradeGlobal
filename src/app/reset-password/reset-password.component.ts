import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { UploadServiceValidatorService } from '../Component/form-components/Upload/service/upload-service-validator.service';
import { ToastrService } from 'ngx-toastr';
import { ConfrimPasswordValidationService } from '../Controller/ConfrimPasswordValidationService';
import { Validators } from '@angular/forms';
import { MaxMinValidationService } from '../Controller/MaxMinValidationService';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(public userService: ApiService,
    public router: Router,
    public toastr: ToastrService,
    public validator: UploadServiceValidatorService) {
    localStorage.removeItem('token');
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.validator.buildForm({
        emailId: {
          type: "EmailButton",
          InputType: "text",
          value: "",
          label: "",
          rules: {
            required: true,
          },
          placeholderText: 'Your Email Id',
          ButtonText: "Get OTP",
          DivStyle: `display: flex !important;`,
          InputStyle: `border-radius: 20px 0px 0px 20px;`,
          buttonStyle: `border-radius: 0px 20px 20px 0px;background-color: transparent;color: black;`,
          buttondisabled: false,
          innerHTML:``,
          KeyPressCallBack: (value: any) => {
          },
          callback: (value: any) => {
            if (value?.form?.controls?.emailId?.errors == null || value?.form?.controls?.emailId?.errors == undefined) {
              this.userService.CheckUserExit({ emailId: value?.form?.value?.emailId }).subscribe((res: any) => {
                console.log(res, "CheckUserExit")
                if (res?.length != 0) {
                  this.userService.SendOtpEmail({ emailId: value?.form?.value?.emailId, subject: "OTP for MPIN reset." }).subscribe((res1: any) => {
                    if (res1?.status) {
                      value.field[1]['divhide'] = false;
                      this.toastr.success(res1?.message);
                    } else {
                      value.field[1]['divhide'] = true;
                      this.toastr.error(res1?.message);
                    }
                  })
                } else {
                  value.field[1]['divhide'] = true;
                  this.toastr.error("User not exit...")
                }
              })
            } else {
              value.field[1]['divhide'] = true;
              this.toastr.error('Email id not valid...');
            }
          }
        },
        EmailOTP: {
          type: "InputButton",
          InputType: "number",
          value: "",
          label: "",
          showhide: false,
          rules: {
            required: true,
          },
          divhide: true,
          placeholderText: 'Enter 6 digit OTP',
          ButtonText: "Verify",
          DivStyle: `display: flex !important;`,
          InputStyle: `border-radius: 20px 0px 0px 20px;`,
          buttonStyle: `border-radius: 0px 20px 20px 0px;background-color: transparent;color: black;`,
          buttondisabled: false,
          InputValidators: [Validators.required, MaxMinValidationService.checkLimit(6, 6)],
          callback: (value: any) => {
            if (value?.form?.controls?.emailId?.errors == null || value?.form?.controls?.emailId?.errors == undefined) {
              this.userService.CheckUserExit({ emailId: value?.form?.value?.emailId }).subscribe((res: any) => {
                console.log(res, "CheckUserExit")
                if (res?.length != 0) {
                  if (res[0]?.emailIdOTP == value?.form?.value?.EmailOTP) {
                    value.field[2]['divhide'] = false;
                    value.field[3]['divhide'] = false;
                  } else {
                    this.toastr.error("Enter Otp not macthed....")
                  }
                } else {
                  value.field[2]['divhide'] = true;
                  value.field[3]['divhide'] = true;
                  this.toastr.error('Email id not valid...');
                }
              })
            }
          }
        },
        MPIN: {
          type: "MPIN",
          InputType: "number",
          value: "",
          label: "",
          showhide: false,
          rules: {
            required: true,
          },
          divhide: true,
          placeholderText: 'Create 6 digit MPIN',
          ButtonText: "Verify",
          DivStyle: `display: flex !important;`,
          InputStyle: `border-radius: 20px 0px 0px 20px;`,
          buttonStyle: `border-radius: 0px 20px 20px 0px;background-color: transparent;color: black;`,
          buttondisabled: false,
          InputValidators: [Validators.required, MaxMinValidationService.checkLimit(6, 6)],
        },
        ConfirmMPIN: {
          type: "MPIN",
          InputType: "number",
          value: "",
          label: "",
          showhide: false,
          rules: {
            required: true,
          },
          divhide: true,
          placeholderText: 'Confirm 6 digit MPIN',
          ButtonText: "Verify",
          DivStyle: `display: flex !important;`,
          InputStyle: `border-radius: 20px 0px 0px 20px;`,
          buttonStyle: `border-radius: 0px 20px 20px 0px;background-color: transparent;color: black;`,
          buttondisabled: false,
          InputValidators: [Validators.required, MaxMinValidationService.checkLimit(6, 6)],
          validators: ConfrimPasswordValidationService.matchValidatorWithMessage('MPIN', 'ConfirmMPIN', 'Comfirm MPIN not matched....'),
        },
        hrefLink: {
          type: "hrefLink",
          value: "",
          label: "",
          showhide: false,
          rules: {
            required: true,
          },
          divhide: false,
          hrefLinkList:[{name:'Sign In',link:'/Login'}]
        },
      }, 'UserResetMPIN');
    }, 200);
  }

  onSubmit(value: any) {
    this.userService.CheckUserExit({ emailId: value?.emailId }).subscribe((res: any) => {
      console.log(res, "CheckUserExit")
      if (res?.length != 0) {
        this.userService.UpdateLoginDetails(res[0]?._id, { MPIN: value?.MPIN, isLoggin: false }).subscribe((res1: any) => {
          console.log(res1, "UpdateLoginDetails")
          if (res1?.status == true) {
            this.toastr.success("Sucessfully changed your MPIN...")
            this.router.navigate(['/Login'])
          } else {
            this.toastr.error(res1?.msg);
          }
        });
      } else {
        this.toastr.error('Email id not valid...');
      }
    })
    console.log(value, "yfhgfghfghfg")
  }

  RoleType: any = ''
  ChangesRoleType(role: any) {
    this.RoleType = role?.value;
  }
}
