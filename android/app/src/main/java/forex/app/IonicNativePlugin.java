package forex.app;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "IonicNativePlugin")
public class IonicNativePlugin extends Plugin {
  @PluginMethod
  public void NotifyListeners(PluginCall call){
    JSObject result = new JSObject();
    result.put("message", "Hello!");
    notifyListeners("Uninstall", result);
  }

  @PluginMethod(returnType = PluginMethod.RETURN_NONE)
  public void method1(PluginCall call) {
  }

  public void TheMethodIWantToCall(){
    JSObject ret = new JSObject();
    ret.put("message", "Hello from LISTENER!!");
    notifyListeners("Uninstall", ret);
  }

  /**
   * @param message
   */
  public void onFound(String message) {

  }
}
