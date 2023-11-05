package com.example.hola_food_ordering_application.recyclerView;

public class Thumbnail_Image {
    private int resourceImage;
    private String description;
    private String title;
    private int price;

    public Thumbnail_Image(int resourceImage, String description, String title, int price) {
        this.resourceImage = resourceImage;
        this.description = description;
        this.title = title;
        this.price = price;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getResourceImage() {
        return resourceImage;
    }

    public void setResourceImage(int resourceImage) {
        this.resourceImage = resourceImage;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
