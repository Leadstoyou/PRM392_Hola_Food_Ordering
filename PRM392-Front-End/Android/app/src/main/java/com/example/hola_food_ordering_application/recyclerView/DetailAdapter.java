package com.example.hola_food_ordering_application.recyclerView;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hola_food_ordering_application.R;

import java.util.List;

public class DetailAdapter extends RecyclerView.Adapter<DetailAdapter.DetailViewHolder>{
    private Context mContext;
    private List<Detail> mListDetail;

    public DetailAdapter(Context mContext) {
        this.mContext = mContext;
    }

    public void setData(List<Detail> list) {
        this.mListDetail = list;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public DetailViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_shop, parent, false);
        return new DetailViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull DetailViewHolder holder, int position) {
    Detail detail = mListDetail.get(position);
    if(detail == null) {
        return;
    }
    holder.imgShop.setImageResource(detail.getResourceImage());
    }

    @Override
    public int getItemCount() {
        if(mListDetail != null) {
            return mListDetail.size();
        }
        return 0;
    }

    public class DetailViewHolder extends RecyclerView.ViewHolder {
        private ImageView imgShop;
        public DetailViewHolder(@NonNull View itemView) {
            super(itemView);
            imgShop = itemView.findViewById(R.id.imgShop);
        }
    }
}
