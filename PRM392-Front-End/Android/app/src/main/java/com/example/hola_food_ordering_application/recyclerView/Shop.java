package com.example.hola_food_ordering_application.recyclerView;

public class Shop {
    private int resourceImage;
    private String name;
    private int quantity;
    private int price;

    public Shop(int resourceImage, String name, int quantity, int price) {
        this.resourceImage = resourceImage;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }

    public int getResourceImage() {
        return resourceImage;
    }

    public void setResourceImage(int resourceImage) {
        this.resourceImage = resourceImage;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
