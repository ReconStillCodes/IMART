package com.example.Internship.factory.PromotionProductFactory;

import com.example.Internship.dto.ProductDto;
import com.example.Internship.dto.PromotionDto;
import com.example.Internship.dto.PromotionProductRequest.FixedValuePromotionProductRequest;
import com.example.Internship.dto.PromotionProductRequest.PromotionProductRequest;


public class FixedValuePromotionProductFactory extends PromotionProductFactory{
    @Override
    public PromotionProductRequest createProduct(ProductDto product, PromotionDto promotion) {
        return new FixedValuePromotionProductRequest(
                promotion.getId(),
                promotion.getName(),
                promotion.getDiscountValue(),
                product.getPrice()
        );
    }
}
