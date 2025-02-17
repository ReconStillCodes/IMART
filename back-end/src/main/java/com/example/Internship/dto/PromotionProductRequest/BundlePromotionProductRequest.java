package com.example.Internship.dto.PromotionProductRequest;

public class BundlePromotionProductRequest extends PromotionProductRequest{

    public BundlePromotionProductRequest(Integer promotionId, String promotionName, Double discountValue, Double normalPrice) {
        super(promotionId, promotionName, discountValue, normalPrice);
    }

    @Override
    protected void setCustomIsPromotionProductPrice() {
        isPromotionProductPrice = false;
    }

    @Override
    protected void setCustomDiscountPrice() {
        discountPrice = normalPrice;
    }

    @Override
    protected void setCustomPromotionBanner() {
        promotionBanner = promotionName + " AVAILABLE";
    }
}
