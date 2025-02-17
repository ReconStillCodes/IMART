package com.example.Internship.dto;

public class SearchingProductRequest {
    private String name; //default = ""
    private double minPrice; // default = 0
    private double maxPrice; //default = Double.MAX_VALUE
    private Integer categoryId; //default = -1

    public SearchingProductRequest() {
    }

    public SearchingProductRequest(String name, double minPrice, double maxPrice, Integer categoryId) {
        this.name = name;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.categoryId = categoryId;
    }

    public void validateRequest(){
        validateName();
        validateMinPrice();
        validateMaxPrice();
        validateCategoryId();
    }

    private void validateName(){
        if(name == null ||  name.isBlank()){
            name = "";
        }
    }

    private void validateMinPrice(){
        if( minPrice <= 0){
            minPrice = 0;
        }
    }

    private void validateMaxPrice(){
        if(maxPrice <= 0){
            maxPrice = Double.MAX_VALUE;
        }
    }

    private void validateCategoryId(){
        if(categoryId == null || categoryId <= 0){
            categoryId = 0;
        }
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(double minPrice) {
        this.minPrice = minPrice;
    }

    public double getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(double maxPrice) {
        this.maxPrice = maxPrice;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }
}
