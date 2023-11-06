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
import com.example.hola_food_ordering_application.recyclerView.homepage.Detail;
import com.example.hola_food_ordering_application.recyclerView.homepage.DetailAdapter;
import com.example.hola_food_ordering_application.recyclerView.homepage.Thumbnail_Image;
import com.example.hola_food_ordering_application.recyclerView.homepage.Thumbnail_Image_Adapter;

import java.util.ArrayList;
import java.util.List;

public class CustomerFoodDetailFragment  extends Fragment {
    private RecyclerView rcv;
    private RecyclerView rcv2;
    private Thumbnail_Image_Adapter thumbnailImageAdapter;
    private DetailAdapter mDetailAdapter;
    private Menu menu;

    public CustomerFoodDetailFragment() {
        // Required empty public constructor
    }
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_customer_food_detail,container,false);
        rcv = view.findViewById(R.id.rcv_food_detail_logo);
        rcv2 = view.findViewById(R.id.rcv_food_detail_pics);

        mDetailAdapter = new DetailAdapter(requireContext());
        thumbnailImageAdapter = new Thumbnail_Image_Adapter(requireContext());

        GridLayoutManager gridLayoutManager = new GridLayoutManager(requireContext(), 2);
        rcv.setLayoutManager(gridLayoutManager);

        GridLayoutManager gridLayoutManager1 = new GridLayoutManager(requireContext(), 1);
        rcv2.setLayoutManager(gridLayoutManager1);

        mDetailAdapter.setData(getListDetail());
        rcv.setAdapter(mDetailAdapter);

        thumbnailImageAdapter.setData(getListDetail2());
        rcv2.setAdapter(thumbnailImageAdapter);
        return view;
    }
    private List<Thumbnail_Image> getListDetail2() {
        List<Thumbnail_Image> list = new ArrayList<>();
        list.add(new Thumbnail_Image(R.drawable.bunrieu1, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. " +
                "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.",
                "Bún Riêu",300000));
        return list;
    }

    private List<Detail> getListDetail(){
        List<Detail> list = new ArrayList<>();
        list.add(new Detail(R.drawable.bunrieu2));
        list.add(new Detail(R.drawable.bunrieu3));
        list.add(new Detail(R.drawable.bunrieu4));
        list.add(new Detail(R.drawable.bunrieu5));
        return list;
    }
}
