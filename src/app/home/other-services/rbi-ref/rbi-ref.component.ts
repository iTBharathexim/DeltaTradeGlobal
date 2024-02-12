import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-rbi-ref',
  templateUrl: './rbi-ref.component.html',
  styleUrls: ['./rbi-ref.component.scss']
})
export class RbiRefComponent implements OnInit {
   RBI_REF_DATA:any=[];
   DISPLAY_MODE:any=''
  constructor(public apiUser: ApiService) { }

  ngOnInit(): void {
    this.apiUser.getRbiRef().subscribe((res: any) => {
      console.log(res, "getRbiRef")
      this.RBI_REF_DATA=res;
    })
  }

}
