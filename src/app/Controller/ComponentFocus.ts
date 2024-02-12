import { Directive, ElementRef, HostListener } from "@angular/core";
import { ApiService } from "../services/api.service";
import { Router } from "@angular/router";

@Directive({
  selector: '[componentFocus]'
})
export class ComponentFocus {
  COUNTER:number=0;
  URL_LIST: any = ["/Login", "/Registration", "/ResetPassword"];

  constructor(private el: ElementRef,public userService?: ApiService,public router?: Router) {
    console.log(el,"fhgfghfhgfhf")
  }

  @HostListener('window:focus')
  componentFocus() {
    console.log(`component has focus, element`);
  }
  @HostListener('document:mouseenter') mouseenter() {
    // this.UserLoginSateChange()
    console.log("mouseenter...")
  }
  @HostListener('document:mouseleave') mouseleave() {
    // this.UserLoginSateChange();
    console.log("mouseleave...")
  }
  
  UserLoginSateChange(){
    if (this.URL_LIST?.filter((item: any) => item == this.router?.url)?.length == 0) {
      if (this.COUNTER==0) {
        this.userService?.UserSessionLogout(() => {
          this.COUNTER=1;
        }, true)
      }else{
        this.userService?.UserSessionLogout(() => {
          this.COUNTER=0;
        }, false)
      }
    }
  }
}