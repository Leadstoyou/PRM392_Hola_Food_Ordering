package com.example.hola_food_ordering_application.apiService;

import com.example.hola_food_ordering_application.constants.Constants;
import com.google.gson.JsonObject;

import java.util.concurrent.TimeUnit;

import io.reactivex.rxjava3.core.Observable;
import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.adapter.rxjava3.RxJava3CallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.Body;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface APIAuthService {

    HttpLoggingInterceptor ldas = new HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY);

    OkHttpClient.Builder okBuilder = new OkHttpClient.Builder()
            .readTimeout(13, TimeUnit.SECONDS)
            .connectTimeout(13, TimeUnit.SECONDS)
            .retryOnConnectionFailure(true)
            .addInterceptor(ldas);

    APIAuthService apiService = new Retrofit.Builder()
            .baseUrl(Constants.CALL_API_URL_AUTH)
//            .baseUrl("http://192.168.101.2:8080/api/v1/auth/")
//            .baseUrl("http://192.168.137.1:8080/api/v1/auth/")
            .addConverterFactory(GsonConverterFactory.create())
            .addCallAdapterFactory(RxJava3CallAdapterFactory.create())
            .client(okBuilder.build())
            .build()
            .create(APIAuthService.class);

    @POST("google/login")
    Observable<JsonObject> callAPILoginGoogle(@Body JsonObject jsonBody, @Header("Authorization") String jwt);
    @POST("local/login")
    Observable<JsonObject> callAPILoginLocal(@Body JsonObject jsonBody);
    @POST("local/register")
    Observable<JsonObject> callAPIRegisterLocal(@Body JsonObject jsonBody);
}
