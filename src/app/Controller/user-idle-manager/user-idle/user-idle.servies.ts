import { Injectable, OnInit } from '@angular/core';
import { NgIdleService } from '../service/ng-idle.service';

@Injectable({
    providedIn: 'root'
})
export class UserIdleService implements OnInit {
    onstop() {
      throw new Error('Method not implemented.');
    }
    idleTimerLeft: any = null;
    secondTimerLeft: string;
    timeRemain: number;
    FULL_DASH_ARRAY = 283;
    constructor(private ngIdle: NgIdleService) { }

    ngOnInit(): void {
    }

    formatTimeLeft = (time: any) => {
        let timeformat: any = "00:00"
        if (time > 0) {
            let seconds = Math.trunc(time / 1000);
            this.setCircleDasharray(seconds);
            let min = 0;
            if (seconds >= 60) {
                min = Math.trunc(seconds / 60);
                seconds -= (min * 60);
            }
            timeformat = `${min}:${seconds}`;
        }
        return timeformat;
    }

    setCircleDasharray = (elapsedTime: number) => {
        const timeLimit = this.firstLevelTimer * 60;
        this.timeRemain = elapsedTime / timeLimit;
        const circleDasharray = `${(
            this.timeRemain * this.FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
    }

    firstLevelTimer: number = 0;
    secondLevelTimer: number = 0
    onStart(firstLevelTimer: number, secondLevelTimer: number, callback: any) {
        this.firstLevelTimer = firstLevelTimer;
        this.secondLevelTimer = secondLevelTimer
        this.initTimer(firstLevelTimer, secondLevelTimer, callback);
    }

    initTimer(firstTimerValue: number, secondTimerValue: number, callback: any): void {
        // Timer value initialization
        this.ngIdle.USER_IDLE_TIMER_VALUE_IN_MIN = firstTimerValue;
        this.ngIdle.FINAL_LEVEL_TIMER_VALUE_IN_MIN = secondTimerValue;
        // end

        // Watcher on timer
        this.ngIdle.initilizeSessionTimeout();
        this.ngIdle.userIdlenessChecker.subscribe((status: string) => {
            this.initiateFirstTimer(status);
            callback(this.idleTimerLeft);
        });

        this.ngIdle.secondLevelUserIdleChecker.subscribe((status: string) => {
            this.initiateSecondTimer(status);
            callback(this.idleTimerLeft);
        });
    }

    initiateFirstTimer = (status: string) => {
        switch (status) {
            case 'INITIATE_TIMER':
                break;
            case 'RESET_TIMER':
                break;
            case 'STOPPED_TIMER':
                this.showSendTimerDialog();
                break;
            default:
                this.idleTimerLeft = this.formatTimeLeft(Number(status));
                break;
        }
    }

    initiateSecondTimer = (status: string) => {
        switch (status) {
            case 'INITIATE_SECOND_TIMER':
                break;
            case 'SECOND_TIMER_STARTED':
                break;
            case 'SECOND_TIMER_STOPPED':
                this.logout();
                break;
            default:
                this.secondTimerLeft = status;
                break;
        }
    }

    showSendTimerDialog(): void {
        // const modal = document.getElementById('myModal');
        // modal.style.display = 'block';
    }

    continue(): void {
        NgIdleService.runSecondTimer = false;
        this.ngIdle.initilizeSessionTimeout();
    }

    logout(): void {
        // stop all timer and end the session
        NgIdleService.runTimer = false;
        NgIdleService.runSecondTimer = false;
    }

}
