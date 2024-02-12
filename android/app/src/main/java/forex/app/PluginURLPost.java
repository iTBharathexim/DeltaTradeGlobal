package forex.app;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "URLPOST")
public class PluginURLPost extends Plugin {

  @PluginMethod()
  public void post(PluginCall call) {
    bridge.saveCall(call); // <-- add this
    JSObject ret = new JSObject();
    try {
      ret.put("response_text", "helllll ");
      System.out.println("response here: " );
    }
    catch (Exception e) {
      e.printStackTrace();
    }
    //call.setKeepAlive(true);
    call.resolve(ret);
    call.release(bridge); // <-- add this
  }

  /**
   * @param message
   */
  public void onFound(String message) {

  }
}
