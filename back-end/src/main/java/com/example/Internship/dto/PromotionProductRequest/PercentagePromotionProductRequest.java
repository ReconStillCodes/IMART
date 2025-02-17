package com.example.Internship.dto.PromotionProductRequest;

public class PercentagePromotionProductRequest extends PromotionProductRequest{

    public PercentagePromotionProductRequest(Integer promotionId, String promotionName, Double discountValue, Double normalPrice) {
        super(promotionId, promotionName, discountValue, normalPrice);
    }

    @Override
    protected void setCustomIsPromotionProductPrice() {
        isPromotionProductPrice = true;
    }

    @Override
    protected void setCustomDiscountPrice() {
            discountPrice = normalPrice - normalPrice * discountValue / 100;
    }

    @Override
    protected void setCustomPromotionBanner() {
        promotionBanner = discountValue + "% OFF";
    }
}
