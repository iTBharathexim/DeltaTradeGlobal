import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaxMinValidationService } from '../Controller/MaxMinValidationService';
import { ToastrService } from 'ngx-toastr';
import { ConfrimPasswordValidationService } from '../Controller/ConfrimPasswordValidationService';

@Component({
  selector: 'app-otp-page',
  templateUrl: './mpin-page.component.html',
  styleUrls: ['./mpin-page.component.scss']
})
export class MPINPageComponent implements OnInit {
  userForm: any = new FormGroup({
    MPIN: new FormControl(null, [Validators.required, MaxMinValidationService.checkLimit(6, 6)]),
    ConfirmMPIN: new FormControl(null, [Validators.required, MaxMinValidationService.checkLimit(6, 6)])
  }, {
    validators: ConfrimPasswordValidationService.matchValidatorWithMessage('MPIN', 'ConfirmMPIN', "MPIN Not Matched...")
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
      this.userService.UpdateLoginDetails(this.data?._id, this.userForm.value).subscribe((res1: any) => {
        console.log(res1, 'hfhffgffg')
        if (res1?.status) {
          this.toastr.success(res1?.msg);
          this.router.navigate(['/Login']);
        } else {
          this.toastr.error(res1?.msg);
        }
      })
    } else {
      this.toastr.error('Please fill all input box')
    }

    console.log(this.userForm.value, 'sdsgjdfgsdfdf')
  }

  RoleType: any = ''
  ChangesRoleType(role: any) {
    this.RoleType = role?.value;
  }
}
