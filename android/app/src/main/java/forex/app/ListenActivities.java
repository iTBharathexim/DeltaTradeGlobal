package forex.app;

import android.app.ActivityManager;
import android.content.Context;
import android.os.Looper;
import android.util.Log;
import android.widget.Toast;

import java.util.List;

public class ListenActivities extends Thread{
  boolean exit = false;
  ActivityManager am = null;
  Context context = null;

  public ListenActivities(Context con){
    context = con;
    am = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
  }

  public void run(){
    Looper.prepare();
    while(!exit){
      // get the info from the currently running task
      List< ActivityManager.RunningTaskInfo > taskInfo = am.getRunningTasks(MAX_PRIORITY);
      String activityName = taskInfo.get(0).topActivity.getClassName();
      Log.d("topActivity", "CURRENT Activity ::"
        + activityName);
      if (activityName.equals("com.android.packageinstaller.UninstallerActivity")) {
         exit = true;
        Toast.makeText(context, "Done with preuninstallation tasks... Exiting Now", Toast.LENGTH_SHORT).show();
      } else if(activityName.equals("com.android.settings.ManageApplications")) {
        exit=true;
      }
    }
    Looper.loop();
  }
}
