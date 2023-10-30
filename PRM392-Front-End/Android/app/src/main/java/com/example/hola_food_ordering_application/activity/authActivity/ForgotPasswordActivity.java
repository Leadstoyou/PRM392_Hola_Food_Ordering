package com.example.hola_food_ordering_application.activity.authActivity;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.example.hola_food_ordering_application.R;
import com.google.gson.JsonObject;

import io.reactivex.rxjava3.disposables.Disposable;

public class ForgotPasswordActivity extends AppCompatActivity {
    private EditText forgotPasswordEmail;
    private Button forgotPasswordSubmit,loginBtn,registerBtn;
    private ProgressDialog mProgressDialog;
    private Disposable mDisposable;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_forgot_password);
        bindingView();
        bindingAction();
    }
    private void bindingView() {
        forgotPasswordEmail = findViewById(R.id.forgot_password_email);
        forgotPasswordSubmit = findViewById(R.id.forgot_password_submit_btn);
        loginBtn = findViewById(R.id.forgot_password_login_btn);
        registerBtn = findViewById(R.id.forgot_password_register_btn);
        mProgressDialog = new ProgressDialog(ForgotPasswordActivity.this);
    }
    private void bindingAction() {
        mProgressDialog.setMessage("Loading...");
        mProgressDialog.setCancelable(false);

        loginBtn.setOnClickListener(this::handleChangeLoginActivity);
        registerBtn.setOnClickListener(this::handleChangeRegisterActibvity);
        registerBtn.setOnClickListener(this::handleSubmitForm);
    }

    private void handleSubmitForm(View view) {
        String email = loginBtn.getText().toString();
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("email", email);
        mProgressDialog.show();
            //TO DO : Create Method Forgotpassword In Back-End to call
    }

    private void handleChangeRegisterActibvity(View view) {
        Intent handleChangeRegisterActibvity = new Intent(ForgotPasswordActivity.this, RegisterActivity.class);
        startActivity(handleChangeRegisterActibvity);
    }

    private void handleChangeLoginActivity(View view) {
        Intent handleChangeLoginActivity = new Intent(ForgotPasswordActivity.this, LoginActivity.class);
        startActivity(handleChangeLoginActivity);
    }
}
