package forex.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.UserManager;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.webkit.WebView;
import android.widget.Toast;
import com.capacitorjs.plugins.app.AppPlugin;
import com.getcapacitor.Bridge;
import com.getcapacitor.BridgeActivity;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import io.capacitor.plugins.event.EventPlugin;

public class MainActivity extends BridgeActivity {
  BootReceiver receiver;
  private static final String TAG = "UdpPostActivity";
  private static String BASE_URL = "http://192.168.224.20:8082/v1/";
//  private static String BASE_URL = "https://forexappapi.bharathexim.com/v1/";
  public ArrayList<String> WHITE_LISTING_URL;
  private boolean doubleBackPressed = false;
  private static WebView webview;

  @SuppressLint({"SetJavaScriptEnabled", "JavascriptInterface", "ClickableViewAccessibility"})
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    WHITE_LISTING_URL= new ArrayList<String>();
    WHITE_LISTING_URL.add("/Login");
    WHITE_LISTING_URL.add("/Registration");
    WHITE_LISTING_URL.add("/ResetPassword");
    WHITE_LISTING_URL.add("/OnboardingScreen");

    IntentFilter intentfilter =new IntentFilter();
    intentfilter.addAction(Intent.ACTION_PACKAGE_ADDED);
    intentfilter.addAction(Intent.ACTION_PACKAGE_CHANGED);
    intentfilter.addAction(Intent.ACTION_PACKAGE_DATA_CLEARED);
    intentfilter.addAction(Intent.ACTION_PACKAGE_REMOVED);
    intentfilter.addAction(Intent.ACTION_PACKAGE_REPLACED);
    intentfilter.addAction(Intent.ACTION_PACKAGE_RESTARTED);
    registerReceiver(receiver,intentfilter);

    IntentFilter filter = new IntentFilter(Intent.ACTION_SCREEN_OFF);
    filter.addAction(Intent.ACTION_SCREEN_ON);
    BroadcastReceiver bre = new SCBroadcaster();
    registerReceiver(bre, filter);

    webview = Bridge.getWebview();;
    webview.getSettings().setJavaScriptEnabled(true);
    registerPlugin(AppPlugin.class);
    registerPlugin(EventPlugin.class);
    EventBus.getDefault().register(this);
    webview.setOnTouchListener(new View.OnTouchListener() {
      @Override
      public boolean onTouch(View view, MotionEvent motionEvent) {
        EventBus.getDefault().post(new MessageEvent("TouchApp","SessionLogoutAllDevice"));
        return false;
      }
    });
  }

  @Subscribe(threadMode = ThreadMode.MAIN)
  public void onMessageEvent(MessageEvent event) {
    switch (event.getKey()) {
      case "SessionLogoutAllDevice" -> {
        webview.clearCache(true);
        webview.clearHistory();
        webview.reload();
        webview.loadUrl("javascript:localStorage.clear()");
        Log.println(Log.ASSERT, "SessionLogoutAllDevice", "Url : " + event.getMessage());
      }
      case "TouchApp" -> {
        if (!Objects.equals(webview.getUrl(), "http://localhost/Login")) {
          EventPlugin.getInstance().SessionTimerStop();
          EventPlugin.getInstance().TimerStart(EventPlugin.getInstance().DEFAULT_VALUE_TIMER);
          Log.println(Log.ASSERT, "SessionLogoutAllDevice", "Url : " + webview.getUrl());
        }else{
          EventPlugin.getInstance().SessionTimerStop();
        }
      }
      case "ScreenOn" -> {
        if (!Objects.equals(webview.getUrl(), "http://localhost/Login") &&
          !Objects.equals(webview.getUrl(), "http://localhost/OnboardingScreen") &&
          !Objects.equals(webview.getUrl(), "http://localhost/ResetPassword") &&
          !Objects.equals(webview.getUrl(), "http://localhost/Registration") &&
          EventPlugin.getInstance().CounterTimer) {
          webview.clearCache(true);
          webview.clearHistory();
          webview.reload();
          webview.loadUrl("javascript:localStorage.clear()");
        }

        if (Objects.equals(webview.getUrl(), "http://localhost/LiveTradeApp")) {
          EventPlugin.getInstance().timerResume();
          EventPlugin.getInstance().OnScreenState(true);
          Log.println(Log.ASSERT, "ScreenOn", "Url : " + webview.getUrl()+" : "+EventPlugin.getInstance().CounterTimer);
         }else{
           EventPlugin.getInstance().SessionTimerStop();
         }
       }
        default -> {
      }
    }
  };

  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    Log.println(Log.ASSERT,"onActivityResult","onActivityResult");
    if (requestCode == 1234) {
      if(resultCode == Activity.RESULT_OK){
        //Deleted
      }
      if (resultCode == Activity.RESULT_CANCELED) {
        //Dismissed
      }
    }
  }//on
  @Override
  public void onDestroy() {
    unregisterReceiver(receiver);
    super.onDestroy();
    Log.v("onDestroy:", "App Destroy");
  }

  @Override
  public void onClick(View view) {

  }

  public void onPause() {
    super.onPause();
    Log.println(Log.ASSERT,"wasScreenOn","onPause");
    EventPlugin.getInstance().OnScreenState(false);
  }

  public void onResume() {
    super.onResume();
    EventBus.getDefault().post(new MessageEvent("ScreenOn","ScreenOn"));
    Log.println(Log.ASSERT,"wasScreenOn","onResume");
  }

  @Override
  public WebView getWebView() {
    return webview;
  }

  static void setStaticWebView(String url) {
    webview.loadUrl(url);
  }

  @Override
  public void onSaveInstanceState(Bundle outState) {
     super.onSaveInstanceState(outState);
    Log.v(TAG, "Saved instance state"+outState.toString());
  }

  @Override
  protected void onRestoreInstanceState(Bundle savedInstanceState) {
    super.onRestoreInstanceState(savedInstanceState);
    Log.v(TAG, "onRestore");
  }

  public List<String> checkPackage(){
    List<String> filteredList = new ArrayList<>();
    final PackageManager pm = getPackageManager();
    List<ApplicationInfo> packages = pm.getInstalledApplications(PackageManager.GET_META_DATA);
    for (ApplicationInfo packageInfo : packages) {
      if (packageInfo.packageName.equals("forex.app")){
        filteredList.add(packageInfo.packageName);
        Log.println(Log.ASSERT, "Installed package :" , packageInfo.packageName);
        Log.println(Log.ASSERT, "Source dir : " , packageInfo.sourceDir);
        Log.println(Log.ASSERT, "Launch Activity :" , String.valueOf(pm.getLaunchIntentForPackage(packageInfo.packageName)));
      }
    }
    return filteredList;
  }

  public void SessionLogoutAllDevice() {
    Log.println(Log.ASSERT, "SessionLogoutAllMain", "SessionLogoutAllDevice : "+webview.getUrl());
//    webview.loadUrl("https://localhost/");
  }

  // on below line creating a class to post the data.
  class PostData extends AsyncTask<String, Void, String> {
    @Override
    protected String doInBackground(String... strings) {
      try {
        // on below line creating a url to post the data.
        URL url = new URL(BASE_URL+"LiveTradeApp/updatedeviceId");
        // on below line opening the connection.
        HttpURLConnection client = (HttpURLConnection) url.openConnection();
        // on below line setting method as post.
        client.setRequestMethod("POST");

        // on below line setting content type and accept type.
        client.setRequestProperty("Content-Type", "application/json");
        client.setRequestProperty("Accept", "application/json");
        // on below line setting client.
        client.setDoOutput(true);
        // on below line we are creating an output stream and posting the data.
        try (OutputStream os = client.getOutputStream()) {
          byte[] input = strings[0].getBytes("utf-8");
          os.write(input, 0, input.length);
        }
        // on below line creating and initializing buffer reader.
        try (BufferedReader br = new BufferedReader(
          new InputStreamReader(client.getInputStream(), "utf-8"))) {
          // on below line creating a string builder.
          StringBuilder response = new StringBuilder();
          // on below line creating a variable for response line.
          String responseLine = null;
          while ((responseLine = br.readLine()) != null) {
            response.append(responseLine.trim());
          }
        }
      } catch (Exception e) {
        e.printStackTrace();
      }
      return null;
    }
  }

  public boolean onTouchEvent(MotionEvent event) {
    int index = event.getActionIndex();
    int action = event.getActionMasked();
    int pointerId = event.getPointerId(index);

    switch (action) {
      case MotionEvent.ACTION_DOWN -> Log.println(Log.ASSERT, "ACTION_DOWN", "ACTION_DOWN");
      case MotionEvent.ACTION_MOVE -> Log.println(Log.ASSERT, "ACTION_MOVE", "ACTION_MOVE");
      case MotionEvent.ACTION_UP -> Log.println(Log.ASSERT, "ACTION_UP", "ACTION_UP");
      case MotionEvent.ACTION_CANCEL -> Log.println(Log.ASSERT, "ACTION_CANCEL", "ACTION_CANCEL");
    }
    return true;
  }
  @SuppressLint("SetJavaScriptEnabled")
  @Override
  public void onBackPressed() {
    if (doubleBackPressed) {
      super.onBackPressed(); // Exit the app
    } else {
      if (Objects.equals(webview.getUrl(), "http://localhost/Login") || Objects.equals(webview.getUrl(), "https://localhost/Login") || Objects.equals(webview.getUrl(), "http://localhost/LiveTradeApp")){
        doubleBackPressed = true;
        AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(this);
        alertDialogBuilder.setTitle("Exit Application?");
        alertDialogBuilder
          .setMessage("Click yes to exit!")
          .setCancelable(false)
          .setPositiveButton("Yes",
            new DialogInterface.OnClickListener() {
              public void onClick(DialogInterface dialog, int id) {
                moveTaskToBack(true);
                webview.clearCache(true);
                webview.clearHistory();
                webview.loadUrl("javascript:localStorage.clear()");
                android.os.Process.killProcess(android.os.Process.myPid());
                System.exit(1);
                deleteCache(getBaseContext());
              }
            })
          .setNegativeButton("No", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
              dialog.cancel();
              doubleBackPressed=false;
            }
          });
        AlertDialog alertDialog = alertDialogBuilder.create();
        alertDialog.show();
        Toast.makeText(this, "Press back again to exit",
          Toast.LENGTH_SHORT).show();
      }else{
        if (webview.canGoBack()){
          webview.goBack();
        }
      }
    }
  }

  public static void deleteCache(Context context) {
    try {
      File dir = context.getCacheDir();
      deleteDir(dir);
    } catch (Exception e) { e.printStackTrace();}
  }

  public static boolean deleteDir(File dir) {
    if (dir != null && dir.isDirectory()) {
      String[] children = dir.list();
      for (int i = 0; i < children.length; i++) {
        boolean success = deleteDir(new File(dir, children[i]));
        if (!success) {
          return false;
        }
      }
      return dir.delete();
    } else if(dir!= null && dir.isFile()) {
      return dir.delete();
    } else {
      return false;
    }
  }
}

