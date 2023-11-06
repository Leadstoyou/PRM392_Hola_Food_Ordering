package com.example.hola_food_ordering_application.fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hola_food_ordering_application.R;
import com.example.hola_food_ordering_application.recyclerView.homepage.User;
import com.example.hola_food_ordering_application.recyclerView.homepage.UserAdapter;

import java.util.ArrayList;
import java.util.List;

public class CustomerUserProfileFragment extends Fragment {
    private RecyclerView rcv;
    private UserAdapter userAdapter;
    private Menu menu;
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_customer_user_profile,container,false);

        rcv = view.findViewById(R.id.rcv_user_profile);
        userAdapter = new UserAdapter(requireContext());

        GridLayoutManager gridLayoutManager1 = new GridLayoutManager(requireContext(), 1);
        rcv.setLayoutManager(gridLayoutManager1);

        userAdapter.setData(getListDetail2());
        rcv.setAdapter(userAdapter);
        return view;
    }

    private List<User> getListDetail2() {
        List<User> list = new ArrayList<>();
        list.add(new User(R.drawable.avt, "Lê Trung Dũng", "0842824902", "Hà Đông", "ekkophantoms@gmail.com"));
        return list;
    }

}
