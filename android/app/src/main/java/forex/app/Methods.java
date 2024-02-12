package forex.app;

import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.POST;

public interface Methods {
  @FormUrlEncoded
  @POST("LiveTradeApp/update")
  Call<String> getUserData(String name);
}
