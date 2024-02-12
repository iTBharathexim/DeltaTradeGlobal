import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  userForm: any = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });
  constructor(public userService: ApiService, public router: Router) {
    localStorage.removeItem('token');
  }

  ngOnInit(): void {
  }

  onFormSubmit() {
    this.userService.Login(this.userForm.value).subscribe((res: any) => {
      console.log(res, 'hfhffgffg')
      if (res?.docs?.token) {
        localStorage.setItem('token', res?.docs?.token)
        if (res?.docs?.data?.emailIdVerified == true && res?.docs?.data?.MobileOTPVerified == true) {
          if (res?.docs?.data?.MPIN!=undefined  && res?.docs?.data?.MPIN!=null && res?.docs?.data?.MPIN!='') {
            this.router.navigate(['/LiveTradeApp'])
          }else{
            let navigationExtras: NavigationExtras = {
              queryParams: {
                "item": JSON.stringify(res?.docs?.data)
              }
            };
            this.router.navigate(['/MPIN-Create'], navigationExtras); 
          }
        } else {
          let navigationExtras: NavigationExtras = {
            queryParams: {
              "item": JSON.stringify(res?.docs?.data)
            }
          };
          this.router.navigate(['/OtpEmail_OtpMobile'], navigationExtras);
        }
      } else {
        if (res?.docs == null) {
          alert("Somethings wrongs.....")
        } else {
          alert(res?.docs?.error)
        }
      }
    }, (err) => {
      alert(err?.error?.text);
      console.log(err, 'sdfsdhfsdklfhdsfksdfsdfds')
    })
    console.log(this.userForm.value, 'sdsgjdfgsdfdf')
  }

  RoleType: any = ''
  ChangesRoleType(role: any) {
    this.RoleType = role?.value;
  }
}
