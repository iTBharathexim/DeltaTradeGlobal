import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { FCmController } from '../../Controller/FCM-Controllor';

@Component({
  selector: 'app-fxmargin-details',
  templateUrl: './fxtrigger.component.html',
  styleUrls: ['./fxtrigger.component.scss']
})
export class FXTriggerComponent implements OnInit {

  constructor(public apiUser: ApiService, public toastor: ToastrService, public fCmcontroller: FCmController) { }

  async ngOnInit() {
    this.apiUser.loadData();
  }

  CreateMargin(value: any, type: any) {
    let Array_to_Object: any = {}
    Array_to_Object[type] = {}
    value?.forEach((element: any) => {
      Array_to_Object[type][element?.key] = {
        TriggerRate: element?.TriggerRate,
        LiveRate: element?.LiveRate,
        StatusTrigger:false
      }
    });
    Array_to_Object['userId'] = this.apiUser.UserData?._id;
    this.apiUser.CreateFXTrigger(Array_to_Object).subscribe((res: any) => {
      if (this.fCmcontroller.getPlatform()?.toString() != 'web') {
        this.fCmcontroller.getDeviceId().then((userId: any) => {
          this.apiUser.TriggerUpdateDeviceId(userId, this.apiUser.UserData?._id).subscribe((res: any) => {
            this.toastor.success("Added Sucessfully...");
            this.apiUser.loadData();
          })
        })
      }
    })
  }

  MarginUpdate(value: any, type: any) {
    let Array_to_Object: any = {}
    Array_to_Object[type] = {}
    value?.forEach((element: any) => {
      Array_to_Object[type][element?.key] = {
        TriggerRate: element?.TriggerRate,
        LiveRate: element?.LiveRate,
        StatusTrigger:true
      }
    });
    this.apiUser.TriggerUpdate(Array_to_Object, this.apiUser.UserData?._id).subscribe((res: any) => {
      if (this.fCmcontroller.getPlatform()?.toString() != 'web') {
        this.fCmcontroller.getDeviceId().then((userId: any) => {
          this.apiUser.TriggerUpdateDeviceId(userId, this.apiUser.UserData?._id).subscribe((res: any) => {
            this.toastor.success("Modified successfully...");
            this.apiUser.loadData()
          })
        })
      }
    })
  }

  ErrorShow(data: any) {
    let counter = data?.filter(element => element?.error == "Kindly input value below than live rate");
    return counter?.length != 0 ? true : false;
  }

  setError(type, item, data) {
    if (type == "inward") {
      if (item?.TriggerRate < item.LiveRate && item?.TriggerRate != 0) {
        item.error = "Kindly input value below than live rate"
      } else {
        item.error = ""
      }
    } else {
      if (item?.TriggerRate > item.LiveRate && item?.TriggerRate != 0) {
        item.error = "Kindly input value below than live rate"
      } else {
        item.error = ""
      }
    }
    this.ErrorShow(data)
  }
}
