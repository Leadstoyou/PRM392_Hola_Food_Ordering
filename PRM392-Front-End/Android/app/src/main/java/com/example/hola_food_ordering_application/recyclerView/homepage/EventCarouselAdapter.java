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

public class EventCarouselAdapter extends RecyclerView.Adapter<EventCarouselAdapter.EventCarouselViewHolder> {
    private Context mContext;
    private List<EventCarousel> mCarousels;

    public EventCarouselAdapter(Context mContext, List<EventCarousel> mCarousels) {
        this.mContext = mContext;
        this.mCarousels = mCarousels;
    }

    @NonNull
    @Override
    public EventCarouselViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_homepage_event_carousel, parent, false);
        return new EventCarouselAdapter.EventCarouselViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull EventCarouselViewHolder holder, int position) {
        EventCarousel eventCarousel = mCarousels.get(position);

        if(eventCarousel != null){
            Glide.with(mContext).load(eventCarousel.getResourceId()).into(holder.resouceId);
            holder.title.setText(eventCarousel.getName());
        }
    }

    @Override
    public int getItemCount() {
        if(mCarousels != null){
            return mCarousels.size();
        }
        return 0;
    }

    public class EventCarouselViewHolder extends RecyclerView.ViewHolder{
        private TextView title;
        private ImageView resouceId;
        public EventCarouselViewHolder(@NonNull View itemView) {
            super(itemView);
            title = itemView.findViewById(R.id.item_homepage_event_carousel_tittle);
            resouceId = itemView.findViewById(R.id.item_homepage_event_carousel_image);
        }
    }
}
