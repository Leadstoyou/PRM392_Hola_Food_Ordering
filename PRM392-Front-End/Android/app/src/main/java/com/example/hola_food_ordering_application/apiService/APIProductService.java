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
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface APIProductService {
    HttpLoggingInterceptor ldas = new HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY);
    OkHttpClient.Builder okBuilder = new OkHttpClient.Builder()
            .readTimeout(13, TimeUnit.SECONDS)
            .connectTimeout(13, TimeUnit.SECONDS)
            .retryOnConnectionFailure(true)
            .addInterceptor(ldas);

    APIAuthService apiService = new Retrofit.Builder()
//            .baseUrl(Constants.CALL_API_URL_AUTH)
            .baseUrl("http://192.168.101.2:8080/api/v1/product/")
            .addConverterFactory(GsonConverterFactory.create())
            .addCallAdapterFactory(RxJava3CallAdapterFactory.create())
            .client(okBuilder.build())
            .build()
            .create(APIAuthService.class);

    @POST("create")
    Observable<JsonObject> callAPICreateProduct(@Body JsonObject jsonBody);
    @PUT("update/{id}")
    Observable<JsonObject> callAPIUpdateProduct(@Path("id") String id, @Body JsonObject jsonBody);
    @GET("get-all")
    Observable<JsonObject> callAPIGetAllProduct();
    @GET("get/{id}")
    Observable<JsonObject> callAPIGetProductById(@Path("id") String id);
    @DELETE("delete/{id}")
    Observable<JsonObject> callAPIGetProductById(@Path("id") String id,@Body JsonObject jsonBody);
}
