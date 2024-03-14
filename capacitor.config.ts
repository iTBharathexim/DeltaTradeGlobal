import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'forex.app',
  appName: 'DeltaTradeGlobal',
  webDir: 'dist/forex-app',
  server: {
    androidScheme: 'http',
    allowNavigation: ['*'],
    cleartext: true
  },
  bundledWebRuntime: false,
  plugins: {
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