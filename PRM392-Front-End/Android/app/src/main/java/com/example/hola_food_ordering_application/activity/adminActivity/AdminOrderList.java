package com.example.hola_food_ordering_application.activity.adminActivity;

import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Spinner;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hola_food_ordering_application.R;
import com.example.hola_food_ordering_application.recyclerView.admin.AdminManage;
import com.example.hola_food_ordering_application.recyclerView.admin.AdminManageAdapter;
import com.example.hola_food_ordering_application.recyclerView.admin.Category;
import com.example.hola_food_ordering_application.recyclerView.admin.CategoryAdapter;

import java.util.ArrayList;
import java.util.List;

public class AdminOrderList extends AppCompatActivity {
    private RecyclerView rcv;
    private AdminManageAdapter mAdminManageAdapter;
    private Menu menu;
    private Spinner spnCategory;
    private CategoryAdapter categoryAdapter;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_admin_order_list);
        rcv = findViewById(R.id.admin_order_list_rcv);
        spnCategory = findViewById(R.id.admin_order_list_spnCategory);

        categoryAdapter = new CategoryAdapter(this, R.layout.item_admin_order_list_selected, getListCategory());
        spnCategory.setAdapter(categoryAdapter);
        spnCategory.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
//                Toast.makeText(MainActivity.this, categoryAdapter.getItem(i).getName(), Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });

        mAdminManageAdapter = new AdminManageAdapter(this);
        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(this);
        rcv.setLayoutManager(linearLayoutManager);

        mAdminManageAdapter.setData(getListInfo());
        rcv.setAdapter(mAdminManageAdapter);
    }

    private List<Category> getListCategory() {
        List<Category> list = new ArrayList<>();
        list.add(new Category("Ngon iả"));
        list.add(new Category("Ăn không dám ỉa"));
        list.add(new Category("Vãi bìu ngon"));
        list.add(new Category("Tự nấu tự ăn mẹ đi"));

        return  list;
    }

    private List<AdminManage> getListInfo(){
        List<AdminManage> list = new ArrayList<>();
        list.add(new AdminManage( "30/03/2002", "Bum", "01111", "Ha Dong", 25000));
        list.add(new AdminManage( "31/03/2002", "Bum1", "01112", "Ha Dong1", 25000));
        list.add(new AdminManage( "32/03/2002", "Bum2", "01113", "Ha Dong2", 25000));
        list.add(new AdminManage( "33/03/2002", "Bum3", "01114", "Ha Dong3", 25000));
        list.add(new AdminManage( "34/03/2002", "Bum4", "01115", "Ha Dong4", 25000));
        list.add(new AdminManage( "35/03/2002", "Bum5", "01116", "Ha Dong5", 25000));
        return list;
    }
}
