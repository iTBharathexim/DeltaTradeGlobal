import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FCmController } from 'src/app/Controller/FCM-Controllor';
import { ApiService } from 'src/app/services/api.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { JsApiCommonSubscriber } from '../DataService/NetJSApi';
import { Router } from '@angular/router';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexTooltip
} from "ng-apexcharts";

import moment from 'moment';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};
@Component({
  selector: 'app-historicalrate',
  templateUrl: './historicalrate.component.html',
  styleUrls: ['./historicalrate.component.scss']
})
export class HistoricalrateComponent implements OnInit, AfterViewInit {
  DISPLAY_MODE: any = ''
  timeStamp: number = this.getLastWeek(30);
  http: any;
  CURRENT_DATE: any = new Date().getTime();

  constructor(public apiservice: ApiService,
    public fCmcontroller: FCmController,
    public websocketService: WebsocketService,
    public JsApiCommonsubscriber: JsApiCommonSubscriber,
    public router: Router) {
    this.JsApiCommonsubscriber.loadHistoricalData('USD',this.CURRENT_DATE, this.timeStamp, JsApiCommonsubscriber.TIME_SCALE, 1);
  }

  ngOnInit(): void {

  }

  chart: any;
  labelFormatter = (e: any) => {
    var suffixes = ["", "K", "M", "B"];
    var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
    if (order > suffixes.length - 1)
      order = suffixes.length - 1;
    var suffix = suffixes[order];
    return ('$' + (e.value / Math.pow(1000, order)) + suffix);
  }

  dataPoints: any = [];
  chartOptions = {
    theme: "light2",
    zoomEnabled: true,
    exportEnabled: true,
    title: {
      text: "Bitcoin Closing Price",
      fontSize: 15,
    },
    axisY: {
      title: "Closing Price (in USD)",
      prefix: "$"
    },
    data: [{
      type: "line",
      name: "Closing Price",
      yValueFormatString: "$#,###.00",
      xValueType: "dateTime",
      dataPoints: this.dataPoints
    }]
  }

  getLastWeek(week): number {
    return new Date(new Date().getTime() - week * 24 * 60 * 60 * 1000).getTime() as number;
  }

  setLastWeek(date, week): number {
    return new Date(new Date(date).getTime() - week * 24 * 60 * 60 * 1000).getTime() as number;
  }

  getDate(date): number {
    return new Date(date).getTime() as number;
  }

  Collepse(event, index, data, TIME_SCALE) {
    data?.forEach((element, i) => {
      if (i != index) {
        element['expended'] = false;
      } else {
        element['expended'] = event;
      }
    });
  }

  ResetActiveClass(key, index, data) {
    for (const key in data) {
      const element = data;
      element['1D'] = false;
      element['1W'] = false;
      element['1M'] = false;
      element['1Y'] = false;
      element['5Y'] = false;
    }
    data[key] = true;
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  public generateDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      series.push([baseval, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

  ngAfterViewInit() {
   
  }

  getChartInstance(chart: object) {
    this.chart = chart;
  }
}
