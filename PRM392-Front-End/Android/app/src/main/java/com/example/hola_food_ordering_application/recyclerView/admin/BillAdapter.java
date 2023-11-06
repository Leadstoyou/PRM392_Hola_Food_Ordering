package com.example.hola_food_ordering_application.recyclerView.admin;

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

public class BillAdapter extends RecyclerView.Adapter<BillAdapter.BillViewHolder>{
    private Context mContext;
    private List<Bill> mListBill;

    public BillAdapter(Context mContext) {
        this.mContext = mContext;
    }

    public void setData(List<Bill> list) {
        this.mListBill = list;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public BillViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_admin_order_detail, parent, false);
        return new BillViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull BillViewHolder holder, int position) {
    Bill bill = mListBill.get(position);
    if(bill == null) {
        return;
    }
    holder.imgFood.setImageResource(bill.getResourceImage());
    holder.tvName.setText(bill.getName());
    holder.tvPrice.setText(String.valueOf(bill.getPrice()));
    holder.tvQuantity.setText(String.valueOf(bill.getQuantity()));
    }

    @Override
    public int getItemCount() {
        if(mListBill != null) {
            return mListBill.size();
        }
        return 0;
    }

    public class BillViewHolder extends RecyclerView.ViewHolder {
        private ImageView imgFood;
        private TextView tvName, tvPrice, tvQuantity;
        public BillViewHolder(@NonNull View itemView) {
            super(itemView);
            imgFood = itemView.findViewById(R.id.admin_order_detail_img_food);
            tvName = itemView.findViewById(R.id.admin_order_detail_food_name);
            tvPrice = itemView.findViewById(R.id.admin_order_detail_img_price);
            tvQuantity = itemView.findViewById(R.id.admin_order_detail_img_quantity);
        }
    }
}
