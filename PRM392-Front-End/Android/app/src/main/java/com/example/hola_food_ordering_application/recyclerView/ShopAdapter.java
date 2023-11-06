package com.example.hola_food_ordering_application.recyclerView;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hola_food_ordering_application.R;

import java.util.List;

public class ShopAdapter extends RecyclerView.Adapter<ShopAdapter.ShopViewHolder>{
    private Context mContext;
    private List<Shop> mListShop;

    public ShopAdapter(Context mContext) {
        this.mContext = mContext;
    }

    public void setData(List<Shop> list) {
        this.mListShop = list;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ShopViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_cart, parent, false);
        return new ShopViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ShopViewHolder holder, int position) {
    Shop shop = mListShop.get(position);
    if(shop == null) {
        return;
    }
    holder.imgShop.setImageResource(shop.getResourceImage());
    holder.tvName.setText(shop.getName());
    holder.tvPrice.setText(String.valueOf(shop.getPrice()));
    holder.tvQuantity.setText(String.valueOf(shop.getQuantity()));
    }

    @Override
    public int getItemCount() {
        if(mListShop != null) {
            return mListShop.size();
        }
        return 0;
    }

    public class ShopViewHolder extends RecyclerView.ViewHolder {
        private ImageView imgShop;
        private TextView tvName, tvPrice, tvQuantity;
        public ShopViewHolder(@NonNull View itemView) {
            super(itemView);
            imgShop = itemView.findViewById(R.id.imgShop);
            tvName = itemView.findViewById(R.id.tvName);
            tvPrice = itemView.findViewById(R.id.tvPrice);
            tvQuantity = itemView.findViewById(R.id.tvQuantity);
        }
    }
}
