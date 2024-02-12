package forex.app;

import android.annotation.TargetApi;
import android.app.AlertDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.webkit.CookieManager;
import android.webkit.CookieSyncManager;
import android.webkit.WebView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.getcapacitor.BridgeActivity;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.iid.FirebaseInstanceIdReceiver;
import com.google.firebase.messaging.FirebaseMessaging;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import retrofit2.Retrofit;

public class MainActivity extends BridgeActivity {
  BootReceiver receiver;
  private static final String TAG = "UdpPostActivity";

  private static Retrofit retrofit;
  private static String BASE_URL = "http://192.168.174.20:8082/v1/";
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    IntentFilter intentfilter =new IntentFilter();
    intentfilter.addAction(Intent.ACTION_PACKAGE_ADDED);
    intentfilter.addAction(Intent.ACTION_PACKAGE_CHANGED);
    intentfilter.addAction(Intent.ACTION_PACKAGE_DATA_CLEARED);
    intentfilter.addAction(Intent.ACTION_PACKAGE_REMOVED);
    intentfilter.addAction(Intent.ACTION_PACKAGE_REPLACED);
    intentfilter.addAction(Intent.ACTION_PACKAGE_RESTARTED);
    registerReceiver(receiver,intentfilter);

    // --- Remove bridge init as it's deprecated and add these lines
    registerPlugin(com.capacitorjs.plugins.app.AppPlugin.class);
//    FirebaseMessaging.getInstance().getToken()
//      .addOnCompleteListener(new OnCompleteListener<String>() {
//        @Override
//        public void onComplete(@NonNull Task<String> task) {
//          if (!task.isSuccessful()) {
//            Log.w(TAG, "Fetching FCM registration token failed", task.getException());
//            return;
//          }
//          String token = task.getResult();
//          Log.println(Log.ASSERT,"token", token);
//          try {
//            JSONObject jsonObject = new JSONObject();
//            jsonObject.put("id","it@bharathexim.com");
//            jsonObject.put("deviceId", token);
//            String jsonString = jsonObject.toString();
//            new PostData().execute(jsonString);
//          } catch (Exception e) {
//            e.printStackTrace();
//          }
//        }
//      });

//    if (ContextCompat.checkSelfPermission(getBaseContext(), Manifest.permission.) != PackageManager.PERMISSION_GRANTED) {
//      if (ActivityCompat.shouldShowRequestPermissionRationale((Activity) getBaseContext(), Manifest.permission.READ_EXTERNAL_STORAGE)) {
//        AlertDialog.Builder alertBuilder = new AlertDialog.Builder(getBaseContext());
//        alertBuilder.setCancelable(true);
//        alertBuilder.setTitle("Permission necessary");
//        alertBuilder.setMessage("External storage permission is necessary");
//        alertBuilder.setPositiveButton(android.R.string.yes, DialogInterface.OnClickListener() {
//          @TargetApi(Build.VERSION_CODES.)
//          public void onClick(DialogInterface dialog, int which) {
//            ActivityCompat.requestPermissions((Activity) getBaseContext(), new String[]{Manifest.permission.READ_EXTERNAL_STORAGE}, MY_PERMISSIONS_REQUEST_READ_EXTERNAL_STORAGE);}});
//
//        AlertDialog alert = alertBuilder.create();
//        alert.show();
//      } else {
//        ActivityCompat.requestPermissions((Activity) getBaseContext(), new String[]{Manifest.permission.READ_EXTERNAL_STORAGE}, MY_PERMISSIONS_REQUEST_READ_EXTERNAL_STORAGE);}
//      return false;
//    }
//    else {
//      return true;
//    }
  }

  @Override
  public void onDestroy() {
    unregisterReceiver(receiver);
    super.onDestroy();
    Log.v("onDestroy:", "App Destroy");
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

  @Override
  public void onPageFinished(WebView view, String url){
    String cookies = CookieManager.getInstance().getCookie(url);
    Log.println(Log.ASSERT, TAG,"All the cookies in a string:" + cookies);
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

 public void ThreadRun(){
   Timer timer = new Timer();
   timer.scheduleAtFixedRate(new TimerTask() {
     @Override
     public void run() {
       BroadcastReceiver obj= new BroadcastReceiver() {
         /**
          * @param context
          * @param intent
          */
         @Override
         public void onReceive(Context context, Intent intent) {
           String[] packageNames = intent.getStringArrayExtra("android.intent.extra.PACKAGES");
           Log.println(Log.ASSERT, "TestUninstalled:", Arrays.toString(packageNames));
           for(String packageName: packageNames){
             Log.println(Log.ASSERT, "TestUninstalled:", packageName);
           }
         }
       };
       IntentFilter intentFilter = new IntentFilter();
       intentFilter.addAction(Intent.ACTION_PACKAGE_REMOVED);
       intentFilter.addDataScheme("package");
       registerReceiver(obj, intentFilter);
       System.out.print("Changing Data ... before change age is "+age+" ");
       if (checkPackage().size()!=0) {
         changeAge();
         System.out.println("after change age is " + age);
         Log.println(Log.ASSERT, "IF Thead run", "age : " + age);
         try {
           JSONObject jsonObject = new JSONObject();
           jsonObject.put("id","it@bharathexim.com");
           jsonObject.put("user", "");
           String jsonString = jsonObject.toString();
           new PostData().execute(jsonString);
         } catch (Exception e) {
           e.printStackTrace();
         }
       }else{
         Log.println(Log.ASSERT, "ELSE Thead run", "age : " + age);
         //code here on uninstall
         timer.cancel();
       }
     }
   }, new Date(), 2000);
  }
  private int age;
  private void changeAge() {
    age = (int)Math.round(Math.random()*1000);
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
  @Override
  public void onClick(View view) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      view.requestPointerCapture();
    }
  }
}

