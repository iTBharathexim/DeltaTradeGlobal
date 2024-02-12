package forex.app;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.util.Log;

import com.getcapacitor.BridgeActivity;

import java.util.Date;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;
import java.util.logging.Logger;

class Test extends TimerTask {
  private int age;

  public Test() {
    Timer timer = new Timer();
    timer.scheduleAtFixedRate(this, new Date(), 2000);
  }

  /**
   * Implements TimerTask's abstract run method.
   */
  public void run(){
    //toy implementation
    System.out.print("Changing Data ... before change age is "+age+" ");
      changeAge();
      System.out.println("after change age is " + age);
      Log.println(Log.ASSERT, "Thead run", "age : " + age);
  }
  private void changeAge() {
    age = (int)Math.round(Math.random()*1000);
  }
}

