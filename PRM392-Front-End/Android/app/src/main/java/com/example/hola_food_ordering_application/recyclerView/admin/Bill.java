package com.example.hola_food_ordering_application.recyclerView.admin;

public class Bill {
    private int resourceImage;
    private String name;
    private int quantity;
    private int price;
    private float weight;

    public Bill(String name, int quantity, int price, float weight, int resourceImage) {
        this.resourceImage = resourceImage;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.weight = weight;
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

    public float getWeight() {
        return weight;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }
}
