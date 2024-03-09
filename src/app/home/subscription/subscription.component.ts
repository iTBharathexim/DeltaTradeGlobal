import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { UIViewControllerBasedStatusBarAppearance } from 'src/app/Controller/UIViewControllerBasedStatusBarAppearance';
import { ApiService } from 'src/app/services/api.service';
declare var Razorpay: any;

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  DISPLAY_MODE: string = ''
  RazorpaySubscriptionAllData: any = [];
  API: any = ''
  SUBSCRIPTION_CHECK: boolean = false;
  SUBSCRIPTION_DETAILS: any = null;
  @ViewChild("SUBSCRIPTION_DETAILS_PANEL") SUBSCRIPTION_DETAILS_PANEL: any;
  CONTACT_US: boolean = false;

  constructor(public apiservice: ApiService, public domsani: DomSanitizer,
    public toastr: ToastrService,
    public router: Router,
    public uIViewControllerBasedStatusBarAppearance?: UIViewControllerBasedStatusBarAppearance) {
    window?.clearInterval(this.apiservice.TIME_INTERVAL);
  }

  ngOnInit(): void {
    this.apiservice.getUserOb().then((userdata: any) => {
      this.apiservice.getSubscriptionPlanAll().subscribe((res: any) => {
        console.log(res, "getSubscriptionPlanAll")
        res?.data?.forEach((element: any) => {
          element["HidePlan"] = "show"
          console.log(userdata, res?.data, "getSubscriptionPlanAll")
          this.apiservice.checkUserExpired().then((checkUserExpired) => {
            if (checkUserExpired == true) {
              if (element?.TotalMonthDays == userdata?.order_id?.PlanDetails?.TotalMonthDays &&
                userdata?.order_status?.status == "paid") {
                element["StatusPayment"] = "paid"
              } else {
                element["StatusPayment"] = "notpaid"
              }
              if (userdata?.order_id?.PlanDetails?.TotalMonthDays == "3" &&
                userdata?.order_status?.status == "paid") {
                res?.data?.filter((item: any) => item?.TotalMonthDays == "3")?.forEach((element: any) => {
                  element["HidePlan"] = "hide"
                });
              } else if (userdata?.order_id?.PlanDetails?.TotalMonthDays == "6" &&
                userdata?.order_status?.status == "paid") {
                res?.data?.filter((item: any) => item?.TotalMonthDays == "3" || item?.TotalMonthDays == "6")?.forEach((element: any) => {
                  element["HidePlan"] = "hide"
                });
              } else if (userdata?.order_id?.PlanDetails?.TotalMonthDays == "12" &&
                userdata?.order_status?.status == "paid") {
                res?.data?.filter((item: any) => item?.TotalMonthDays == "3" || item?.TotalMonthDays == "6" || item?.TotalMonthDays == "12")?.forEach((element: any) => {
                  element["HidePlan"] = "hide"
                });
              }
            }
          })
        });
        this.RazorpaySubscriptionAllData = res?.data.sort(function (a: any, b: any) {
          let x = a?.PlanName?.toLowerCase();
          let y = b?.PlanName?.toLowerCase();
          if (x > y) { return 1; }
          if (x < y) { return -1; }
          return 0;
        });
      })
    });

  }

  payNow(plan_data: any) {
    console.log(plan_data)
    if (localStorage.getItem('token') != undefined) {
      this.apiservice.CheckUserExit({ emailId: localStorage.getItem('token') }).subscribe((res: any) => {
        console.log(res, "CheckUserExit")
        if (res?.length != 0) {
          this.SUBSCRIPTION_DETAILS = null;
          let last_Order_Id_Status_False = res[0]?.order_id;
          let last_Order_Id_Status_TRUE = res[0]?.order_id;
          let Priceafterdiscount: any = plan_data?.Amount - (plan_data?.Amount * parseFloat(res[0]?.discount));
          let Saving: any = parseFloat(res[0]?.discount) != 0 && res[0]?.discount != undefined ? parseFloat(plan_data?.Amount) - parseFloat(Priceafterdiscount) : parseFloat(plan_data?.Amount);
          if (last_Order_Id_Status_False?.status == undefined || last_Order_Id_Status_False?.PlanDetails?.TotalMonthDays != plan_data?.TotalMonthDays) {
            this.apiservice.creareOrder({
              currency: plan_data?.Currency,
              amount: parseFloat(Saving) * 100,
              note: plan_data?.Description,
              receipt: 'UserId_' + res[0]?._id
            }).subscribe((order: any) => {
              console.log(order, "sfdsfdsfdsfdfd")
              if (order?.id != undefined && order?.id != null) {
                let InfoPaymentStatus = {
                  id: order?.id,
                  time: new Date(),
                  status: false,
                  PlanDetails: plan_data
                }
                this.apiservice.UpdateUserDetails({ order_id: InfoPaymentStatus, PlanDetails: plan_data }).then((updateres) => {
                  console.log(updateres, "UpdateUserPaymentDetails")
                  const RozarpayOptions = {
                    description: plan_data?.Description,
                    name: plan_data?.CompanyName,
                    key: 'rzp_live_YDjE76c4yZAjIi',
                    image: 'https://www.bharathexim.com/images/logo-transparent.png',
                    prefill: {
                      name: res[0]?.firstName,
                      email: res[0]?.emailId,
                      phone: res[0]?.mobileNo
                    },
                    order_id: order?.id,
                    theme: {
                      color: '#6466e3'
                    },
                    modal: {
                      ondismiss: (e: any) => {
                        console.log(e, 'dismissed')
                        this.apiservice.UpdateUserDetails({ order_id: res[0]?.order_id, PlanDetails: res[0]?.PlanDetails }).then((updateres) => {

                        })
                      }
                    },
                    redirect: true, // this redirects to the bank page from my website without opening a new window
                    handler: (response: any) => {
                      console.log(response, this.apiservice.checkUserExpired(), "response")
                      response['Date'] = new Date().toLocaleDateString();
                      this.apiservice.checkUserExpired().then((checkUserExpired) => {
                        InfoPaymentStatus['status'] = true;
                        this.apiservice.getRazorpayOrderById(order?.id).subscribe((RazorpayOrderById: any) => {
                          console.log(RazorpayOrderById, "RazorpayOrderById")
                          if (checkUserExpired == false) {
                            this.apiservice.UpdateUserPaymentDetails(response, {
                              FreeTrailPeroidStratDate: moment().format('dddd, MMMM DD, YYYY h:mm A'),
                              FreeTrailPeroidEndDate: moment(this.addMonth(new Date(), plan_data?.TotalMonthDays)).format('dddd, MMMM DD, YYYY h:mm A'),
                              order_id: InfoPaymentStatus,
                              order_status: RazorpayOrderById[0],
                              discount: 0,
                              ExpiredTimeStamp: moment(this.addMonth(new Date(), plan_data?.TotalMonthDays)).unix()
                            }).then((res) => {
                              this.toastr.success("Your Subscription added successfully...");
                              this.router.navigate(["/LiveTradeApp"])
                              console.log(res, "UpdateUserPaymentDetails")
                            })
                          } else {
                            this.apiservice.UpdateUserPaymentDetails(response, {
                              FreeTrailPeroidStratDate: moment(new Date(res[0]?.FreeTrailPeroidEndDate)).format('dddd, MMMM DD, YYYY h:mm A'),
                              FreeTrailPeroidEndDate: moment(this.addMonth(new Date(res[0]?.FreeTrailPeroidEndDate), plan_data?.TotalMonthDays)).format('dddd, MMMM DD, YYYY h:mm A'),
                              order_id: InfoPaymentStatus,
                              order_status: RazorpayOrderById[0],
                              discount: 0,
                              ExpiredTimeStamp: moment(this.addMonth(new Date(res[0]?.FreeTrailPeroidEndDate), plan_data?.TotalMonthDays)).unix()
                            }).then((res) => {
                              this.toastr.success("Your Subscription added successfully...");
                              this.router.navigate(["/LiveTradeApp"])
                              console.log(res, "UpdateUserPaymentDetails")
                            })
                          }
                        })
                      })
                    }
                  }
                  var rzp1 = new Razorpay(RozarpayOptions);
                  console.log(rzp1, "fsdfdsfdsfdsfds")
                  rzp1.on('payment.failed', (response: any) => {
                    console.log(response, "errorresponse")
                    response['Date'] = new Date().toLocaleDateString()
                    this.apiservice.UpdateUserDetails({ order_id: res[0]?.order_id, PlanDetails: res[0]?.PlanDetails }).then((updateres) => {

                    })
                    this.apiservice.UpdateUserPaymentDetails(response, {}).then((res) => {
                      console.log(res, "UpdateUserPaymentDetails")
                    })
                  });
                  rzp1.on("payment.order", (e: any) => {
                    console.log(e, "dfdfdsfdfdfds")
                  });
                  rzp1.open();
                })
              }
            })
          } else if (last_Order_Id_Status_False?.status == false) {
            const RozarpayOptions = {
              description: plan_data?.Description,
              name: plan_data?.CompanyName,
              key: 'rzp_live_YDjE76c4yZAjIi',
              image: 'https://www.bharathexim.com/images/logo-transparent.png',
              prefill: {
                name: res[0]?.firstName,
                email: res[0]?.emailId,
                phone: res[0]?.mobileNo
              },
              order_id: last_Order_Id_Status_False?.id,
              theme: {
                color: '#6466e3'
              },
              modal: {
                ondismiss: (e: any) => {
                  console.log(e, 'dismissed')
                  this.apiservice.UpdateUserDetails({ order_id: res[0]?.order_id, PlanDetails: res[0]?.PlanDetails }).then((updateres) => {

                  })
                }
              },
              redirect: true, // this redirects to the bank page from my website without opening a new window
              handler: (response: any) => {
                console.log(response, this.apiservice.checkUserExpired(), "response")
                response['Date'] = new Date().toLocaleDateString();
                this.apiservice.checkUserExpired().then((checkUserExpired) => {
                  let InfoPaymentStatus = res[0]?.order_id;
                  InfoPaymentStatus['status'] = true;
                  this.apiservice.getRazorpayOrderById(last_Order_Id_Status_False?.id).subscribe((RazorpayOrderById: any) => {
                    console.log(RazorpayOrderById, "RazorpayOrderById")
                    if (checkUserExpired == false) {
                      this.apiservice.UpdateUserPaymentDetails(response, {
                        FreeTrailPeroidStratDate: moment().format('dddd, MMMM DD, YYYY h:mm A'),
                        FreeTrailPeroidEndDate: moment(this.addMonth(new Date(), plan_data?.TotalMonthDays)).format('dddd, MMMM DD, YYYY h:mm A'),
                        order_id: InfoPaymentStatus,
                        order_status: RazorpayOrderById[0],
                        discount: 0,
                        ExpiredTimeStamp: moment(this.addMonth(new Date(), plan_data?.TotalMonthDays)).unix()
                      }).then((res) => {
                        this.toastr.success("Your Subscription added successfully...");
                        this.router.navigate(["/LiveTradeApp"])
                        console.log(res, "UpdateUserPaymentDetails")
                      })
                    } else {
                      this.apiservice.UpdateUserPaymentDetails(response, {
                        FreeTrailPeroidStratDate: moment(new Date(res[0]?.FreeTrailPeroidEndDate)).format('dddd, MMMM DD, YYYY h:mm A'),
                        FreeTrailPeroidEndDate: moment(this.addMonth(new Date(res[0]?.FreeTrailPeroidEndDate), plan_data?.TotalMonthDays)).format('dddd, MMMM DD, YYYY h:mm A'),
                        order_id: InfoPaymentStatus,
                        order_status: RazorpayOrderById[0],
                        discount: 0,
                        ExpiredTimeStamp: moment(this.addMonth(new Date(res[0]?.FreeTrailPeroidEndDate), plan_data?.TotalMonthDays)).unix()
                      }).then((res) => {
                        this.toastr.success("Your Subscription added successfully...");
                        this.router.navigate(["/LiveTradeApp"])
                        console.log(res, "UpdateUserPaymentDetails")
                      })
                    }
                  })
                })
              }
            }
            var rzp1 = new Razorpay(RozarpayOptions);
            rzp1.on('payment.failed', (response: any) => {
              response['Date'] = new Date().toLocaleDateString()
              this.apiservice.UpdateUserDetails({ order_id: res[0]?.order_id, PlanDetails: res[0]?.PlanDetails }).then((updateres) => {

              })
              this.apiservice.UpdateUserPaymentDetails(response, {}).then((res) => {
                console.log(res, "UpdateUserPaymentDetails")
              })
            });
            rzp1.open();
          } else if (last_Order_Id_Status_TRUE?.status == true) {
            delete res[0]?.PlanDetails;
            this.SUBSCRIPTION_DETAILS = Object.assign(last_Order_Id_Status_TRUE, res[0]);
            this.toastr.success("Your Subscription already done");
            this.SUBSCRIPTION_DETAILS_PANEL?.displayShow;
          }
        }
      });
    }
  }

  addMonth(date: any, days: any) {
    var result = new Date(date);
    if (days == "3") {
      result.setDate(result.getDate() + 90);
    } else if (days == "6") {
      result.setDate(result.getDate() + 180);
    } else if (days == "12") {
      result.setDate(result.getDate() + 365);
    }
    return result;
  }

  sendMessage() {
    this.apiservice.getUserOb().then((res: any) => {
      console.log(res, "getUserOb");
      let userForm: any = {
        'Subject': res?.companyName,
        'Message': res?.companyName + " wanted to connect, regarding subscription plan",
        'CompanyName': res?.companyName,
        'Name': res?.firstName,
        'EmailId': res?.emailId,
        'Phone': res?.mobileNo,
      };
      this.apiservice.SendContactUsEmail(userForm).subscribe((r: any) => {
        console.log(r, "dsfsdfdsfdfs")
        if (r?.status == true) {
          this.CONTACT_US = true;
        } else {
          this.CONTACT_US = false;
        }
      })
    })
  }

  replacePlan(plan: any) {
    return plan?.replace("Plan", "")
  }

  checkTrailVersion(planName) {
    return this.apiservice.UserData?.order_status?.status != 'notpaid' && this.apiservice.UserData?.order_status != undefined ? planName : 'Trial Plan';
  }
}
