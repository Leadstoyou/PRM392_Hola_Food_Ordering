package com.example.hola_food_ordering_application.recyclerView.homepage;

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

public class HistoryAdapter extends RecyclerView.Adapter<HistoryAdapter.HistoryViewHolder> {
    private Context mContext;
    private List<History> hListDetail;

    public HistoryAdapter(Context mContext) {
        this.mContext = mContext;
    }

    public void setData(List<History> list) {
        this.hListDetail = list;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public HistoryViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_history, parent, false);
        return new HistoryViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull HistoryViewHolder holder, int position) {
        History history = hListDetail.get(position);
        if(history == null) {
            return;
        }

        holder.tvName.setText(history.getName());
        holder.tvPhone.setText(history.getPhone());
        holder.tvLocation.setText(history.getAddress());
        holder.tvCode.setText(history.getCode());
        holder.tvDate.setText(history.getDate());
        holder.tvList.setText(history.getListFood());
        holder.tvTotalBill.setText(String.valueOf(history.getTotalBill()));
        holder.tvPayment.setText(history.getPayment());
    }


    @Override
    public int getItemCount() {
        if(hListDetail != null) {
            return hListDetail.size();
        }
        return 0;
    }

    public class HistoryViewHolder extends RecyclerView.ViewHolder {
        private ImageView imgThumbnail;
        private TextView tvName, tvPhone, tvLocation, tvCode, tvList, tvDate, tvTotalBill, tvPayment;

        public HistoryViewHolder(@NonNull View itemView) {
            super(itemView);
            tvName = itemView.findViewById(R.id.tvName);
            tvPhone = itemView.findViewById(R.id.tvPhone);
            tvLocation = itemView.findViewById(R.id.tvLocation);
            tvCode = itemView.findViewById(R.id.tvCode);
            tvList = itemView.findViewById(R.id.tvListFood);
            tvDate = itemView.findViewById(R.id.tvDate);
            tvTotalBill = itemView.findViewById(R.id.tvTotalBill);
            tvPayment = itemView.findViewById(R.id.tvPayment);
        }
    }
}
