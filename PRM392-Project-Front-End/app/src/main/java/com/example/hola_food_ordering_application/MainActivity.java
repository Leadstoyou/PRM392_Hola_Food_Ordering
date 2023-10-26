package com.example.hola_food_ordering_application;

import androidx.appcompat.app.AppCompatActivity;

import android.accounts.Account;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.Scopes;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.common.api.Scope;
import com.google.android.gms.tasks.Task;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;


import io.reactivex.rxjava3.annotations.NonNull;
import io.reactivex.rxjava3.core.Observer;
import io.reactivex.rxjava3.disposables.Disposable;
import io.reactivex.rxjava3.schedulers.Schedulers;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {
    GoogleSignInOptions gso;
    GoogleSignInClient gsc;
    Button googleBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        googleBtn = findViewById(R.id.google_btn);

        gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(getString(R.string.server_client_id))
                .requestEmail()
                .build();
        gsc = GoogleSignIn.getClient(this,gso);

        GoogleSignInAccount acct = GoogleSignIn.getLastSignedInAccount(this);

        if(acct!=null){
            if (acct.getIdToken() != null && !acct.getIdToken().isEmpty()) {
                String idToken = acct.getIdToken();
                Log.d("dattt.debug23", idToken);
            } else {
                Log.d("dattt.debug23", "idToken is null or empty");
            }
            Gson gson = new Gson();
            String json = gson.toJson(acct);
            JsonObject jsonObject = gson.fromJson(json, JsonObject.class);

            APIService.apiService.callAPI(jsonObject,acct.getIdToken())
                    .subscribeOn(Schedulers.io())
                    .observeOn(Schedulers.single())
                    .subscribe(new Observer<JsonObject>() {
                                   @Override
                                   public void onSubscribe(@NonNull Disposable d) {
                                       Log.d("dattt","onSubc");
                                   }
                                   @Override
                                   public void onNext(@NonNull JsonObject s) {
                                       Log.d("dattt",s.toString());
                                   }

                                   @Override
                                   public void onError(@NonNull Throwable e) {
                                       Log.d("dattt",e.getMessage());
                                   }
                                   @Override
                                   public void onComplete() {
                                       Log.d("dattt","3231231");
                                   }
                               }

                    );
            navigateToSecondActivity();
        }
        googleBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                signIn();
            }
        });



    }

    void signIn(){
        Intent signInIntent = gsc.getSignInIntent();
        startActivityForResult(signInIntent,1000);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode,Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(requestCode == 1000){
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            try {
               GoogleSignInAccount acc = task.getResult(ApiException.class);
                navigateToSecondActivity();
            } catch (ApiException e) {
                Log.d("dattt.debug3",  e.toString());
                Toast.makeText(getApplicationContext(), "Something went wrong", Toast.LENGTH_SHORT).show();
            }
        }

    }
    void navigateToSecondActivity(){
        finish();
        Intent intent = new Intent(MainActivity.this,SecondActivity.class);
        startActivity(intent);
    }
}