package com.example.hola_food_ordering_application;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import io.reactivex.rxjava3.android.schedulers.AndroidSchedulers;
import io.reactivex.rxjava3.annotations.NonNull;
import io.reactivex.rxjava3.core.Observer;
import io.reactivex.rxjava3.disposables.Disposable;
import io.reactivex.rxjava3.schedulers.Schedulers;

public class LoginActivity extends AppCompatActivity {

    private EditText email, password;
    private TextView forgotPassword, register;
    private ImageView google_login;

    private GoogleSignInOptions gso;
    private GoogleSignInClient gsc;

    private ProgressDialog mProgressDialog;
    private Disposable mDisposable;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        bindingView();
        bindingAction();
    }
    private void bindingView() {
        email = findViewById(R.id.email_input);
        password = findViewById(R.id.password_input);
        forgotPassword = findViewById(R.id.forgot_password_btn);
        register = findViewById(R.id.register_btn);
        google_login = findViewById(R.id.google_sign_in_btn);
    }
    private void bindingAction() {
        gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(getString(R.string.server_client_id))
                .requestEmail()
                .build();
        gsc = GoogleSignIn.getClient(this, gso);

        GoogleSignInAccount acct = GoogleSignIn.getLastSignedInAccount(this);
        if (acct != null) {
            navigateToSecondActivity(acct);
        }
        google_login.setOnClickListener(this::handleGoogleLogin);
    }

    private void handleGoogleLogin(View view) {
        Intent signInIntent = gsc.getSignInIntent();
        startActivityForResult(signInIntent, 1000);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 1000) {
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            try {
                GoogleSignInAccount acc = task.getResult(ApiException.class);
                navigateToSecondActivity(acc);
            } catch (ApiException e) {
                Log.d("dattt.debug3", e.toString());
                Toast.makeText(getApplicationContext(), "Something went wrong", Toast.LENGTH_SHORT).show();
            }
        }
    }

    void navigateToSecondActivity(GoogleSignInAccount acct) {
        Gson gson = new Gson();
        String json = gson.toJson(acct);
        JsonObject jsonObject = gson.fromJson(json, JsonObject.class);
        mProgressDialog = new ProgressDialog(LoginActivity.this);
        mProgressDialog.setMessage("Loading..."); // Set a message for the progress dialog
        mProgressDialog.setCancelable(false); // Make it non-cancelable
        mProgressDialog.show();

        APIService.apiService.callAPI(jsonObject, acct.getIdToken())
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Observer<JsonObject>() {

                               @Override
                               public void onSubscribe(@NonNull Disposable d) {
                                   mDisposable = d;
                                   Log.d("dattt", "onSubc");
                               }

                               @Override
                               public void onNext(@NonNull JsonObject s) {
                                   int responseCode = s.get("response").getAsInt();
                                   if (responseCode >= 200 && responseCode <= 300) {
                                       finish();
                                       Intent intent = new Intent(LoginActivity.this, SecondActivity.class);
                                       intent.putExtra("jsonString", s.get("data").toString());
                                       startActivity(intent);
                                   } else {
                                       onError(new Exception("Response not in the 200-300 range"));
                                   }
                               }

                               @Override
                               public void onError(@NonNull Throwable e) {
                                   mProgressDialog.dismiss();
                                   Toast.makeText(LoginActivity.this, "Server isn't responding", Toast.LENGTH_SHORT).show();
                                   Log.d("dattt.error", e.toString());
                               }

                               @Override
                               public void onComplete() {
                                   mProgressDialog.dismiss();
                                   Log.d("dattt", "3231231");
                               }
                           }

                );

    }



    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (mDisposable != null) {
            mDisposable.dispose();
        }
    }

}
