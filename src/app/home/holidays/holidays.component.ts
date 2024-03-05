import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {
  DISPLAY_MODE:any='';
  HOLIDAYS_FILTER_DATA:any=[];
  constructor(public apiservice: ApiService) {
    this.HOLIDAYS_FILTER_DATA=apiservice.HOLIDAYS_INDIA;
   }

  ngOnInit(): void {
  }
   OneChar(str:any){
    return str?.charAt(0)
   }

   filterHolidays(event:any){
    this.HOLIDAYS_FILTER_DATA=this.apiservice.HOLIDAYS_INDIA.filter((item:any)=>item?.name?.toLowerCase()?.indexOf(event?.value?.toLowerCase())!=-1 || 
    item?.date?.toLowerCase()?.indexOf(event?.value?.toLowerCase())!=-1 || item?.days?.toLowerCase()?.indexOf(event?.value?.toLowerCase())!=-1);
    if (this.HOLIDAYS_FILTER_DATA?.length==0) {
      this.HOLIDAYS_FILTER_DATA=this.apiservice.HOLIDAYS_INDIA;
    }
   }
}
