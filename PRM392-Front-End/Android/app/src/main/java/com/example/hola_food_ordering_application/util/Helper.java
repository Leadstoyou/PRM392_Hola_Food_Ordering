package com.example.hola_food_ordering_application.util;

import android.content.Context;
import android.content.SharedPreferences;

public class Helper {
    public static String getAccessToken(Context context) {
        SharedPreferences sharedPreferences = context.getSharedPreferences("accessToken", Context.MODE_PRIVATE);
        return sharedPreferences.getString("accessToken", "DefaultAccessToken");
    }

}
