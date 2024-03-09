import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  userForm: any = new FormGroup({
    Subject: new FormControl(null,[Validators.required]),
    Message: new FormControl(null,Validators.required)
  });
  constructor(public toastr: ToastrService,
    public route: ActivatedRoute,
    public userService: ApiService) { 
      this.route.queryParams.subscribe((params: any) => {
        if (params?.item != undefined) {
          let PARSE_DATA: any = JSON.parse(params?.item)
          this.userForm.controls['Subject']?.setValue(PARSE_DATA?.item);
          console.log(PARSE_DATA, "RegistrationPageComponent")
        }
      });
    }

  ngOnInit(): void {
   
  }

  validate(){
    console.log(this.userForm)
    if (this.userForm.status!="INVALID") {
      this.userService.getUserOb().then((res:any)=>{
        console.log(res,"getUserOb");
        this.userForm.value['CompanyName']=res?.companyName;
        this.userForm.value['Name']=res?.firstName;
        this.userForm.value['EmailId']=res?.emailId;
        this.userForm.value['Phone']=res?.mobileNo;      
        this.userService.SendContactUsEmail(this.userForm.value).subscribe((r:any)=>{
          console.log(r,"dsfsdfdsfdfs")
          if (r?.status==true) {
            this.toastr.success("Message sent successfully")
            this.userForm?.reset();
          }
        })
      })
    }else{
      this.toastr.error("Field should not be empty...")
    }
  }

}
