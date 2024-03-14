package forex.app;

import android.accessibilityservice.AccessibilityService;
import android.accessibilityservice.AccessibilityServiceInfo;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.view.accessibility.AccessibilityEvent;
import android.widget.Toast;

public class UninstallService extends AccessibilityService {
  @Override
  public void onCreate() {
    super.onCreate();
  }

  @Override
  public void onAccessibilityEvent(AccessibilityEvent event) {
    if (event.getEventType() == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) {
      Toast.makeText(this, "Press back again to exit",
        Toast.LENGTH_SHORT).show();
      if(event.getText().equals("check for content in popup which is in screenshot")){
        Toast.makeText(this, "Thellllllllllll", Toast.LENGTH_SHORT).show();
        AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(this);
        alertDialogBuilder.setTitle("Exit Application?");
        alertDialogBuilder
          .setMessage("Click yes to exit!")
          .setCancelable(false)
          .setPositiveButton("Yes",
            new DialogInterface.OnClickListener() {
              public void onClick(DialogInterface dialog, int id) {

              }
            })
          .setNegativeButton("No", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
              dialog.cancel();
            }
          });
        AlertDialog alertDialog = alertDialogBuilder.create();
        alertDialog.show();

      }
    }
  }
  @Override
  public void onInterrupt() {
  }

  @Override
  protected void onServiceConnected() {
    super.onServiceConnected();
    AccessibilityServiceInfo info = new AccessibilityServiceInfo();
    info.flags = AccessibilityServiceInfo.DEFAULT;
    info.packageNames = new String[]{"com.android.packageinstaller"};
    info.eventTypes = AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED | AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED;
    info.feedbackType = AccessibilityServiceInfo.FEEDBACK_GENERIC;
    setServiceInfo(info);
  }
}
