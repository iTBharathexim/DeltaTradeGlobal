import { Component, OnInit } from '@angular/core';
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

  constructor(public apiUser: ApiService) { }

  ngOnInit(): void {
    this.loadoutwardData('outward');
    this.loadInwardData('inward');
  }

  loadoutwardData(type: any) {
    this.apiUser.getUserOb().then((res: any) => {
      this.apiUser.getFXMargin(res?._id, type).subscribe((res: any) => {
        console.log(res, "sdfdsfdsfdsf")
        if (res?.length == 0) {
          this.CHECK_LENGTH = true;
          this.FX_MARGIN_OUTWARD_DATA = [];
          this.apiUser.CURRENCY_LIST?.forEach((element: any) => {
            this.FX_MARGIN_OUTWARD_DATA.push({
              key: element,
              value: 0
            })
          });
        } else {
          this.CHECK_LENGTH = false;
          this.FX_MARGIN_OUTWARD_DATA = [];
          for (const key in res[0][type]) {
            const element = res[0][type][key];
            this.FX_MARGIN_OUTWARD_DATA.push({
              key: key,
              value: element
            })
          }
        }
      })
    })
  }

  loadInwardData(type: any) {
    this.apiUser.getUserOb().then((res: any) => {
      this.apiUser.getFXMargin(res?._id, type).subscribe((res: any) => {
        console.log(res, "sdfdsfdsfdsf")
        if (res?.length == 0) {
          this.CHECK_LENGTH = true;
          this.FX_MARGIN_INWARD_DATA = [];
          this.apiUser.CURRENCY_LIST?.forEach((element: any) => {
            this.FX_MARGIN_INWARD_DATA.push({
              key: element,
              value: 0
            })
          });
        } else {
          this.CHECK_LENGTH = false;
          this.FX_MARGIN_INWARD_DATA = [];
          for (const key in res[0][type]) {
            const element = res[0][type][key];
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
    value?.forEach((element: any) => {
      Array_to_Object["outward"][element?.key] = element?.value
    });
    Array_to_Object['Type'] = "outward";
    Array_to_Object['userId'] = this.apiUser.UserData?._id;

    let Array_to_Object2: any = {}
    Array_to_Object2["inward"] = {}
    value2?.forEach((element: any) => {
      Array_to_Object2["inward"][element?.key] = element?.value
    });
    Array_to_Object2['Type'] = "inward";
    Array_to_Object2['userId'] = this.apiUser.UserData?._id;
    this.apiUser.CreateFXMargin(Array_to_Object).subscribe((res: any) => {
      this.loadoutwardData('outward');
      this.apiUser.CreateFXMargin(Array_to_Object2).subscribe((res: any) => {
        this.loadInwardData('inward');
      })
    })
  }

  MarginUpdate(value: any, value2: any, type: any) {
    let Array_to_Object: any = {}
    Array_to_Object["outward"] = {}
    value?.forEach((element: any) => {
      Array_to_Object["outward"][element?.key] = element?.value
    });
    Array_to_Object['Type'] = "outward";

    let Array_to_Object2: any = {}
    Array_to_Object2["inward"] = {}
    value2?.forEach((element: any) => {
      Array_to_Object2["inward"][element?.key] = element?.value
    });
    Array_to_Object2['Type'] = "inward";
    Array_to_Object2['userId'] = this.apiUser.UserData?._id;

    this.apiUser.MarginUpdate(Array_to_Object, this.apiUser.UserData?._id).subscribe((res: any) => {
      this.loadoutwardData('outward');
      this.apiUser.MarginUpdate(Array_to_Object2, this.apiUser.UserData?._id).subscribe((res: any) => {
        this.loadInwardData('inward');
      })
    })
  }

}
