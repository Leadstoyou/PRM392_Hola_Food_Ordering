package com.example.hola_food_ordering_application;

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

public interface APIService {

    HttpLoggingInterceptor ldas = new HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY);

    OkHttpClient.Builder okBuilder = new OkHttpClient.Builder()
            .readTimeout(13, TimeUnit.SECONDS)
            .connectTimeout(13, TimeUnit.SECONDS)
            .retryOnConnectionFailure(true)
            .addInterceptor(ldas);

    APIService apiService = new Retrofit.Builder()
            .baseUrl("https://hola-food-ordering-application.onrender.com/api/v1/auth/")
//            .baseUrl("http://192.168.101.2:8080/api/v1/auth/")
//            .baseUrl("http://192.168.137.1:3000/auth/")
            .addConverterFactory(GsonConverterFactory.create())
            .addCallAdapterFactory(RxJava3CallAdapterFactory.create())
            .client(okBuilder.build())
            .build()
            .create(APIService.class);

    @POST("google")
    Observable<JsonObject> callAPI(@Body JsonObject jsonBody, @Header("Authorization") String jwt);

}
