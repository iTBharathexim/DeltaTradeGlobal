import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as MyPlugin from '../../Controller/plugins'
import { Capacitor, registerPlugin } from "@capacitor/core";

@Component({
  selector: 'app-fxmargin-details',
  templateUrl: './fxtrigger.component.html',
  styleUrls: ['./fxtrigger.component.scss']
})
export class FXTriggerComponent implements OnInit {

  constructor(public apiUser: ApiService) { }

  async ngOnInit() {
    this.apiUser.loadData();
  }

  CreateMargin(value: any, type: any) {
    let Array_to_Object: any = {}
    Array_to_Object[type]={}
    value?.forEach((element: any) => {
      Array_to_Object[type][element?.key] = {
        TriggerRate: element?.TriggerRate,
        LiveRate: element?.LiveRate,
      }
    });
    Array_to_Object['userId'] = this.apiUser.UserData?._id;
    console.log(Array_to_Object,"Array_to_Object")
    this.apiUser.CreateFXTrigger(Array_to_Object).subscribe((res: any) => {
      this.apiUser.loadData();
    })
  }

  MarginUpdate(value: any, type: any) {
    let Array_to_Object: any = {}
    Array_to_Object[type]={}
    value?.forEach((element: any) => {
      Array_to_Object[type][element?.key] = {
        TriggerRate: element?.TriggerRate,
        LiveRate: element?.LiveRate,
      }
    });
    this.apiUser.TriggerUpdate(Array_to_Object, this.apiUser.UserData?._id).subscribe((res: any) => {
      this.apiUser.loadData()
    })
  }
}
