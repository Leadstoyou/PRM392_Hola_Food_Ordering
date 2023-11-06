package com.example.hola_food_ordering_application.recyclerView.homepage;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.hola_food_ordering_application.R;

import java.util.List;

public class SliderAdapter extends RecyclerView.Adapter<SliderAdapter.SliderViewHolder> {
    private Context mContext;
    private List<Slider> mSlider;

    public SliderAdapter(Context context, List<Slider> sliders) {
        this.mContext = context;
        this.mSlider = sliders;
    }

    @NonNull
    @Override
    public SliderViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_homepage_slider, parent, false);
        return new SliderViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull SliderViewHolder holder, int position) {
        Slider slider = mSlider.get(position);

        if (slider != null) {
            Glide.with(mContext).load(slider.getImgUrl()).into(holder.imgPhoto);
            holder.productName.setText(slider.getProductName());
            holder.productPrice.setText(slider.getProductPrice());
        }
    }

    @Override
    public int getItemCount() {
        if (mSlider != null) {
            return mSlider.size();
        }
        return 0;
    }

    public class SliderViewHolder extends RecyclerView.ViewHolder {
        private ImageView imgPhoto;
        private TextView productName, productPrice;

        public SliderViewHolder(@NonNull View itemView) {
            super(itemView);
            imgPhoto = itemView.findViewById(R.id.item_homepage_slider_photo);
            productName = itemView.findViewById(R.id.item_homepage_slider_product_name);
            productPrice = itemView.findViewById(R.id.item_homepage_slider_product_price);
        }
    }
}
