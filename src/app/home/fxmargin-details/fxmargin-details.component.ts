import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-fxmargin-details',
  templateUrl: './fxmargin-details.component.html',
  styleUrls: ['./fxmargin-details.component.scss']
})
export class FXMarginDetailsComponent implements OnInit {
  FX_MARGIN_INWARD_DATA: any = [];
  FX_MARGIN_OUTWARD_DATA: any = [];
  CHECK_LENGTH: boolean = false;
  DISPLAY_MODE: any = ''

  constructor(public apiUser: ApiService,public toastor:ToastrService) { }

  ngOnInit(): void {
    this.loadoutwardData('outward');
  }

  loadoutwardData(type: any) {
    this.apiUser.getUserOb().then((res: any) => {
      this.apiUser.getFXMargin(res?._id, type).subscribe((res: any) => {
        console.log(res, "sdfdsfdsfdsf")
        let OUTWARD_DATA: any = [];
        let INWARD_DATA: any = [];
        OUTWARD_DATA = res?.FXMarginDetails[0]?.outward;
        INWARD_DATA = res?.FXMarginDetails[0]?.inward;
        if (res?.FXMarginDetails?.length == 0) {
          this.CHECK_LENGTH = true;
          this.FX_MARGIN_INWARD_DATA = [];
          this.FX_MARGIN_OUTWARD_DATA = [];
          this.apiUser.CURRENCY_LIST?.forEach((element: any) => {
            this.FX_MARGIN_OUTWARD_DATA.push({
              key: element,
              value: 0
            })
            this.FX_MARGIN_INWARD_DATA.push({
              key: element,
              value: 0
            })
          });
        } else {
          this.CHECK_LENGTH = false;
          this.FX_MARGIN_INWARD_DATA = [];
          this.FX_MARGIN_OUTWARD_DATA = [];

          for (const key in OUTWARD_DATA) {
            const element = OUTWARD_DATA[key];
            this.FX_MARGIN_OUTWARD_DATA.push({
              key: key,
              value: element
            })
          }

          for (const key in INWARD_DATA) {
            const element = INWARD_DATA[key];
            this.FX_MARGIN_INWARD_DATA.push({
              key: key,
              value: element
            })
          }
        }
      })
    })
  }

  CreateMargin(value: any, value2: any, type: any) {
    let Array_to_Object: any = {}
    Array_to_Object["outward"] = {}
    Array_to_Object["inward"] = {}
    value?.forEach((element: any) => {
      Array_to_Object["outward"][element?.key] = element?.value
    });
    value2?.forEach((element: any) => {
      Array_to_Object["inward"][element?.key] = element?.value
    });
    Array_to_Object['userId'] = this.apiUser.UserData?._id;
    this.apiUser.CreateFXMargin(Array_to_Object).subscribe((res: any) => {
      this.toastor.success("Added Sucessfully...");
      this.loadoutwardData('outward');
      this.apiUser.loadMargin(this.apiUser.UserData?._id);
    })
  }

  MarginUpdate(value: any, value2: any, type: any) {
    let Array_to_Object: any = {}
    Array_to_Object["outward"] = {}
    Array_to_Object["inward"] = {}
    value?.forEach((element: any) => {
      Array_to_Object["outward"][element?.key] = element?.value
    });
    value2?.forEach((element: any) => {
      Array_to_Object["inward"][element?.key] = element?.value
    });
    this.apiUser.MarginUpdate(Array_to_Object, this.apiUser.UserData?._id).subscribe((res: any) => {
      this.toastor.success("Modified successfully...");
      this.loadoutwardData('outward');
      this.apiUser.loadMargin(this.apiUser.UserData?._id);
    })
  }

}
