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

public class Thumbnail_Image_Adapter extends RecyclerView.Adapter<Thumbnail_Image_Adapter.ThumbnailViewHolder> {
    private Context mContext;
    private List<Thumbnail_Image> tListDetail;

    public Thumbnail_Image_Adapter(Context mContext) {
        this.mContext = mContext;
    }

    public void setData(List<Thumbnail_Image> list) {
        this.tListDetail = list;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ThumbnailViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_thumbnail, parent, false);
        return new ThumbnailViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ThumbnailViewHolder holder, int position) {
        Thumbnail_Image timage = tListDetail.get(position);
        if(timage == null) {
            return;
        }
        holder.imgThumbnail.setImageResource(timage.getResourceImage());
        holder.tvDescription.setText(timage.getDescription());
        holder.tvTitle.setText(timage.getTitle());
        holder.tvPrice.setText(String.valueOf(timage.getPrice()));
    }


    @Override
    public int getItemCount() {
        if(tListDetail != null) {
            return tListDetail.size();
        }
        return 0;
    }

    public class ThumbnailViewHolder extends RecyclerView.ViewHolder {
        private ImageView imgThumbnail;
        private TextView tvDescription, tvPrice, tvTitle;

        public ThumbnailViewHolder(@NonNull View itemView) {
            super(itemView);
            imgThumbnail = itemView.findViewById(R.id.imgThumbnail);
            tvDescription = itemView.findViewById(R.id.tvDescription);
            tvPrice = itemView.findViewById(R.id.tvPrice);
            tvTitle = itemView.findViewById(R.id.tvTitle);
        }
    }
}
