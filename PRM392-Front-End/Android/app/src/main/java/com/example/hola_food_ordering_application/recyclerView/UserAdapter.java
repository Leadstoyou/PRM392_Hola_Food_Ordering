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

public class UserAdapter extends RecyclerView.Adapter<UserAdapter.UserViewHolder> {
    private Context mContext;
    private List<User> uListDetail;

    public UserAdapter(Context mContext) {
        this.mContext = mContext;
    }

    public void setData(List<User> list) {
        this.uListDetail = list;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public UserViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_user, parent, false);
        return new UserViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull UserViewHolder holder, int position) {
        User timage = uListDetail.get(position);
        if(timage == null) {
            return;
        }
        holder.imgThumbnail.setImageResource(timage.getResourceImage());
        holder.tvName.setText(timage.getName());
        holder.tvPhone.setText(timage.getPhone());
        holder.tvLocation.setText(timage.getAddress());
        holder.tvEmail.setText(timage.getEmail());
    }


    @Override
    public int getItemCount() {
        if(uListDetail != null) {
            return uListDetail.size();
        }
        return 0;
    }

    public class UserViewHolder extends RecyclerView.ViewHolder {
        private ImageView imgThumbnail;
        private TextView tvName, tvPhone, tvLocation, tvEmail;

        public UserViewHolder(@NonNull View itemView) {
            super(itemView);
            imgThumbnail = itemView.findViewById(R.id.imgThumbnail);
            tvName = itemView.findViewById(R.id.tvName);
            tvPhone = itemView.findViewById(R.id.tvPhone);
            tvLocation = itemView.findViewById(R.id.tvLocation);
            tvEmail = itemView.findViewById(R.id.tvEmail);
        }
    }
}
