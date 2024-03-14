package forex.app;

import android.accessibilityservice.AccessibilityButtonController;
import android.accessibilityservice.AccessibilityService;
import android.accessibilityservice.AccessibilityServiceInfo;
import android.app.Service;
import android.os.Build;
import android.util.Log;
import android.view.accessibility.AccessibilityEvent;

public class MyAccessibilityService extends AccessibilityService {
  private AccessibilityButtonController accessibilityButtonController;
  private AccessibilityButtonController
    .AccessibilityButtonCallback accessibilityButtonCallback;
  private boolean mIsAccessibilityButtonAvailable;

  @Override
  public void onAccessibilityEvent(AccessibilityEvent accessibilityEvent) {
    Log.d("MY_APP_TAG", "Accessibility button pressed!");
    if (accessibilityEvent.getEventType() == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) {

      if(accessibilityEvent.getText().equals("check for content in popup which is in screenshot")){

        /**Do your task*/
      }

    }
  }

  @Override
  public void onInterrupt() {

  }

  @Override
  protected void onServiceConnected() {
    Log.d("MY_APP_TAG", "Accessibility button pressed!");
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      accessibilityButtonController = getAccessibilityButtonController();
    }
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      mIsAccessibilityButtonAvailable =
        accessibilityButtonController.isAccessibilityButtonAvailable();
    }

    if (!mIsAccessibilityButtonAvailable) {
      return;
    }

    AccessibilityServiceInfo serviceInfo = getServiceInfo();
    serviceInfo.flags
      |= AccessibilityServiceInfo.FLAG_REQUEST_ACCESSIBILITY_BUTTON;
    setServiceInfo(serviceInfo);

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      accessibilityButtonCallback =
        new AccessibilityButtonController.AccessibilityButtonCallback() {
          @Override
          public void onClicked(AccessibilityButtonController controller) {
            Log.d("MY_APP_TAG", "Accessibility button pressed!");

            // Add custom logic for a service to react to the
            // accessibility button being pressed.
          }

          @Override
          public void onAvailabilityChanged(
            AccessibilityButtonController controller, boolean available) {
            if (controller.equals(accessibilityButtonController)) {
              mIsAccessibilityButtonAvailable = available;
            }
          }
        };
    }

    if (accessibilityButtonCallback != null) {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        accessibilityButtonController.registerAccessibilityButtonCallback(
          accessibilityButtonCallback, null);
      }
    }

    super.onServiceConnected();
    AccessibilityServiceInfo info = new AccessibilityServiceInfo();
    info.flags = AccessibilityServiceInfo.DEFAULT;
    info.packageNames = new String[]{"com.android.packageinstaller"};
    info.eventTypes = AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED | AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED;
    info.feedbackType = AccessibilityServiceInfo.FEEDBACK_GENERIC;
    setServiceInfo(info);
  }
}
