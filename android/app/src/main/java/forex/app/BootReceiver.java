package forex.app;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.POST;

public class BootReceiver extends BroadcastReceiver {
  private static Retrofit retrofit;
  private static String BASE_URL = "http://192.168.95.20:8082/v1/";
  @Override
  public void onReceive(Context context, Intent intent) {
    Log.v("TestUninstalled:","check");
    if (intent.getAction().equals("android.intent.action.PACKAGE_ADDED")) {
      //code here on install
      Log.i("Installed:", intent.getDataString());
    }

    String[] packageNames = intent.getStringArrayExtra("android.intent.extra.PACKAGES");
    if(packageNames!=null){
      for(String packageName: packageNames){
        Log.v("TestUninstalled:", packageName);
        if(packageName!=null && packageName.equals("forex.app")){
          //Do Something ?
          new ListenActivities(context).start();
          Log.v("TestUninstalled:", intent.getDataString());
        }
      }
    }

  }
  public static Retrofit getRetrofitInstance() {
    if (retrofit == null) {
      retrofit = new Retrofit.Builder().baseUrl(BASE_URL).addConverterFactory(GsonConverterFactory.create()).build();
    }
    return retrofit;
  }
}



