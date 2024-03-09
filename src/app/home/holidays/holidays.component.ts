import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import $ from 'jquery';
import moment from 'moment';

export interface CalendarData {
  date: Date;
  count: number;
}

export interface CalendarOptions {
  width?: number;
  height?: number;
  responsive?: boolean;
  legendWidth?: number;
  SQUARE_LENGTH?: number;
  SQUARE_PADDING?: number;
  MONTH_LABEL_PADDING?: number;
  DAY_WIDTH?: number;
  MONTH_LABEL_HEIGHT?: number;
  now?: Date;
  yearAgo?: Date;
  startDate?: Date;
  max?: number;
  staticMax?: boolean;
  colorRange?: any[];
  tooltipEnabled?: boolean;
  tooltipUnit?: any;
  legendEnabled?: boolean;
  onClick?: (data?: CalendarData) => void;
  weekStart?: CalendarWeekStart;
  locale?: CalendarLocale;
}

export interface CalendarLocale {
  months: string[];
  days: string[];
  no: string;
  on: string;
  less: string;
  more: string;
}

export enum CalendarWeekStart {
  SUNDAY = 0,
  MONDAY = 1
}

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {
  DISPLAY_MODE: any = '';
  HOLIDAYS_FILTER_DATA: any = [];
  calendarData: CalendarData[];
  calendarOptions: CalendarOptions;
  HOLIDAYS_MESSAGE: any = [];

  constructor(public apiservice: ApiService) {
    this.HOLIDAYS_FILTER_DATA = apiservice.HOLIDAYS_INDIA;
  }

  ngOnInit(): void {
    // this.calendarData=[
    //   {
    //     date: new Date(),
    //     count: 10
    //   },
    //   {
    //     date: new Date(),
    //     count: 10
    //   },
    //   {
    //     date: new Date(),
    //     count: 10
    //   },
    //   {
    //     date: new Date(),
    //     count: 10
    //   },
    //   {
    //     date: new Date(),
    //     count: 10
    //   },
    //   {
    //     date: new Date(),
    //     count: 10
    //   },
    //   {
    //     date: new Date(),
    //     count: 10
    //   }
    // ];
    // this.calendarOptions={
    //   width: 200,
    //   height: 200,
    //   responsive: true,
    //   legendWidth: 100,
    //   SQUARE_LENGTH: 10,
    //   SQUARE_PADDING: 10,
    //   MONTH_LABEL_PADDING: 10,
    //   DAY_WIDTH: 10,
    //   MONTH_LABEL_HEIGHT: 10,
    //   now: new Date(),
    //   yearAgo: new Date(new Date().setFullYear(2010)),
    //   startDate: new Date(),
    //   max: 10,
    //   staticMax: true,
    //   colorRange: ["#FF5733","#FF5733","#FF5733","#FF5733","#FF5733","#FF5733","#FF5733","#FF5733","#FF5733","#FF5733","#FF5733"],
    //   tooltipEnabled: true,
    //   tooltipUnit: ["holidays"],
    //   legendEnabled: false,
    //   onClick: (data?: CalendarData) => {

    //   }
    // }
    this.loadCalander(this.HOLIDAYS_FILTER_DATA);
  }

  OneChar(str: any) {
    return str?.charAt(0)
  }

  loadCalander(HOLIDAYS_FILTER_DATA) {
    var Cal = function (divId) {
      //Store div id
      this.divId = divId;

      // Days of week, starting on Sunday
      this.DaysOfWeek = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
      ];

      // Months, stating on January
      this.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      // Set the current month, year
      var d = new Date();

      this.currMonth = d.getMonth();
      this.currYear = d.getFullYear();
      this.currDay = d.getDate();

    };

    // Goes to next month
    Cal.prototype.nextMonth = function () {
      if (this.currMonth == 11) {
        this.currMonth = 0;
        this.currYear = this.currYear + 1;
      }
      else {
        this.currMonth = this.currMonth + 1;
      }
      this.showcurr();
    };

    // Goes to previous month
    Cal.prototype.previousMonth = function () {
      if (this.currMonth == 0) {
        this.currMonth = 11;
        this.currYear = this.currYear - 1;
      }
      else {
        this.currMonth = this.currMonth - 1;
      }
      this.showcurr();
    };

    // Show current month
    Cal.prototype.showcurr = function () {
      this.showMonth(this.currYear, this.currMonth);
    };

    // Show month (year, month)
    Cal.prototype.showMonth = function (y, m) {

      var d = new Date()
        // First day of the week in the selected month
        , firstDayOfMonth = new Date(y, m, 1).getDay()
        // Last day of the selected month
        , lastDateOfMonth = new Date(y, m + 1, 0).getDate()
        // Last day of the previous month
        , lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();

      let changes = new Date(y, m + 1, 0);

      var html = `<table style="
      clear: both;
      width: 100%;
      border-collapse: collapse;
      color: black;
      text-align: center;" class="calender-ui">`;
      // Write selected month and year
      html += '<thead><tr>';
      html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
      html += '</tr></thead>';


      // Write the header of the days of the week
      html += '<tr class="days">';
      for (var i = 0; i < this.DaysOfWeek.length; i++) {
        if (this.DaysOfWeek[i] == 'Sun' || this.DaysOfWeek[i] == 'Sat') {
          html += `<td style="color:red">${this.DaysOfWeek[i]} </td>`;
        } else {
          html += `<td>${this.DaysOfWeek[i]} </td>`;
        }
      }
      html += '</tr>';

      // Write the days
      var i = 1;
      do {

        var dow = new Date(y, m, i).getDay();

        // If Sunday, start new row
        if (dow == 0) {
          html += '<tr style="cursor: pointer;">';
        }
        // If not Sunday but first day of the month
        // it will write the last days from the previous month
        else if (i == 1) {
          html += '<tr style="cursor: pointer;">';
          var k = lastDayOfLastMonth - firstDayOfMonth + 1;
          for (var j = 0; j < firstDayOfMonth; j++) {
            html += '<td class="not-current" style="color:gray">' + k + '</td>';
            k++;
          }
        }

        // Write the current day in the loop
        var chk = new Date();
        var chkY = chk.getFullYear();
        var chkM = chk.getMonth();
        let Holidaysdate = moment(new Date(changes.setDate(i))).format("MMMM DD, YYYY");
        let exit = HOLIDAYS_FILTER_DATA.filter((item: any) => item?.date == Holidaysdate)
        if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
          if (exit?.length != 0) {
            html += '<td class="today" style="color:red" data-found="true" data-index=' + Holidaysdate?.split(" ")?.join("_") + '>' + i + '</td>';
          } else {
            html += '<td class="today">' + i + '</td>';
          }
        } else {
          if (exit?.length != 0) {
            html += '<td class="normal" style="color:red" data-found="true" data-index=' + Holidaysdate?.split(" ")?.join("_") + '>' + i + '</td>';
          } else {
            html += '<td class="normal">' + i + '</td>';
          }
        }
        // If Saturday, closes the row
        if (dow == 6) {
          html += '</tr>';
        }
        // If not Saturday, but last day of the selected month
        // it will write the next few days from the next month
        else if (i == lastDateOfMonth) {
          var k = 1;
          for (dow; dow < 6; dow++) {
            html += '<td class="not-current" style="color:gray">' + k + '</td>';
            k++;
          }
        }

        i++;
      } while (i <= lastDateOfMonth);

      // Closes table
      html += '</table>';

      let calendarId: any = document.getElementById(this.divId);
      // Write HTML to the div
      calendarId.innerHTML = html;
    };
    setTimeout(() => {

      // Start calendar
      var c = new Cal("divCal");
      c.showcurr();

      // Bind next and previous button clicks
      getId('btnNext').onclick = ()=> {
        c.nextMonth();
        this.HOLIDAYS_MESSAGE = [];
        clickHolidays();
        this.TableColorChange();
      };
      getId('btnPrev').onclick = ()=> {
        c.previousMonth();
        this.HOLIDAYS_MESSAGE = [];
        clickHolidays();
        this.TableColorChange();
      };
      clickHolidays();    
      this.TableColorChange();
    }, 500);

   const clickHolidays=()=>{
      $(".today").click((e) => {
        if ($(e.target).attr("data-found") == "true") {
          let date = $(e.target).attr("data-index");
          this.HOLIDAYS_MESSAGE = HOLIDAYS_FILTER_DATA.filter((item: any) => item?.date == date?.split("_")?.join(" "))
        } else {
          this.HOLIDAYS_MESSAGE = [];
        }
      })
      $(".normal").click((e) => {
        if ($(e.target).attr("data-found") == "true") {
          let date = $(e.target).attr("data-index");
          this.HOLIDAYS_MESSAGE = HOLIDAYS_FILTER_DATA.filter((item: any) => item?.date == date?.split("_")?.join(" "))
        } else {
          this.HOLIDAYS_MESSAGE = [];
        }
      })
    }
    // Get element by id
    function getId(id: any) {
      return document.getElementById(id) as any;
    }
  }

  filterHolidays(event: any) {
    this.HOLIDAYS_FILTER_DATA = this.apiservice.HOLIDAYS_INDIA.filter((item: any) => item?.name?.toLowerCase()?.indexOf(event?.value?.toLowerCase()) != -1 ||
      item?.date?.toLowerCase()?.indexOf(event?.value?.toLowerCase()) != -1 || item?.days?.toLowerCase()?.indexOf(event?.value?.toLowerCase()) != -1);
    if (this.HOLIDAYS_FILTER_DATA?.length == 0) {
      this.HOLIDAYS_FILTER_DATA = this.apiservice.HOLIDAYS_INDIA;
    }
  }
  splitComma(a:any){
    return a!=undefined?a.split(",")[0]:'';
  }

  TableColorChange(){
    if (this.DISPLAY_MODE=="Dark") {
      $('.calender-ui').css('color','white') 
    }else{
      $('.calender-ui').css('color','black') 
    }
  }
}
