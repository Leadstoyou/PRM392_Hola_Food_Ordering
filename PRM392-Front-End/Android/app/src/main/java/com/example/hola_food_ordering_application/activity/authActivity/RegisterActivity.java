package com.example.hola_food_ordering_application.activity.authActivity;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.example.hola_food_ordering_application.apiService.APIAuthService;
import com.example.hola_food_ordering_application.R;
import com.example.hola_food_ordering_application.activity.customerActivity.CustomerMainActivity;
import com.google.gson.JsonObject;

import io.reactivex.rxjava3.android.schedulers.AndroidSchedulers;
import io.reactivex.rxjava3.annotations.NonNull;
import io.reactivex.rxjava3.core.Observer;
import io.reactivex.rxjava3.disposables.Disposable;
import io.reactivex.rxjava3.schedulers.Schedulers;

public class RegisterActivity extends AppCompatActivity {
    private EditText username, email, password, address, phoneNumber;
    private Button registerSubmit, login_btn;
    private ProgressDialog mProgressDialog;
    private Disposable mDisposable;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        bindingView();
        bindingAction();
    }

    private void bindingView() {
        username = findViewById(R.id.register_userName);
        email = findViewById(R.id.register_email);
        password = findViewById(R.id.register_password);
        address = findViewById(R.id.register_address);
        phoneNumber = findViewById(R.id.register_phone_number);
        registerSubmit = findViewById(R.id.register_submit_btn);
        login_btn = findViewById(R.id.register_login_btn);
        mProgressDialog = new ProgressDialog(RegisterActivity.this);
    }

    private void bindingAction() {
        mProgressDialog.setMessage("Loading...");
        mProgressDialog.setCancelable(false);
        registerSubmit.setOnClickListener(this::handleSubmitFormRegister);
        login_btn.setOnClickListener(this::handleChangeLoginActivity);
    }

    private void handleChangeLoginActivity(View view) {
        Intent handleChangeLoginActivity = new Intent(RegisterActivity.this, LoginActivity.class);
        startActivity(handleChangeLoginActivity);
    }

    private void handleSubmitFormRegister(View view) {
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("email", email.getText().toString());
        jsonObject.addProperty("username", username.getText().toString());
        jsonObject.addProperty("password", password.getText().toString());
        jsonObject.addProperty("address", address.getText().toString());
        jsonObject.addProperty("phoneNumber", phoneNumber.getText().toString());
        mProgressDialog.show();
        APIAuthService.apiService.callAPIRegisterLocal(jsonObject)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Observer<JsonObject>() {
                    @Override
                    public void onSubscribe(@NonNull Disposable d) {
                        mDisposable = d;
                    }

                    @Override
                    public void onNext(@NonNull JsonObject s) {
                        int responseCode = s.get("response").getAsInt();
                        if (responseCode >= 200 && responseCode <= 300) {
                            finish();
                            Intent intent = new Intent(RegisterActivity.this, CustomerMainActivity.class);
                            intent.putExtra("jsonString", s.get("data").toString());
                            startActivity(intent);
                        } else {
                            onError(new Exception("Response not in the 200-300 range"));
                        }
                    }

                    @Override
                    public void onError(@NonNull Throwable e) {
                        mProgressDialog.dismiss();
                        Toast.makeText(RegisterActivity.this, e.getMessage(), Toast.LENGTH_SHORT).show();
                        Log.e("dattt.error", e.getMessage());
                    }

                    @Override
                    public void onComplete() {
                        mProgressDialog.dismiss();
                        Log.e("dattt", "3231231");
                    }
                });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (mDisposable != null) {
            mDisposable.dispose();
        }
    }

}
