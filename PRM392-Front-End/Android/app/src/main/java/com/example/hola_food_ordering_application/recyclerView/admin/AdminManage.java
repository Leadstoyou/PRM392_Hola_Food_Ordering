package com.example.hola_food_ordering_application.recyclerView.admin;

public class AdminManage {
    private String date;
    private String name;
    private String phone;
    private String address;
    private int totalBill;

    public AdminManage(String date, String name, String phone, String address, int totalBill) {
        this.date = date;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.totalBill = totalBill;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
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

    public int getTotalBill() {
        return totalBill;
    }

    public void setTotalBill(int totalBill) {
        this.totalBill = totalBill;
    }
}
