package forex.app;

import android.accessibilityservice.AccessibilityService;
import android.accessibilityservice.AccessibilityServiceInfo;
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
      if(event.getText().equals("check for content in popup which is in screenshot")){
        /**Do your task*/
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
