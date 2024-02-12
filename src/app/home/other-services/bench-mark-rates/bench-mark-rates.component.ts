import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-bench-mark-rates',
  templateUrl: './bench-mark-rates.component.html',
  styleUrls: ['./bench-mark-rates.component.scss']
})
export class BenchMarkRatesComponent implements OnInit {
  RBI_REF_DATA: any = [];
  DISPLAY_MODE: any = ''
  FORM_CREATE: any = [];
  FORM_CREATE_DEFAULT: any = [
    {
      TBILL: "REPO_RATE",
      asdate: moment().format('YYYY-MM-DD'),
      Status: "",
      "rate": "",
      "1M": "",
      "3M": "",
      "6M": "",
      "12M": "",
      disabled: true
    }, {
      TBILL: "EURIBOR",
      asdate: moment().format('YYYY-MM-DD'),
      Status: "",
      "rate": "",
      "1M": "",
      "3M": "",
      "6M": "",
      "12M": "",
      disabled: true
    }, {
      TBILL: "MIBOR_OVERNIGHT",
      asdate: moment().format('YYYY-MM-DD'),
      Status: "",
      "rate": "",
      "1M": "",
      "3M": "",
      "6M": "",
      "12M": "",
      disabled: true
    }, {
      TBILL: "SOFR",
      asdate: moment().format('YYYY-MM-DD'),
      Status: "",
      "rate": "",
      "1M": "",
      "3M": "",
      "6M": "",
      "12M": "",
      disabled: true
    }, {
      TBILL: "SONIA",
      asdate: moment().format('YYYY-MM-DD'),
      Status: "",
      "rate": "",
      "1M": "",
      "3M": "",
      "6M": "",
      "12M": "",
      disabled: true
    }];
  constructor(public apiUser: ApiService) { }

  ngOnInit(): void {
    this.apiUser.getBenchMarkRates({currentdate:moment().format('YYYY-MM-DD')}).subscribe((res: any) => {
      console.log(res, "getBenchMarkRates")
      if (res?.length == 0) {
        this.FORM_CREATE.push(this.FORM_CREATE_DEFAULT);
      } else {
        let REPO_RATE = res?.filter((item: any) => item?.REPO_RATE != undefined);
        let EURIBOR = res?.filter((item: any) => item?.EURIBOR != undefined);
        let MIBOR_OVERNIGHT = res?.filter((item: any) => item?.MIBOR_OVERNIGHT != undefined);
        let SOFR = res?.filter((item: any) => item?.SOFR != undefined);
        let SONIA = res?.filter((item: any) => item?.SONIA != undefined);

        this.FORM_CREATE = [
          REPO_RATE?.length >= 1 ? { ...REPO_RATE[0]?.REPO_RATE, _id: REPO_RATE[0]?._id } : this.FORM_CREATE_DEFAULT[0],
          EURIBOR?.length >= 1 ? { ...EURIBOR[0]?.EURIBOR, _id: EURIBOR[0]?._id } : this.FORM_CREATE_DEFAULT[1],
          MIBOR_OVERNIGHT?.length >= 1 ? { ...MIBOR_OVERNIGHT[0]?.MIBOR_OVERNIGHT, _id: MIBOR_OVERNIGHT[0]?._id } : this.FORM_CREATE_DEFAULT[2],
          SOFR?.length >= 1 ? { ...SOFR[0]?.SOFR, _id: SOFR[0]?._id } : this.FORM_CREATE_DEFAULT[3],
          SONIA?.length >= 1 ? { ...SONIA[0]?.SONIA, _id: SONIA[0]?._id } : this.FORM_CREATE_DEFAULT[4],
        ]
        this.FORM_CREATE?.forEach(element => {
          element["disabled"] = true;
        });
      }
    })
  }
}
