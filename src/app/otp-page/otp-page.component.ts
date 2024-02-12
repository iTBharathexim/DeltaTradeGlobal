import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MaxMinValidationService } from '../Controller/MaxMinValidationService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp-page',
  templateUrl: './otp-page.component.html',
  styleUrls: ['./otp-page.component.scss']
})
export class OtpPageComponent implements OnInit {
  userForm: any = new FormGroup({
    MobileOTPVerified: new FormControl(null, [Validators.required, MaxMinValidationService.checkLimit(6, 6)]),
    emailIdVerified: new FormControl(null, [Validators.required, MaxMinValidationService.checkLimit(6, 6)])
  });
  data: any = null

  constructor(public userService: ApiService, public router: Router,
    public toastr: ToastrService,
    public route: ActivatedRoute) {
    localStorage.removeItem('token');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.data = JSON.parse(params["item"]);
      console.log(this.data, "data")
    });
  }

  onFormSubmit() {
    console.log(this.userForm, "this.userForm")
    if (this.userForm?.status != "INVALID") {
      if (this.data?.emailIdOTP == this.userForm.value?.emailIdVerified) {
        if (this.data?.MobileOTP == this.userForm.value?.MobileOTPVerified) {
          this.userService.UpdateLoginDetails(this.data?._id, { emailIdVerified: true, MobileOTPVerified: true }).subscribe((res1: any) => {
            console.log(res1, 'hfhffgffg')
            if (res1?.status) {
              this.toastr.success(res1?.msg);
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  "item": JSON.stringify(this.data)
                }
              };
              this.router.navigate(['/MPIN-Create'], navigationExtras);
            } else {
              this.toastr.success(res1?.msg);
            }
          })
        } else {
          this.toastr.error("Enter Otp not macthed....")
        }
      } else {
        this.toastr.error("Enter Otp not macthed....")
      }

    } else {
      this.toastr.error('Please fill all input box')
    }

    console.log(this.userForm.value, 'sdsgjdfgsdfdf')
  }

  RoleType: any = ''
  ChangesRoleType(role: any) {
    this.RoleType = role?.value;
  }

  SendOtpEmail() {
    this.userService.SendOtpEmail({ emailId: this.data?.emailId }).subscribe((res1: any) => {
      console.log(res1, 'hfhffgffg')
      if (res1?.status) {
        this.toastr.success(res1?.message);
      } else {
        this.toastr.error(res1?.message);
      }
    })
  }
}
