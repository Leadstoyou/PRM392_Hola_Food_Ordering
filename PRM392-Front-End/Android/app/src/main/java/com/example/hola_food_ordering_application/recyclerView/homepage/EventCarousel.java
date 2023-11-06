package com.example.hola_food_ordering_application.recyclerView.homepage;

public class EventCarousel {
    private int resourceId;
    private String name;

    public EventCarousel(int resourceId, String name) {
        this.resourceId = resourceId;
        this.name = name;
    }

    public int getResourceId() {
        return resourceId;
    }

    public void setResourceId(int resourceId) {
        this.resourceId = resourceId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "EventCarousel{" +
                "resourceId=" + resourceId +
                ", name='" + name + '\'' +
                '}';
    }
}
