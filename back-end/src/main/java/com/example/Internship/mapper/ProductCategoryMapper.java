package com.example.Internship.mapper;

import com.example.Internship.dto.ProductCategoryDto;
import com.example.Internship.entity.ProductCategory;

public class ProductCategoryMapper {

    public static ProductCategoryDto mapToProductCategoryDto(ProductCategory productCategory){
        return new ProductCategoryDto(
                productCategory.getId(),
                productCategory.getName(),
                productCategory.getDescription(),
                productCategory.getCreatedAt(),
                productCategory.getUpdatedAt()
        );
    }

    public static ProductCategory mapToProductCategory(ProductCategoryDto productCategoryDto){
        return new ProductCategory(
                productCategoryDto.getId(),
                productCategoryDto.getName(),
                productCategoryDto.getDescription(),
                productCategoryDto.getCreatedAt(),
                productCategoryDto.getUpdatedAt()
        );
    }
}
