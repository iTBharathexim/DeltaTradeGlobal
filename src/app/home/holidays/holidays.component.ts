import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {
  DISPLAY_MODE:any='';

  constructor(public apiservice: ApiService) { }

  ngOnInit(): void {
  }

}
