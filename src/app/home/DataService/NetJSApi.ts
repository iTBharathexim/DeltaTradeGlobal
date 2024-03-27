import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import moment from "moment";
import { FCmController } from "../../Controller/FCM-Controllor";
import { ApiService } from "../../services/api.service";
import { WebsocketService } from "../../services/websocket.service";
import { ChartOptions } from "../historicalrate/historicalrate.component";

@Injectable({
    providedIn: 'root'
})
export class JsApiCommonSubscriber {
    VISIBLE_TRADE_APP: any = '';
    USER_DETAILS: any = [];
    DISPLAY_MODE: any = ''
    WHITELISTING: any = ['JPY', 'AUD', 'CNY'];
    FORWARD_WHITE_LISTING: any = ['EUR_INR', 'GBP_INR', 'HKD_INR', "CHF_INR"];
    TIME_SCALE: number = 604800;
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    Currentday = this.days[new Date().getDay()];
    Currentmonth = this.months[new Date().getMonth()];
    TIMER_SOCKET: any = moment().format('h:mm:ss a, Do MMM  YY');
    CURRENCY_INR_LIST: any = [];
    lastDate: any;
    lastDate2: any = new Date().toISOString().split('T')[0];
    FORWARD_CALCULATOR: any = {
        bid: {
            finalValue: 0,
            spot: 0,
            outright: 0,
            Premium: 0
        },
        ask: {
            finalValue: 0,
            spot: 0,
            outright: 0,
            Premium: 0
        },
        MarketStatus: false
    };

    NEW_FORWARD_DATA: any = [];
    SystemTime: any = moment().format('MMMM Do YYYY, h:mm:ss a');

    constructor(public apiservice: ApiService,
        public fCmcontroller: FCmController,
        public websocketService: WebsocketService,
        public router: Router) {

    }

    loadHistoricalData(CurrencyName: any, CurrentTime: any, timeStamp, timeScale, days: number) {
        if (localStorage.getItem('token') != undefined && localStorage.getItem('token') != null && localStorage.getItem('token') != '') {
            this.apiservice.CheckUserExit({ emailId: localStorage.getItem('token') }).subscribe((res: any) => {
                this.TIME_SCALE = timeScale;
                this.apiservice.getHistoricalData({ CurrencyName: CurrencyName, timeStamp: timeStamp, timeScale: timeScale, days: days, CurrentTime: CurrentTime }).subscribe((historicaldata: any) => {
                    console.log(historicaldata, "historicaldata")
                    let chartdata: any = [];
                    let dataPoints: any = [];
                    let dataPoints1: any = [], dataPoints2: any = [], dataPoints3: any = [];
                    historicaldata.data = JSON.parse(historicaldata?.data);
                    historicaldata?.data?.date?.forEach((element, index) => {
                        let DataMerge: any = [historicaldata?.data?.Opens[index], historicaldata?.data?.Highs[index], historicaldata?.data?.Lows[index], historicaldata?.data?.Closes[index]]
                        chartdata.push({
                            x: element,
                            y: DataMerge,
                        })
                        dataPoints.push({ x: new Date(historicaldata?.data?.dateActual[index] * 1000), y: Number(historicaldata?.data?.Opens[index]) });
                        dataPoints1.push({ x: new Date(historicaldata?.data?.dateActual[index] * 1000), y: Number(historicaldata?.data?.Closes[index]) });
                        dataPoints3.push({ x: new Date(historicaldata?.data?.dateActual[index] * 1000), y: Number(historicaldata?.data?.Highs[index]) });
                        dataPoints2.push({ x: new Date(historicaldata?.data?.dateActual[index] * 1000), y: Number(historicaldata?.data?.Lows[index]) });
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
                                TimeScale: 604800,
                                '1D': oldData != undefined ? oldData['1D'] : (false),
                                '1W': oldData != undefined ? oldData['1W'] : (false),
                                '1M': oldData != undefined ? oldData['1M'] : (true),
                                '1Y': oldData != undefined ? oldData['1Y'] : (false),
                                '5Y': oldData != undefined ? oldData['5Y'] : (false),
                                date: oldData?.date != undefined ? oldData?.date : '',
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
                                        valueFormatString: "DD MMM YYYY",
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
                                            lineColor: "#3F98D7",
                                            markerType: "square",
                                            xValueFormatString: "DD MMM, YYYY",
                                            dataPoints: dataPoints
                                        },
                                        {
                                            type: "line",
                                            showInLegend: true,
                                            name: "High",
                                            lineColor: "black",
                                            lineDashType: "dot",
                                            dataPoints: dataPoints3
                                        },
                                        {
                                            type: "line",
                                            showInLegend: true,
                                            name: "Low",
                                            lineColor: "#E65758",
                                            lineDashType: "dash",
                                            markerType: "square",
                                            xValueFormatString: "DD MMM, YYYY",
                                            dataPoints: dataPoints2
                                        },
                                        {
                                            type: "line",
                                            showInLegend: true,
                                            name: "Close",
                                            lineColor: "#7A62BA",
                                            lineDashType: "dot",
                                            dataPoints: dataPoints1
                                        },
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
        let CLEAR_TIMER: any;
        return new Promise((resolve, reject) => {
            this.apiservice.NEW_LOADER_SHOW_HIDE = true;
            this.websocketService?.listen('CurrencyInfo').subscribe((res: any) => {
                this.CURRENCY_INR_LIST = [];
                this.NEW_FORWARD_DATA = [];
                res?.NEW_CURRENCY_INR_LIST?.forEach(element1 => {
                    if (!res?.FORWARD_CALCULATOR_WHITE_LISTING?.includes(element1)) {
                        let splitcurrency = element1?.split("_");
                        this.CURRENCY_INR_LIST.push({
                            name: element1?.split("_")?.join(""),
                            base_currency: splitcurrency[0],
                            quote_currency: splitcurrency[1],
                            value: element1
                        });
                        this.NEW_FORWARD_DATA.push({
                            name: element1?.split("_")?.join(""),
                            base_currency: splitcurrency[0],
                            quote_currency: splitcurrency[1],
                            value: element1,
                            "ask": 0,
                            "bid": 0,
                            "midpoint": "0",
                            "Next": false,
                            "expended": false,
                            "Original_Currency": element1,
                            "time": "",
                            "MarketStatus": true,
                        })
                    }
                });
            });
            this.websocketService?.listen('newData').subscribe((res: any) => {
                clearTimeout(CLEAR_TIMER);
                this.SystemTime = moment().format('hh:mm:ss a, MMMM Do YYYY');
                console.log(this.SystemTime,"SystemTime")
                this.FORWARD_CALCULATOR['MarketStatus'] = res?.new[0]?.MarketStatus;
                const oldata: any = this.apiservice.LIST_OF_DATA?.length != 0 ? this.apiservice.LIST_OF_DATA : undefined;
                this.apiservice.LIST_OF_DATA = res?.new;

                const FORWARD_BID_ASK_DATA: any = this.apiservice.FORWARD_BID_ASK_DATA
                for (let index = 0; index < res?.FORWARD_BID_ASK_DATA?.length; index++) {
                    if (FORWARD_BID_ASK_DATA != undefined && FORWARD_BID_ASK_DATA?.length != 0) {
                        const element1 = res?.FORWARD_BID_ASK_DATA[index];
                        const element2 = FORWARD_BID_ASK_DATA[index];
                        element1["expended"] = element2["expended"]
                        element1["Next"] = element2["Next"]
                    }
                }
                let OUTWARD_DATA = this.apiservice.MARGIN_DATA?.length != 0 ? this.apiservice.MARGIN_DATA[0]?.outward : []
                let INWARD_DATA = this.apiservice.MARGIN_DATA?.length != 0 ? this.apiservice.MARGIN_DATA[0]?.inward : [];
                this.apiservice.FORWARD_BID_ASK_DATA = res?.FORWARD_BID_ASK_DATA;
                for (let index = 0; index < res?.new?.length; index++) {
                    const element1 = res?.new[index];
                    if (this.apiservice.MARGIN_DATA?.length != 0) {
                        element1['OuwardMargin'] = OUTWARD_DATA?.length != 0 && OUTWARD_DATA != undefined ? (parseFloat(OUTWARD_DATA[element1?.base_currency]) != undefined ? parseFloat(OUTWARD_DATA[element1?.base_currency]) / 100 : 0) : 0;
                        element1['InwardMargin'] = INWARD_DATA?.length != 0 && INWARD_DATA != undefined ? parseFloat(INWARD_DATA[element1?.base_currency]) != undefined ? parseFloat(INWARD_DATA[element1?.base_currency]) / 100 : 0 : 0;
                    }
                    if (oldata != undefined) {
                        const element2 = oldata[index];
                        element1["expended"] = element2["expended"]
                        element1["Next"] = element2["Next"]
                    }
                    let filterItemOutward = this.apiservice.FX_MARGIN_DATA_OUTWARD?.filter((item: any) => item?.OriginalCurrency == this.apiservice.NEW_CURRENCY_INR_LIST[index])
                    if (filterItemOutward?.length != 0) {
                        filterItemOutward[0]["LiveRate"] = element1?.ask;
                        filterItemOutward[0]["error"] = ''
                    }
                    let filterItemInward = this.apiservice.FX_MARGIN_DATA_INWARD?.filter((item: any) => item?.OriginalCurrency == this.apiservice.NEW_CURRENCY_INR_LIST[index])
                    if (filterItemInward?.length != 0) {
                        filterItemInward[0]["LiveRate"] = element1?.bid;
                        filterItemInward[0]["error"] = ''
                    }
                }
                CLEAR_TIMER = setTimeout(() => {
                    for (let index = 0; index < res?.new?.length; index++) {
                        const element1 = res?.new[index];
                        element1["bidclassName"] = ''
                        element1["askclassName"] = ''
                    }
                }, 500)
                this.apiservice.NEW_LOADER_SHOW_HIDE = false;
                resolve({ LIST_OF_DATA: this.apiservice.LIST_OF_DATA, FORWARD_BID_ASK_DATA: this.apiservice.FORWARD_BID_ASK_DATA })
            })
        })
    }

    get9to5() {
        var d = new Date();
        // d.setDate(d.getDate()+1);
        var e = d.toLocaleTimeString('en-US', { hour12: false });
        var f = e.split(':');
        let condition = false;
        if (parseInt(f[0]) < 9) {
            condition = true;
        }
        if (parseInt(f[0]) >= 17) {
            condition = true;
        }
        if (this.apiservice.HOLIDAYS_INDIA.filter((item: any) => item?.date?.toString() == moment(d).format('MMMM DD, YYYY')?.toString())?.length != 0) {
            condition = true;
        }
        if ((this.Currentday == 'Saturday' || this.Currentday == 'Sunday')) {
            condition = true;
        }
        return condition;
    }

    getHolidays() {
        let d = new Date();
        let condition = false;
        if (this.apiservice.HOLIDAYS_INDIA.filter((item: any) => item?.date?.toString() == moment(d).format('MMMM DD, YYYY')?.toString())?.length != 0) {
            condition = true;
        }
        if ((this.Currentday == 'Saturday' || this.Currentday == 'Sunday')) {
            condition = true;
        }
        return condition;
    }
}
