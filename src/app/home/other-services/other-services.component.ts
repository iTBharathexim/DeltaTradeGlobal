import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-other-services',
  templateUrl: './other-services.component.html',
  styleUrls: ['./other-services.component.scss']
})
export class OtherServicesComponent implements OnInit {

  constructor( public router: Router) { }

  ngOnInit(): void {
  }

  clickService(value:any){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "item": JSON.stringify({ item:value})
      }
    };
    this.router.navigate(["/ContactUs"], navigationExtras);
  }

}
