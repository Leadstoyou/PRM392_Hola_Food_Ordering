package com.example.hola_food_ordering_application.recyclerView.admin;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class AdminManageAdapter extends RecyclerView.Adapter<AdminManageAdapter.AdminManageViewHolder>{
    private Context mContext;
    private List<AdminManage> mListAdminManage;

    public AdminManageAdapter(Context mContext) {
        this.mContext = mContext;
    }

    public void setData(List<AdminManage> list) {
        this.mListAdminManage = list;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public AdminManageViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_shop, parent, false);
        return new AdminManageViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull AdminManageViewHolder holder, int position) {
    AdminManage adminManage = mListAdminManage.get(position);
    if(adminManage == null) {
        return;
    }
        holder.tvDate.setText(adminManage.getDate());
        holder.tvName.setText(adminManage.getName());
        holder.tvPhone.setText(adminManage.getPhone());
        holder.tvAddress.setText(adminManage.getAddress());
        holder.tvTotalBill.setText(String.valueOf(adminManage.getTotalBill()));
    }

    @Override
    public int getItemCount() {
        if(mListAdminManage != null) {
            return mListAdminManage.size();
        }
        return 0;
    }

    public class AdminManageViewHolder extends RecyclerView.ViewHolder {
        private TextView tvName, tvPhone, tvAddress, tvTotalBill, tvDate;
        public AdminManageViewHolder(@NonNull View itemView) {
            super(itemView);
            tvDate = itemView.findViewById(R.id.tvDate);
            tvName = itemView.findViewById(R.id.tvName);
            tvPhone = itemView.findViewById(R.id.tvPhone);
            tvAddress = itemView.findViewById(R.id.tvAddress);
            tvTotalBill = itemView.findViewById(R.id.tvTotalBill);
        }
    }
}
