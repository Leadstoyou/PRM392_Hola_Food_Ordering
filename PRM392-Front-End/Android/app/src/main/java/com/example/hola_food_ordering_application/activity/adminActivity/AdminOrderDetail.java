package com.example.hola_food_ordering_application.activity.adminActivity;

import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hola_food_ordering_application.R;
import com.example.hola_food_ordering_application.recyclerView.admin.Bill;
import com.example.hola_food_ordering_application.recyclerView.admin.BillAdapter;

import java.util.ArrayList;
import java.util.List;

public class AdminOrderDetail extends AppCompatActivity {
    private RecyclerView rcv;
    private BillAdapter mBillAdapter;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_admin_order_detail);
        rcv = findViewById(R.id.rcv_admin_order_detail);
        mBillAdapter = new BillAdapter(this);


        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(this);
        rcv.setLayoutManager(linearLayoutManager);

        mBillAdapter.setData(getListShop());
        rcv.setAdapter(mBillAdapter);
    }
    private List<Bill> getListShop(){
        List<Bill> list = new ArrayList<>();
        list.add(new Bill( "Bún", 20, 100, 3.2F, R.drawable.bunrieu1));
        list.add(new Bill( "Bún", 20, 100, 3.2F, R.drawable.bunrieu1));
        list.add(new Bill( "Bún", 20, 100, 3.2F, R.drawable.bunrieu1));
        list.add(new Bill( "Bún", 20, 100, 3.2F, R.drawable.bunrieu1));
        list.add(new Bill( "Bún", 20, 100, 3.2F, R.drawable.bunrieu1));
        list.add(new Bill( "Bún", 20, 100, 3.2F, R.drawable.bunrieu1));
        list.add(new Bill( "Bún", 20, 100, 3.2F, R.drawable.bunrieu1));
        return list;
    }
}
