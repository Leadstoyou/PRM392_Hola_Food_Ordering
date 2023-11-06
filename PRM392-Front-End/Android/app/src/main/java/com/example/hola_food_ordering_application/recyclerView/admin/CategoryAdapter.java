package com.example.hola_food_ordering_application.recyclerView.admin;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.example.hola_food_ordering_application.R;

import java.util.List;

public class CategoryAdapter extends ArrayAdapter<Category> {
    public CategoryAdapter(@NonNull Context context, int resource, @NonNull List<Category> objects) {
        super(context, resource, objects);
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        convertView = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_admin_order_list_selected, parent, false);
        TextView tvSelected = convertView.findViewById(R.id.admin_order_list_detail_tvSelected);
        Category category = this.getItem(position);
        if(category!=null){
            tvSelected.setText(category.getName());
        }
        return convertView;
    }

    @Override
    public View getDropDownView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        convertView = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_admin_order_list_category, parent, false);
        TextView tvCategory = convertView.findViewById(R.id.admin_order_list_category_tv);
        Category category = this.getItem(position);
        if(category!=null){
            tvCategory.setText(category.getName());
        }
        return convertView;
    }
}
