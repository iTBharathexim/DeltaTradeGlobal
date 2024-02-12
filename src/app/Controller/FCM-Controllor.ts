import { Injectable } from '@angular/core';
import { FCM } from '@capacitor-community/fcm';
import { Capacitor } from '@capacitor/core';
import { ApiService } from '../services/api.service';

@Injectable({
    providedIn: 'root'
})
export class FCmController {

    constructor(public userService?: ApiService) {

    }

    ChangeDeviceId(emailId: any) {
        console.log(Capacitor.getPlatform())
        if (Capacitor.getPlatform() === 'andorid') {
            FCM.setAutoInit({ enabled: true }).then(() => alert(`Auto init enabled`));
            FCM.isAutoInitEnabled().then(r => {
                console.log('Auto init is ' + (r.enabled ? 'enabled' : 'disabled'));
            });
            FCM.getToken().then(r => {
                this.userService.UpdateDeviceId(emailId, r.token).subscribe((res) => { })
            }).catch(err => console.log(err));
        }
    }

    getDeviceId() {
        return new Promise((resolve, reject) => {
            FCM.getToken().then(r => {
                resolve(r.token)
            }).catch(err => console.log(err));
        })
    }

    getPlatformAndorid() {
        return Capacitor.getPlatform() == 'andorid' ? true : false;
    }

    getPlatform() {
        return Capacitor.getPlatform();
    }
}