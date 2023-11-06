package com.example.hola_food_ordering_application.recyclerView.homepage;

public class User {
    private int resourceImage;
    private String name;
    private String phone;
    private String address;
    private String email;

    public User(int resourceImage, String name, String phone, String address, String email) {
        this.resourceImage = resourceImage;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.email = email;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
