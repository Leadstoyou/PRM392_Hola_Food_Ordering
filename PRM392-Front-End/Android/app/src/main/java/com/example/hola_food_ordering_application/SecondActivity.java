package com.example.hola_food_ordering_application;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.bumptech.glide.Glide;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class SecondActivity extends AppCompatActivity {
    GoogleSignInOptions gso;
    GoogleSignInClient gsc;
    TextView name, email;
    Button signOutBtn;
    ImageView imgView;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);

        name = findViewById(R.id.name);
        email = findViewById(R.id.email);
        signOutBtn = findViewById(R.id.signout);
        imgView = findViewById(R.id.imageView);
        String jsonString = getIntent().getStringExtra("jsonString");

        JsonObject jsonObject = new JsonParser().parse(jsonString).getAsJsonObject();
        Log.d("activity_second-1",jsonObject.toString());

        name.setText(jsonObject.get("userName").getAsString());
        email.setText(jsonObject.get("userEmail").getAsString());
        Glide.with(this).load(jsonObject.get("userAvatarUrl").getAsString()).into(imgView);

        gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN).requestEmail().build();
        gsc = GoogleSignIn.getClient(this, gso);
        signOutBtn.setOnClickListener(this::signOut);
    }

    private void signOut(View view) {
        gsc.signOut().addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(Task<Void> task) {
                finish();
                startActivity(new Intent(SecondActivity.this, LoginActivity.class));
            }
        });
    }
}
