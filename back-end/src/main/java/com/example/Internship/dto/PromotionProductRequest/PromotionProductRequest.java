package com.example.Internship.dto.PromotionProductRequest;

public abstract class PromotionProductRequest {

    protected Integer promotionId;
    protected String promotionName;
    protected Double discountValue;
    protected String promotionBanner;
    protected Double normalPrice;
    protected Double discountPrice;
    protected Boolean isPromotionProductPrice;

    public PromotionProductRequest() {
    }

    public PromotionProductRequest(Integer promotionId,String promotionName, Double discountValue, Double normalPrice) {
        this.promotionId = promotionId;
        this.promotionName = promotionName;
        this.discountValue = discountValue;
        this.normalPrice = normalPrice;
        init();
    }

    public Boolean getPromotionProductPrice() {
        return isPromotionProductPrice;
    }

    public void setPromotionProductPrice(Boolean promotionProductPrice) {
        isPromotionProductPrice = promotionProductPrice;
    }

    public Double getDiscountPrice() {
        return discountPrice;
    }

    public void setDiscountPrice(Double discountPrice) {
        this.discountPrice = discountPrice;
    }

    public Double getNormalPrice() {
        return normalPrice;
    }

    public void setNormalPrice(Double normalPrice) {
        this.normalPrice = normalPrice;
    }

    public String getPromotionBanner() {
        return promotionBanner;
    }

    public void setPromotionBanner(String promotionBanner) {
        this.promotionBanner = promotionBanner;
    }

    public Double getDiscountValue() {
        return discountValue;
    }

    public void setDiscountValue(Double discountValue) {
        this.discountValue = discountValue;
    }

    public String getPromotionName() {
        return promotionName;
    }

    public void setPromotionName(String promotionName) {
        this.promotionName = promotionName;
    }

    public Integer getPromotionId() {
        return promotionId;
    }

    public void setPromotionId(Integer promotionId) {
        this.promotionId = promotionId;
    }

    protected void init(){
        setCustomIsPromotionProductPrice();
        setCustomDiscountPrice();
        setCustomPromotionBanner();
    }

    protected abstract void setCustomIsPromotionProductPrice();
    protected abstract void setCustomDiscountPrice();
    protected abstract void setCustomPromotionBanner();
}
