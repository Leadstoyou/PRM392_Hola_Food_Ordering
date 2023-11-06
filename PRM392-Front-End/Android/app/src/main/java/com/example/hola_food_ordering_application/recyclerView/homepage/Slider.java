package com.example.hola_food_ordering_application.recyclerView.homepage;

public class Slider {
    private String imgUrl;
    private String productName;
    private String productPrice;


    public Slider(String imgUrl, String productName, String productPrice) {
        this.imgUrl = imgUrl;
        this.productName = productName;
        this.productPrice = productPrice;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getProductName() {
        return productName;
    }

    @Override
    public String toString() {
        return "Slider{" +
                "imgUrl='" + imgUrl + '\'' +
                ", productName='" + productName + '\'' +
                ", productPrice='" + productPrice + '\'' +
                '}';
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(String productPrice) {
        this.productPrice = productPrice;
    }
}
