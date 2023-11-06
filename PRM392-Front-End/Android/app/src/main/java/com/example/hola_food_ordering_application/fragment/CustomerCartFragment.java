package com.example.hola_food_ordering_application.fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hola_food_ordering_application.R;
import com.example.hola_food_ordering_application.recyclerView.homepage.Shop;
import com.example.hola_food_ordering_application.recyclerView.homepage.ShopAdapter;

import java.util.ArrayList;
import java.util.List;

public class CustomerCartFragment extends Fragment {
    private RecyclerView rcv;
    private ShopAdapter mShopAdapter;
    private Menu menu;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_customer_cart, container, false);
        rcv = view.findViewById(R.id.rcv_cart_detail);

        mShopAdapter = new ShopAdapter(requireContext());
        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(requireContext());
        rcv.setLayoutManager(linearLayoutManager);

        mShopAdapter.setData(getListShop());
        rcv.setAdapter(mShopAdapter);
        return view;
    }
    private List<Shop> getListShop(){
        List<Shop> list = new ArrayList<>();
        list.add(new Shop(R.drawable.bunrieu1, "Pharmacy", 100, 100000));
        list.add(new Shop(R.drawable.bunrieu1, "Registry", 100, 100000));
        list.add(new Shop(R.drawable.bunrieu1, "Cartwheel", 100, 100000));
        list.add(new Shop(R.drawable.bunrieu1, "Clothing", 100, 100000));
        list.add(new Shop(R.drawable.bunrieu1, "Shoes", 100, 100000));
        list.add(new Shop(R.drawable.bunrieu1, "Accessories", 100, 100000));
        list.add(new Shop(R.drawable.bunrieu1, "Baby", 100, 100000));
        list.add(new Shop(R.drawable.bunrieu1, "Home", 100, 100000));
        list.add(new Shop(R.drawable.bunrieu1, "Patio & Garden", 100, 100000));
        return list;
    }
}
