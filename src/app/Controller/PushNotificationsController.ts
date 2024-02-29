import {
    PushNotifications,
} from '@capacitor/push-notifications';


export class PushNotificationsController {
    static async LoadPushNotifications() {
        console.log('Initializing PushNotificationsController');
        // Request permission to use push notifications
        // iOS will prompt user and return if they granted permission or not
        // Android will just grant without prompting
        // PushNotifications.requestPermissions().then(result => {
        //     if (result.receive) {
        //         // Register with Apple / Google to receive push via APNS/FCM
        //         PushNotifications.register();
        //     } else {
        //         // Show some error
        //     }
        // });

        // On success, we should be able to receive notifications
        PushNotifications.addListener('registration', (token) => {
            // alert('Push registration success, token: ' + token.value);
        });

        // Some issue with our setup and push will not work
        PushNotifications.addListener('registrationError', (error: any) => {
            // alert('Error on registration: ' + JSON.stringify(error));
        });

        // Show us the notification payload if the app is open on our device
        await PushNotifications.addListener('pushNotificationReceived', notification => {
            alert('Push received: ' + JSON.stringify(notification));
        });

        await PushNotifications.addListener('pushNotificationReceived', notification => {
            console.log('Push notification received: ', notification);
        });

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
            // alert('Push action performed: ' + JSON.stringify(notification));
        });
    }
}