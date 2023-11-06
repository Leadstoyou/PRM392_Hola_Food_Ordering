package com.example.hola_food_ordering_application.apiService;

import com.google.gson.JsonObject;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import io.reactivex.rxjava3.core.Observable;
import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.adapter.rxjava3.RxJava3CallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface APIOrderService {
    HttpLoggingInterceptor ldas = new HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY);
    String token ="";
    OkHttpClient.Builder okBuilder = new OkHttpClient.Builder()
            .readTimeout(13, TimeUnit.SECONDS)
            .connectTimeout(13, TimeUnit.SECONDS)
            .retryOnConnectionFailure(true)
            .addInterceptor(ldas)
            .addInterceptor(new Interceptor() {
                @Override
                public Response intercept(Chain chain) throws IOException {
                    Request newRequest  = chain.request().newBuilder()
                            .addHeader("Authorization", "Bearer " + token)
                            .build();
                    return chain.proceed(newRequest);
                }
            });

    APIAuthService apiService = new Retrofit.Builder()
//            .baseUrl(Constants.CALL_API_URL_AUTH)
            .baseUrl("http://192.168.101.2:8080/api/v1/order/")
            .addConverterFactory(GsonConverterFactory.create())
            .addCallAdapterFactory(RxJava3CallAdapterFactory.create())
            .client(okBuilder.build())
            .build()
            .create(APIAuthService.class);

    @GET("get-all")
    Observable<JsonObject> callAPIGetAllOrder();
    @GET("get/{id}")
    Observable<JsonObject> callAPIGetOrderById(@Path("id") String id);
    @POST("update/{id}")
    Observable<JsonObject> callAPICreateOrder(@Path("id") String id, @Body JsonObject jsonBody);
    @PUT("update/{id}")
    Observable<JsonObject> callAPIUpdateOrder(@Path("id") String id, @Body JsonObject jsonBody);

}
