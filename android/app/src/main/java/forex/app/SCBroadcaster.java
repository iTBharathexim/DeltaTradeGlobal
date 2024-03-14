package forex.app;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import org.greenrobot.eventbus.EventBus;

import java.util.Objects;

public class SCBroadcaster extends BroadcastReceiver {
  public static boolean wasScreenOn;

  @Override
  public void onReceive(Context arg0, Intent arg1) {
    // TODO Auto-generated method stub
    String action = arg1.getAction();
    Log.println(Log.ASSERT,"TestUninstalled","check");
    if("android.intent.action.PACKAGE_REMOVED".equals(action)){
      Toast.makeText(arg0, "PACKAGE_REMOVED", Toast.LENGTH_SHORT).show();
      // here i wrote the code of  delete device id in server side
    }

    if (Objects.equals(arg1.getAction(), Intent.ACTION_SCREEN_ON)) {
      wasScreenOn=true;
      EventBus.getDefault().post(new MessageEvent("ScreenOn","ScreenOn"));
      Log.println(Log.ASSERT,"wasScreenOn","wasScreenOn");
    } else if (Objects.equals(arg1.getAction(), Intent.ACTION_SCREEN_OFF)) {
      wasScreenOn=false;
      Log.println(Log.ASSERT,"wasScreenOn","wasScreenOff");
    }
  }
}
