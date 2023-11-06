package com.example.hola_food_ordering_application.recyclerView.homepage;

public class Category {
    private int resourceId;
    private String categoryName;

    public Category(int resourceId, String categoryName) {
        this.resourceId = resourceId;
        this.categoryName = categoryName;
    }

    public int getResourceId() {
        return resourceId;
    }

    public void setResourceId(int resourceId) {
        this.resourceId = resourceId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    @Override
    public String toString() {
        return "Category{" +
                "resourceId='" + resourceId + '\'' +
                ", categoryName='" + categoryName + '\'' +
                '}';
    }
}
