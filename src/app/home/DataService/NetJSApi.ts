import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import moment from "moment";
import { FCmController } from "src/app/Controller/FCM-Controllor";
import { ApiService } from "src/app/services/api.service";
import { WebsocketService } from "src/app/services/websocket.service";
import { ChartOptions } from "../historicalrate/historicalrate.component";
interface JsonData {
    "date": string,
    "open": number,
    "high": number,
    "low": number,
    "close": number,
    "volume_usd": number
}

@Injectable({
    providedIn: 'root'
})
export class JsApiCommonSubscriber {
    VISIBLE_TRADE_APP: any = '';
    USER_DETAILS: any = [];
    DISPLAY_MODE: any = ''
    WHITELISTING: any = ['JPY', 'AUD', 'CNY'];
    FORWARD_WHITE_LISTING: any = ['EUR_INR', 'GBP_INR', 'HKD_INR', "CHF_INR"];

    constructor(public apiservice: ApiService,
        public fCmcontroller: FCmController,
        public websocketService: WebsocketService,
        public router: Router) {

    }

    loadHistoricalData(CurrencyName: any, timeStamp, days: number) {
        if (localStorage.getItem('token') != undefined && localStorage.getItem('token') != null && localStorage.getItem('token') != '') {
            this.apiservice.CheckUserExit({ emailId: localStorage.getItem('token') }).subscribe((res: any) => {
                this.apiservice.getHistoricalData({ CurrencyName: CurrencyName, timeStamp: timeStamp, days: days }).subscribe((historicaldata: any) => {
                    console.log(historicaldata, "historicaldata")
                    let chartdata: any = [];
                    let dataPoints = [];
                    let dataPoints1 = [], dataPoints2 = [], dataPoints3 = [];
                    historicaldata.data = JSON.parse(historicaldata?.data);
                    historicaldata?.data?.date?.forEach((element, index) => {
                        let DataMerge: any = [historicaldata?.data?.Opens[index], historicaldata?.data?.Highs[index], historicaldata?.data?.Lows[index], historicaldata?.data?.Closes[index]]
                        chartdata.push({
                            x: element,
                            y: DataMerge,
                        })
                        dataPoints.push({ x: new Date(historicaldata?.data?.dateActual[index] * 1000), y: Number(historicaldata?.data?.Opens[index]) });
                        dataPoints1.push({ x: new Date(historicaldata?.data?.dateActual[index] * 1000), y:Number(historicaldata?.data?.Closes[index]) });
                        dataPoints2.push({ x: new Date(historicaldata?.data?.dateActual[index] * 1000), y: Number(historicaldata?.data?.Highs[index]) });
                        dataPoints3.push({ x: new Date(historicaldata?.data?.dateActual[index] * 1000), y: Number(historicaldata?.data?.Lows[index]) });
                    });
                    this.apiservice.CURRENCY_LIST?.forEach((element, index) => {
                        if (element != 'INR') {
                            let chartdataPartial: Partial<ChartOptions> = {
                                series: [
                                    {
                                        name: "candle",
                                        data: chartdata
                                    }
                                ],
                                chart: {
                                    height: 350,
                                    type: "candlestick",
                                    toolbar: {
                                        show: true
                                    },
                                },
                                title: {
                                    text: "HISTORICAL Chart",
                                    align: "left"
                                },
                                tooltip: {
                                    enabled: false
                                },
                                xaxis: {
                                    type: "category",
                                    labels: {
                                        formatter: function (val) {
                                            return val;
                                        }
                                    }
                                },
                                yaxis: {
                                    tooltip: {
                                        enabled: true
                                    }
                                }
                            }
                            const oldData = this.apiservice.HISTORICAL_CHART_DATA[index]
                            this.apiservice.HISTORICAL_CHART_DATA[index] = ({
                                name: element,
                                expended: oldData?.expended != undefined ? oldData?.expended : (false),
                                base_currency: element,
                                quote_currency: 'INR',
                                '1D': oldData != undefined ? oldData['1D'] : (false),
                                '1W': oldData != undefined ? oldData['1W'] : (false),
                                '1M': oldData != undefined ? oldData['1M'] : (true),
                                '1Y': oldData != undefined ? oldData['1Y'] : (false),
                                '5Y': oldData != undefined ? oldData['5Y'] : (false),
                                chartOptions: historicaldata?.data?.CurruncyName?.indexOf(element) != -1 ? chartdataPartial : undefined,
                                CanvasJsChart: {
                                    animationEnabled: true,
                                    zoomEnabled: true,
                                    exportEnabled: true,
                                    theme: "light2",
                                    title: {
                                        text: ""
                                    },
                                    axisX: {
                                        valueFormatString: "DD MMM",
                                        crosshair: {
                                            enabled: true,
                                            snapToDataPoint: true
                                        }
                                    },
                                    axisY: {
                                        title: `Currency of ${element}`,
                                        crosshair: {
                                            enabled: true
                                        }
                                    },
                                    toolTip: {
                                        shared: true
                                    },
                                    legend: {
                                        cursor: "pointer",
                                        verticalAlign: "bottom",
                                        horizontalAlign: "right",
                                        dockInsidePlotArea: true,
                                        itemclick: function (e: any) {
                                            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                                                e.dataSeries.visible = false;
                                            } else {
                                                e.dataSeries.visible = true;
                                            }
                                            e.chart.render();
                                        }
                                    },
                                    data: [
                                        {
                                            type: "line",
                                            showInLegend: true,
                                            name: "Open",
                                            lineDashType: "dash",
                                            markerType: "square",
                                            xValueFormatString: "DD MMM, YYYY",
                                            dataPoints: dataPoints
                                        },
                                        {
                                            type: "line",
                                            showInLegend: true,
                                            name: "Close",
                                            lineDashType: "dot",
                                            dataPoints: dataPoints1
                                        },
                                        {
                                            type: "line",
                                            showInLegend: true,
                                            name: "Low",
                                            lineDashType: "dash",
                                            markerType: "square",
                                            xValueFormatString: "DD MMM, YYYY",
                                            dataPoints: dataPoints2
                                        },
                                        {
                                            type: "line",
                                            showInLegend: true,
                                            name: "High",
                                            lineDashType: "dot",
                                            dataPoints: dataPoints3
                                        }
                                    ]
                                }
                            })
                        }
                    });
                    console.log(this.apiservice.HISTORICAL_CHART_DATA, "HISTORICAL_CHART_DATA")
                })
            })
        }
    }

    loadJSApi() {
        return new Promise((resolve, reject) => {
            this.apiservice.LOADER_SHOW_HIDE = true;
            if (localStorage.getItem('token') != undefined && localStorage.getItem('token') != null && localStorage.getItem('token') != '') {
                this.apiservice.CheckUserExit({ emailId: localStorage.getItem('token') }).subscribe((res: any) => {
                    if (res?.length != 0) {
                        this.USER_DETAILS = res[0]
                        this.DISPLAY_MODE = this.USER_DETAILS?.DisplayMode
                        let data = [];
                        this.websocketService?.listen('test').subscribe((res: any) => {
                            let OUTWARD_DATA: any = [];
                            let INWARD_DATA: any = [];
                            this.apiservice.loadMarginData2(this.USER_DETAILS?._id, 'outward').then((outwardres: any) => {
                                OUTWARD_DATA = outwardres?.FXMarginDetails[0]?.outward;
                                INWARD_DATA = outwardres?.FXMarginDetails[0]?.inward;
                                this.apiservice.getFXTrigger(this.USER_DETAILS?._id).subscribe((ResFXTrigger: any) => {
                                    let FR_TRIGGER_DATA = ResFXTrigger;
                                    let count = 0;
                                    let askclassName = '';
                                    let bidclassName = '';
                                    for (const key in res) {
                                        let element = res[key];
                                        let splitkey: any = key?.split('_');
                                        const olddata: any = this.apiservice.LIST_OF_DATA[0]?.quotes;
                                        const oldFORWARD_ASK_DATA: any = this.apiservice.FORWARD_ASK_DATA[count];
                                        const oldFORWARD_BID_DATA: any = this.apiservice.FORWARD_BID_DATA[count];
                                        const oldFORWARD_BID_ASK_DATA: any = this.apiservice.FORWARD_BID_ASK_DATA[count];
                                        if (!this.WHITELISTING?.includes(splitkey[0])) {
                                            this.apiservice.FORWARD_ASK_DATA[count] = {
                                                ...element?.FORWARD_ASK,
                                                Next: oldFORWARD_ASK_DATA?.Next != undefined ? oldFORWARD_ASK_DATA?.Next : false,
                                                expended: oldFORWARD_ASK_DATA?.expended != undefined ? oldFORWARD_ASK_DATA?.expended : false,
                                                base_currency: splitkey[0],
                                                quote_currency: splitkey[1],
                                                time: moment(element?.Timestamp).format('h:mm a, Do MMM  YY')
                                            };
                                            this.apiservice.FORWARD_BID_ASK_DATA[count] = {
                                                ASK: element?.FORWARD_ASK,
                                                BID: element?.FORWARD_BID,
                                                Next: oldFORWARD_BID_ASK_DATA?.Next != undefined ? oldFORWARD_BID_ASK_DATA?.Next : false,
                                                expended: oldFORWARD_BID_ASK_DATA?.expended != undefined ? oldFORWARD_BID_ASK_DATA?.expended : (count == 0 ? true : false),
                                                base_currency: splitkey[0],
                                                quote_currency: splitkey[1],
                                                time: moment(element?.Timestamp).format('h:mm a, Do MMM  YY')
                                            };
                                            this.apiservice.FORWARD_BID_DATA[count] = {
                                                ...element?.FORWARD_BID,
                                                Next: oldFORWARD_BID_DATA?.Next != undefined ? oldFORWARD_BID_DATA?.Next : false,
                                                expended: oldFORWARD_BID_DATA?.expended != undefined ? oldFORWARD_BID_DATA?.expended : false,
                                                base_currency: splitkey[0],
                                                quote_currency: splitkey[1],
                                                time: moment(element?.Timestamp).format('h:mm a, Do MMM  YY')
                                            };
                                        }
                                        const oldHISTORICAL_DATA: any = this.apiservice.HISTORICAL_DATA[count];
                                        this.apiservice.HISTORICAL_DATA[count] = {
                                            ...element?.HISTORICAL_DATA,
                                            Next: oldHISTORICAL_DATA?.Next != undefined ? oldHISTORICAL_DATA?.Next : false,
                                            expended: oldHISTORICAL_DATA?.expended != undefined ? oldHISTORICAL_DATA?.expended : false,
                                            base_currency: splitkey[0],
                                            quote_currency: splitkey[1],
                                            time: moment(element?.Timestamp).format('h:mm a, Do MMM  YY')
                                        };
                                        if (olddata != undefined) {
                                            if (olddata[count]?.ask < parseFloat(element?.QUOTE_ASK)) {
                                                askclassName = 'highask'
                                            } else if (olddata[count]?.ask > parseFloat(element?.QUOTE_ASK)) {
                                                askclassName = 'lowask'
                                            } else {
                                                askclassName = ''
                                            }
                                            if (olddata[count]?.ask < parseFloat(element?.QUOTE_BID)) {
                                                bidclassName = 'highask'
                                            } else if (olddata[count]?.bid > parseFloat(element?.QUOTE_BID)) {
                                                bidclassName = 'lowask'
                                            } else {
                                                bidclassName = ''
                                            }
                                            data[count] = ({
                                                ask: parseFloat(element?.QUOTE_ASK),
                                                base_currency: splitkey[0],
                                                bid: parseFloat(element?.QUOTE_BID),
                                                midpoint: element?.QUOTE_BID,
                                                quote_currency: splitkey[1],
                                                oldbid: "",
                                                oldask: "",
                                                className: "",
                                                bidclassName: bidclassName,
                                                askclassName: askclassName,
                                                Next: olddata[count]?.Next,
                                                OuwardMargin: OUTWARD_DATA?.length != 0 && OUTWARD_DATA != undefined ? (parseFloat(OUTWARD_DATA[splitkey[0]]) != undefined ? parseFloat(OUTWARD_DATA[splitkey[0]]) / 100 : 0) : 0,
                                                InwardMargin: INWARD_DATA?.length != 0 && INWARD_DATA != undefined ? parseFloat(INWARD_DATA[splitkey[0]]) != undefined ? parseFloat(INWARD_DATA[splitkey[0]]) / 100 : 0 : 0,
                                                expended: olddata[count]?.expended,
                                                open: parseFloat(element?.QUOTE_OPEN),
                                                close: parseFloat(element?.QUOTE_CLOSE),
                                                high: parseFloat(element?.QUOTE_HIGH),
                                                low: parseFloat(element?.QUOTE_LOW),
                                                time: moment(element?.Timestamp).format('h:mm a, Do MMM  YY')
                                            })
                                        } else {
                                            data[count] = ({
                                                ask: parseFloat(element?.QUOTE_ASK),
                                                base_currency: splitkey[0],
                                                bid: parseFloat(element?.QUOTE_BID),
                                                midpoint: element?.QUOTE_BID,
                                                quote_currency: splitkey[1],
                                                oldbid: "",
                                                oldask: "",
                                                className: "",
                                                bidclassName: "",
                                                askclassName: "",
                                                Next: false,
                                                expended: false,
                                                OuwardMargin: OUTWARD_DATA?.length != 0 && OUTWARD_DATA != undefined ? (parseFloat(OUTWARD_DATA[splitkey[0]]) != undefined ? parseFloat(OUTWARD_DATA[splitkey[0]]) / 100 : 0) : 0,
                                                InwardMargin: INWARD_DATA?.length != 0 && INWARD_DATA != undefined ? parseFloat(INWARD_DATA[splitkey[0]]) != undefined ? parseFloat(INWARD_DATA[splitkey[0]]) / 100 : 0 : 0,
                                                open: parseFloat(element?.QUOTE_OPEN),
                                                close: parseFloat(element?.QUOTE_CLOSE),
                                                high: parseFloat(element?.QUOTE_HIGH),
                                                low: parseFloat(element?.QUOTE_LOW),
                                                time: moment(element?.Timestamp).format('h:mm a, Do MMM  YY')
                                            })
                                        }
                                        count++;
                                        if (FR_TRIGGER_DATA?.FXMarginTrigger?.length != 0) {
                                            if (((FR_TRIGGER_DATA?.FXMarginTrigger[0]?.Inward[splitkey[0]]?.TriggerRate - (.02)) <= element?.QUOTE_BID) && FR_TRIGGER_DATA?.FXMarginTrigger[0]?.Inward[splitkey[0]]?.TriggerRate != 0) {
                                                if (this.fCmcontroller.getPlatform()?.toString() != 'web') {
                                                    this.fCmcontroller.getDeviceId().then((userId: any) => {
                                                        this.apiservice.PushNotification({
                                                            registrationToken: userId,
                                                            title: `Live rate is nearing to trigger value Currency(${splitkey[0]}) Trigger value(${FR_TRIGGER_DATA?.FXMarginTrigger[0]?.Inward[splitkey[0]]?.TriggerRate})`,
                                                            body: `Live rate is nearing to trigger value Currency(${splitkey[0]}) Trigger value(${FR_TRIGGER_DATA?.FXMarginTrigger[0]?.Inward[splitkey[0]]?.TriggerRate})`
                                                        }).subscribe((rez) => {
                                                            console.log(rez, "PushNotification")
                                                            FR_TRIGGER_DATA.FXMarginTrigger[0].Inward[splitkey[0]]['TriggerRate'] = 0
                                                            this.apiservice.TriggerUpdate({ Inward: FR_TRIGGER_DATA?.FXMarginTrigger[0]?.Inward }, this.USER_DETAILS?._id).subscribe((res) => { })
                                                        })
                                                    })
                                                }
                                            }
                                            if (((FR_TRIGGER_DATA?.FXMarginTrigger[1]?.Outward[splitkey[0]]?.TriggerRate - (.02)) <= element?.QUOTE_ASK) && FR_TRIGGER_DATA?.FXMarginTrigger[1]?.Outward[splitkey[0]]?.TriggerRate != 0) {
                                                if (this.fCmcontroller.getPlatform()?.toString() != 'web') {
                                                    this.fCmcontroller.getDeviceId().then((userId: any) => {
                                                        this.apiservice.PushNotification({
                                                            registrationToken: userId,
                                                            title: `Live rate is nearing to trigger value Currency(${splitkey[0]}) Trigger value(${FR_TRIGGER_DATA?.FXMarginTrigger[1]?.Outward[splitkey[0]]?.TriggerRate})`,
                                                            body: `Live rate is nearing to trigger value Currency(${splitkey[0]}) Trigger value(${FR_TRIGGER_DATA?.FXMarginTrigger[1]?.Outward[splitkey[0]]?.TriggerRate})`
                                                        }).subscribe((rez) => {
                                                            console.log(rez, "PushNotification")
                                                            FR_TRIGGER_DATA.FXMarginTrigger[0].Outward[splitkey[0]]['TriggerRate'] = 0
                                                            this.apiservice.TriggerUpdate({ Outward: FR_TRIGGER_DATA?.FXMarginTrigger[1]?.Outward }, this.USER_DETAILS?._id).subscribe((res) => { })
                                                        })
                                                    })
                                                }
                                            }
                                        }
                                    }
                                    this.apiservice.LIST_OF_DATA[0] = { quotes: data };
                                    resolve({ LIST_OF_DATA: this.apiservice.LIST_OF_DATA, outwardres: outwardres, ResFXTrigger: ResFXTrigger, FORWARD_BID_ASK_DATA: this.apiservice.FORWARD_BID_ASK_DATA })
                                });
                            })
                        })
                    }
                })
            }
        })
    }

}
