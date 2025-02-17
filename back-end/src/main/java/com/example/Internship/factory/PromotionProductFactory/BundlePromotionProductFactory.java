package com.example.Internship.factory.PromotionProductFactory;

import com.example.Internship.dto.ProductDto;
import com.example.Internship.dto.PromotionDto;
import com.example.Internship.dto.PromotionProductRequest.BundlePromotionProductRequest;
import com.example.Internship.dto.PromotionProductRequest.PromotionProductRequest;

public class BundlePromotionProductFactory extends PromotionProductFactory{
    @Override
    public PromotionProductRequest createProduct(ProductDto product, PromotionDto promotion) {
        return new BundlePromotionProductRequest(
                promotion.getId(),
                promotion.getName(),
                promotion.getDiscountValue(),
                product.getPrice()
        );
    }
}
