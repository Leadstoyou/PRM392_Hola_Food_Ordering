package com.example.hola_food_ordering_application.util;

import android.graphics.Rect;
import android.view.View;

import androidx.recyclerview.widget.RecyclerView;

public class ItemOffsetDecoration extends RecyclerView.ItemDecoration {
    private int offset;

    public ItemOffsetDecoration(int offset) {
        this.offset = offset;
    }

    @Override
    public void getItemOffsets(Rect outRect, View view, RecyclerView parent, RecyclerView.State state) {
        outRect.left = offset;
        outRect.right = offset;
        // Có thể điều chỉnh outRect.top và outRect.bottom nếu bạn muốn thêm margin ở trên và dưới.
    }
}
