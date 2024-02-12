import { CapacitorConfig } from '@capacitor/cli';
import { Capacitor } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'forex.app',
  appName: 'forexapp App',
  webDir: 'dist/forex-app',
  server: {
    androidScheme: 'http',
    allowNavigation: ['*'],
    cleartext: true
  },
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 1000,
      launchAutoHide: true,
      launchFadeOutDuration: 1000,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "FIT_XY",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
    },
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId: "",
      forceCodeForRefreshToken: false
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    "LocalNotifications": {
      "smallIcon": "ic_stat_icon_config_sample",
      "iconColor": "#488AFF",
      "sound": "beep.wav"
    }
  },
};

export default config;

import { Channel, LocalNotificationSchema, LocalNotifications } from '@capacitor/local-notifications';
//Creating the initial schedule item, using the every-on properties.
async function loadNotification() {
  const randomId = Math.floor(Math.random() * 10000) + 1;
    LocalNotifications.schedule({
      notifications: [
        {
          title: "Test Title",
          body: "Test Body",
          id: randomId,
          schedule: {
            at: new Date(Date.now() + 1000 * 60), // in a minute
            repeats: true,
            every: "minute"
          }
        }
      ]
    });
}

loadNotification();