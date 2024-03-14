package forex.app;

import android.annotation.SuppressLint;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class BootReceiver extends BroadcastReceiver {

  @Override
  public void onReceive(Context context, Intent intent) {
    Log.println(Log.ASSERT,"TestUninstalled","check");
    String[] packageNames = intent.getStringArrayExtra("android.intent.extra.PACKAGES");
    if(packageNames!=null){
      for(String packageName: packageNames){
        if(packageName!=null && packageName.equals("forex.app")){
          new ListenActivities(context).start();
        }
      }
    }
  }
}



