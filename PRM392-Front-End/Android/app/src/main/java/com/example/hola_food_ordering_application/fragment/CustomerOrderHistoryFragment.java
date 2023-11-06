package com.example.hola_food_ordering_application.fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hola_food_ordering_application.R;
import com.example.hola_food_ordering_application.recyclerView.homepage.History;
import com.example.hola_food_ordering_application.recyclerView.homepage.HistoryAdapter;

import java.util.ArrayList;
import java.util.List;

public class CustomerOrderHistoryFragment extends Fragment {
    private RecyclerView rcv_order_history;
    private HistoryAdapter historyAdapter;
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_customer_order_history, container, false);
        rcv_order_history = view.findViewById(R.id.rcv_order_history);
        historyAdapter = new HistoryAdapter(requireContext());
        rcv_order_history.setAdapter(historyAdapter);

        GridLayoutManager gridLayoutManager1 = new GridLayoutManager(requireContext(), 1);
        rcv_order_history.setLayoutManager(gridLayoutManager1);

        historyAdapter.setData(getListDetail2());
        return view;

    }
    private List<History> getListDetail2() {
        List<History> list = new ArrayList<>();
        list.add(new History("Lê Trung Dũng", "0842824902", "Hà Đông", "ABCD1234", "Nice", "29/03/2002", 200000, "Card" ));
        list.add(new History("Lê Trung Dũng", "0842824902", "Hà Đông", "ABCD1233", "Nice", "29/03/2002", 200000, "Card" ));
        return list;
    }}
