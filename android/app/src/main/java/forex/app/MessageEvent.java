package forex.app;

import com.getcapacitor.Plugin;
public class MessageEvent extends Plugin {
  private String message;
  private String key;

  public MessageEvent(String key, String message) {
    this.key=key;
    this.message = message;
  }

  public String getMessage() {
    return message;
  }
  public String getKey() {
    return key;
  }
}
