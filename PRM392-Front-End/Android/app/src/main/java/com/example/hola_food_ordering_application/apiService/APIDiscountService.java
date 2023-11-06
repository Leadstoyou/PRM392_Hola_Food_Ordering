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
import retrofit2.http.Query;

public interface APIDiscountService {
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
            .baseUrl("http://192.168.101.2:8080/api/v1/discount/")
            .addConverterFactory(GsonConverterFactory.create())
            .addCallAdapterFactory(RxJava3CallAdapterFactory.create())
            .client(okBuilder.build())
            .build()
            .create(APIAuthService.class);

    @GET("getAllDiscount")
    Observable<JsonObject> callAPIGetAllDiscount();
    @GET("getDiscountById")
    Observable<JsonObject> callAPIGetDiscountById(@Query("id") String id);
    @POST("createDiscount")
    Observable<JsonObject> callAPICreateDiscount(@Body JsonObject jsonBody);
    @PUT("updateDiscount")
    Observable<JsonObject> callAPIUpdateDiscount(@Body JsonObject jsonBody);
    @DELETE("deleteDiscount")
    Observable<JsonObject> callAPIDeleteDiscountById(@Body JsonObject jsonBody);
}