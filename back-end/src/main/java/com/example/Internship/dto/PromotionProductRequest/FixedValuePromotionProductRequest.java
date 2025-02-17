package com.example.Internship.dto.PromotionProductRequest;

import java.text.NumberFormat;
import java.util.Locale;

public class FixedValuePromotionProductRequest extends PromotionProductRequest{

    public FixedValuePromotionProductRequest(Integer promotionId, String promotionName, Double discountValue, Double normalPrice) {
        super(promotionId, promotionName, discountValue, normalPrice);
    }

    @Override
    protected void setCustomIsPromotionProductPrice() {
        isPromotionProductPrice = true;
    }

    @Override
    protected void setCustomDiscountPrice() {
        discountPrice = normalPrice - discountValue;
    }

    @Override
    protected void setCustomPromotionBanner() {
        NumberFormat formatter = NumberFormat.getInstance(new Locale("id", "ID"));
        formatter.setMinimumFractionDigits(2);
        formatter.setMaximumFractionDigits(2);

        promotionBanner ="Rp " + formatter.format(discountValue) + " OFF";
    }
}
