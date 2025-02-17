package com.example.Internship.factory.PromotionProductFactory;

import com.example.Internship.dto.ProductDto;
import com.example.Internship.dto.PromotionDto;
import com.example.Internship.dto.PromotionProductRequest.PromotionProductRequest;


public abstract class   PromotionProductFactory {

    public static PromotionProductFactory getFactory(Integer category){
        return switch (category) {
            case 1 -> new PercentagePromotionProductFactory();
            case 2 -> new FixedValuePromotionProductFactory();
            case 3 -> new BundlePromotionProductFactory();
            default -> null;
        };

    }

    public abstract PromotionProductRequest createProduct(ProductDto product, PromotionDto promotion);
}
