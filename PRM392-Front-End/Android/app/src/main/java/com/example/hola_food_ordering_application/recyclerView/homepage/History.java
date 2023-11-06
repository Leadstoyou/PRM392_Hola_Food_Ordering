package com.example.hola_food_ordering_application.recyclerView.homepage;

public class History {
    private String name;
    private String phone;
    private String address;
    private String code;
    private String listFood;
    private String date;
    private int totalBill;
    private String payment;

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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getListFood() {
        return listFood;
    }

    public void setListFood(String listFood) {
        this.listFood = listFood;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getTotalBill() {
        return totalBill;
    }

    public void setTotalBill(int totalBill) {
        this.totalBill = totalBill;
    }

    public String getPayment() {
        return payment;
    }

    public void setPayment(String payment) {
        this.payment = payment;
    }

    public History(String name, String phone, String address, String code, String listFood, String date, int totalBill, String payment) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.code = code;
        this.listFood = listFood;
        this.date = date;
        this.totalBill = totalBill;
        this.payment = payment;
    }
}
