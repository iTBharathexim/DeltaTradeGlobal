import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'logo-animation',
  templateUrl: './logo-animation.component.html',
  styleUrls: ['./logo-animation.component.scss']
})
export class LogoAnimationComponent implements OnInit {
  @Input('type') type:any='main'
  constructor( public router: Router,
    public toastr: ToastrService,
    public route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: any) => {
      if (params?.type != undefined) {
        this.type=params?.type;
        console.log(params?.type, "LogoAnimationComponent")
        setTimeout(() => {
          router.navigate(['home'])
        }, 3000);
      }
    });
   }

  ngOnInit(): void {
    this.AnimationClass()
  }

  class1:any='svg-hide-1';
  class2:any='svg-hide-2';
  class3:any='svg-hide'
  AnimationClass(){
    this.class1='svg-hide-1';
    this.class2='svg-hide-2';
    this.class3='svg-hide'
    setTimeout(() => {
      this.class1='svg-show-1';
      setTimeout(() => {
        this.class2='svg-show-2'
      }, 500);
    }, 500);
  }

}
