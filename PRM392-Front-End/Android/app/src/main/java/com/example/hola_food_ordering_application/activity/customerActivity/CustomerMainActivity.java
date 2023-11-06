package com.example.hola_food_ordering_application.activity.customerActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.text.Html;
import android.util.Log;
import android.view.MenuItem;
import android.view.inputmethod.InputMethodManager;
import android.widget.ImageView;
import android.widget.SearchView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

import com.bumptech.glide.Glide;
import com.example.hola_food_ordering_application.R;
import com.example.hola_food_ordering_application.activity.authActivity.LoginActivity;
import com.example.hola_food_ordering_application.activity.authActivity.RegisterActivity;
import com.example.hola_food_ordering_application.constants.Constants;
import com.example.hola_food_ordering_application.fragment.CustomerCartFragment;
import com.example.hola_food_ordering_application.fragment.CustomerCategoryFragment;
import com.example.hola_food_ordering_application.fragment.CustomerFoodDetailFragment;
import com.example.hola_food_ordering_application.fragment.CustomerHomepageFragment;
import com.example.hola_food_ordering_application.fragment.CustomerOrderHistoryFragment;
import com.example.hola_food_ordering_application.fragment.CustomerUserProfileFragment;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.material.navigation.NavigationView;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.util.Objects;

public class CustomerMainActivity extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener {
    private DrawerLayout drawerLayout;
    private NavigationView navigationView;
    private ActionBarDrawerToggle actionBarDrawerToggle;
    private Toolbar toolbar;
    private int mCurrentFragment = Constants.CUSTOMER_FRAGMENT_HOME;
    private int mCurrentNavId;
    private GoogleSignInOptions gso;
    private GoogleSignInClient gsc;
    private String jsonString;
    private JsonObject jsonObject;
    private ImageView userProfilePictrue;
    private TextView userName,userEmail;
    SearchView searchView;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);
        bindingView();
        bindingAction();
    }

    private void bindingView() {
        gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN).requestEmail().build();
        gsc = GoogleSignIn.getClient(this, gso);
        jsonString = getIntent().getStringExtra(Constants.DATA_PUT_EXTRA_NAME);

        jsonObject = new JsonParser().parse(jsonString).getAsJsonObject();
        toolbar = findViewById(R.id.main_toolbar);
        drawerLayout = findViewById(R.id.drawer_layout);
        drawerLayout.addDrawerListener(actionBarDrawerToggle);

        navigationView = findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

        userProfilePictrue = navigationView.getHeaderView(0).findViewById(R.id.nav_header_user_photo);
        userName = navigationView.getHeaderView(0).findViewById(R.id.nav_header_user_name);
        userEmail = navigationView.getHeaderView(0).findViewById(R.id.nav_header_user_email);

        mCurrentNavId = R.id.nav_homepage;
        searchView= new SearchView(this);
    }

    private void bindingAction() {
        searchView.setQueryHint(Constants.SEARCH_HINT);
        handleSearch();
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle(Constants.TOOLBAR_TITTLE);
        toolbar.addView(searchView);

        userName.setText(jsonObject.get("userName").getAsString());
        userEmail.setText(jsonObject.get("userEmail").getAsString());
        Glide.with(this).load(jsonObject.get("userAvatarUrl").getAsString()).into(userProfilePictrue);


        actionBarDrawerToggle = new ActionBarDrawerToggle(this, drawerLayout, toolbar, R.string.open, R.string.close);
        actionBarDrawerToggle.syncState();

        replaceFragments(new CustomerHomepageFragment());
        navigationView.getMenu().findItem(mCurrentNavId).setChecked(true);
    }

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        int id = item.getItemId();
        if (id == R.id.nav_homepage) {
            if (mCurrentFragment != Constants.CUSTOMER_FRAGMENT_HOME) {
                replaceFragments(new CustomerHomepageFragment());
                mCurrentFragment = Constants.CUSTOMER_FRAGMENT_HOME;
            }
        } else if (id == R.id.nav_category) {
            if (mCurrentFragment != Constants.CUSTOMER_FRAGMENT_CATEGORY) {
                replaceFragments(new CustomerCategoryFragment());
                mCurrentFragment = Constants.CUSTOMER_FRAGMENT_CATEGORY;
            }

        } else if (id == R.id.nav_cart) {
            if (mCurrentFragment != Constants.CUSTOMER_FRAGMENT_CARD) {
                replaceFragments(new CustomerCartFragment());
                mCurrentFragment = Constants.CUSTOMER_FRAGMENT_CARD;
            }

        } else if (id == R.id.nav_order_history) {
            if (mCurrentFragment != Constants.CUSTOMER_FRAGMENT_ORDER_HISTORY) {
                replaceFragments(new CustomerOrderHistoryFragment());
                mCurrentFragment = Constants.CUSTOMER_FRAGMENT_ORDER_HISTORY;
            }

        } else if (id == R.id.nav_user_profile) {
            if (mCurrentFragment != Constants.CUSTOMER_FRAGMENT_USER_PROFILE) {
                replaceFragments(new CustomerUserProfileFragment());
                mCurrentFragment = Constants.CUSTOMER_FRAGMENT_USER_PROFILE;
            }
        } else if (id == R.id.nav_logout) {
            finish();
            gsc.signOut().addOnCompleteListener(task -> {
                finish();
                startActivity(new Intent(CustomerMainActivity.this, LoginActivity.class));
            });
        }
        navigationView.getMenu().findItem(mCurrentNavId).setChecked(false);
        navigationView.getMenu().findItem(id).setChecked(true);
        mCurrentNavId = id;
        drawerLayout.closeDrawer(GravityCompat.START);
        return false;
    }

    public void handleSearch(){
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                Log.e("searchTextSubmit",query.toString());
                replaceFragments(new CustomerFoodDetailFragment());
                navigationView.getMenu().findItem(mCurrentNavId).setChecked(false);
                mCurrentFragment = Constants.CUSTOMER_FRAGMENT_FOOD_DETAIL;

                searchView.setIconified(true);

                //Handle Close UI
                InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
                imm.hideSoftInputFromWindow(searchView.getWindowToken(), 0);
                searchView.clearFocus();
                return true;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                Log.e("searchTextChange",newText.toString());
                return true;
            }
        });
    }
    @Override
    public void onBackPressed() {
        if (drawerLayout.isDrawerOpen(GravityCompat.START)) {
            drawerLayout.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    private void replaceFragments(Fragment fragment) {
        FragmentTransaction transaction = getSupportFragmentManager().beginTransaction();
        transaction.replace(R.id.content_frame, fragment);
        transaction.commit();
    }
}
