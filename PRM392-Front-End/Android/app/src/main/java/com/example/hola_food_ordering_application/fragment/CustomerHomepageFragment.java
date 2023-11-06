package com.example.hola_food_ordering_application.fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager.widget.ViewPager;

import com.example.hola_food_ordering_application.R;
import com.example.hola_food_ordering_application.constants.Constants;
import com.example.hola_food_ordering_application.recyclerView.homepage.Category;
import com.example.hola_food_ordering_application.recyclerView.homepage.CategoryAdapter;
import com.example.hola_food_ordering_application.recyclerView.homepage.EventCarousel;
import com.example.hola_food_ordering_application.recyclerView.homepage.EventCarouselAdapter;
import com.example.hola_food_ordering_application.recyclerView.homepage.Slider;
import com.example.hola_food_ordering_application.recyclerView.homepage.SliderAdapter;
import com.example.hola_food_ordering_application.util.GridSpacingItemDecoration;

import java.util.ArrayList;
import java.util.List;

public class CustomerHomepageFragment extends Fragment {
    private RecyclerView homepageSlidersOtherFood, homepageCategories, homepageSlidersNewest,
            homepageEvents, homepageSlidersCake, homepageSliderPetFood, homepageSliderDrinking, hompepageSliderPopular;
    private SliderAdapter sliderAdapterOtherFood, sliderAdapterNewset, sliderAdapterCake, sliderAdapterPetFood,
            sliderAdapterDrinking, sliderAdapterPopular;
    private CategoryAdapter categoryAdapter;
    private EventCarouselAdapter eventCarouselAdapter;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_customer_homepage, container, false);

        homepageSlidersNewest = view.findViewById(R.id.homepage_recyclerview_slider_product_list_newest);
        hompepageSliderPopular = view.findViewById(R.id.homepage_recyclerview_slider_product_list_popular);
        homepageSliderDrinking = view.findViewById(R.id.homepage_recyclerview_slider_product_drinking_list_popular);
        homepageSliderPetFood = view.findViewById(R.id.homepage_recyclerview_slider_pet_food);
        homepageSlidersCake = view.findViewById(R.id.homepage_recyclerview_slider_cake);
        homepageSlidersOtherFood = view.findViewById(R.id.homepage_recyclerview_slider_other_food);
        homepageCategories = view.findViewById(R.id.homepage_recyclerview_category);
        homepageEvents = view.findViewById(R.id.homepage_recyclerview_event_carousel);

        //category
        categoryAdapter = new CategoryAdapter(requireContext(), getListCategory());
        GridLayoutManager CategoryLayoutManager = new GridLayoutManager(requireContext(), Constants.NUMBER_OF_COLUMN_HOMEPAGE_CATEGORY, LinearLayoutManager.VERTICAL, false);
        int spacingInPixels = getResources().getDimensionPixelSize(R.dimen.grid_spacing);
        GridSpacingItemDecoration itemDecoration = new GridSpacingItemDecoration(Constants.NUMBER_OF_COLUMN_HOMEPAGE_CATEGORY, spacingInPixels, true);
        homepageCategories.addItemDecoration(itemDecoration);
        homepageCategories.setLayoutManager(CategoryLayoutManager);
        homepageCategories.setAdapter(categoryAdapter);

        //slider product newest
        sliderAdapterNewset = new SliderAdapter(requireContext(), getListSliders());
        LinearLayoutManager layoutManagerSliderAdapterNewset = new LinearLayoutManager(requireContext(), LinearLayoutManager.HORIZONTAL, false);
        homepageSlidersNewest.setLayoutManager(layoutManagerSliderAdapterNewset);
        homepageSlidersNewest.setAdapter(sliderAdapterNewset);

        //slider product popular
        sliderAdapterPopular = new SliderAdapter(requireContext(), getListSliders());
        LinearLayoutManager layoutManagerSliderAdapterPopular = new LinearLayoutManager(requireContext(), LinearLayoutManager.HORIZONTAL, false);
        hompepageSliderPopular.setLayoutManager(layoutManagerSliderAdapterPopular);
        hompepageSliderPopular.setAdapter(sliderAdapterPopular);

        //carousel
        eventCarouselAdapter = new EventCarouselAdapter(requireContext(), getListEventCarousel());
        homepageEvents.setAdapter(eventCarouselAdapter);
        int positionToScroll = (int) Math.floor(eventCarouselAdapter.getItemCount() / 2.0);
        homepageEvents.scrollToPosition(positionToScroll);

        //slider product drinking
        sliderAdapterDrinking = new SliderAdapter(requireContext(), getListSliders());
        LinearLayoutManager layoutManagerSliderAdapterDrinking = new LinearLayoutManager(requireContext(), LinearLayoutManager.HORIZONTAL, false);
        homepageSliderDrinking.setLayoutManager(layoutManagerSliderAdapterDrinking);
        homepageSliderDrinking.setAdapter(sliderAdapterDrinking);

        //slider pet food
        sliderAdapterPetFood = new SliderAdapter(requireContext(), getListSliders());
        LinearLayoutManager layoutManager = new LinearLayoutManager(requireContext(), LinearLayoutManager.HORIZONTAL, false);
        homepageSliderPetFood.setLayoutManager(layoutManager);
        homepageSliderPetFood.setAdapter(sliderAdapterPetFood);

        //slider cake
        sliderAdapterCake = new SliderAdapter(requireContext(), getListSliders());
        LinearLayoutManager layoutManager2 = new LinearLayoutManager(requireContext(), LinearLayoutManager.HORIZONTAL, false);
        homepageSlidersCake.setLayoutManager(layoutManager2);
        homepageSlidersCake.setAdapter(sliderAdapterCake);

        //other food
        sliderAdapterOtherFood = new SliderAdapter(requireContext(), getListSliders());
        LinearLayoutManager layoutManager3 = new LinearLayoutManager(requireContext(), LinearLayoutManager.HORIZONTAL, false);
        homepageSlidersOtherFood.setLayoutManager(layoutManager3);
        homepageSlidersOtherFood.setAdapter(sliderAdapterOtherFood);

        return view;
    }

    private List<Slider> getListSliders() {
        List<Slider> list = new ArrayList<>();
        list.add(new Slider("https://th.bing.com/th/id/OIP.1CKds08V9zZtReNS2xnNhAHaE4?w=253&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7", "Ganyu", "12"));
        list.add(new Slider("https://th.bing.com/th/id/OIP.1CKds08V9zZtReNS2xnNhAHaE4?w=253&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7", "Ganyu", "132"));
        list.add(new Slider("https://th.bing.com/th/id/OIP.1CKds08V9zZtReNS2xnNhAHaE4?w=253&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7", "Ganyu", "276"));
        list.add(new Slider("https://th.bing.com/th/id/OIP.1CKds08V9zZtReNS2xnNhAHaE4?w=253&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7", "Ganyu", "276"));
        list.add(new Slider("https://th.bing.com/th/id/OIP.1CKds08V9zZtReNS2xnNhAHaE4?w=253&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7", "Ganyu", "276"));
        list.add(new Slider("https://th.bing.com/th/id/OIP.1CKds08V9zZtReNS2xnNhAHaE4?w=253&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7", "Ganyu", "276"));
        list.add(new Slider("https://th.bing.com/th/id/OIP.1CKds08V9zZtReNS2xnNhAHaE4?w=253&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7", "Ganyu", "276"));
        list.add(new Slider("https://th.bing.com/th/id/OIP.1CKds08V9zZtReNS2xnNhAHaE4?w=253&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7", "Ganyu", "276"));
        return list;
    }

    private List<Category> getListCategory() {
        List<Category> list = new ArrayList<>();
        list.add(new Category(R.drawable.homepage_category_rice, "Cơm"));
        list.add(new Category(R.drawable.homepage_category_nooddles, "Mỳ"));
        list.add(new Category(R.drawable.homepage_category_cake, "Bánh Ngọt"));
        list.add(new Category(R.drawable.homepage_category_drinking, "Đồ uống"));
        list.add(new Category(R.drawable.homepage_category_snack, "Đồ ăn vặt"));
        list.add(new Category(R.drawable.homepage_category_fast_food, "Fast Food"));
        list.add(new Category(R.drawable.homepage_category_tea_milk, "Trà sữa"));
        list.add(new Category(R.drawable.homepage_category_pet_food, "Pet food"));
        return list;
    }

    private List<EventCarousel> getListEventCarousel() {
        List<EventCarousel> list = new ArrayList<>();
        list.add(new EventCarousel(R.drawable.homepage_event_logo_1, "event 1"));
        list.add(new EventCarousel(R.drawable.homepage_event_logo_2, "event 2"));
        list.add(new EventCarousel(R.drawable.homepage_event_logo_3, "event 3"));
        list.add(new EventCarousel(R.drawable.homepage_event_logo_4, "event 4"));
        list.add(new EventCarousel(R.drawable.homepage_event_logo_5, "event 5"));

        return list;
    }
}
