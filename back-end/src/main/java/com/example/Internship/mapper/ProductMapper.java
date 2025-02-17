package com.example.Internship.mapper;

import com.example.Internship.dto.ProductCategoryDto;
import com.example.Internship.dto.ProductDto;
import com.example.Internship.entity.Product;
import com.example.Internship.entity.ProductCategory;
import com.example.Internship.service.ProductCategoryService;
import com.example.Internship.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    @Autowired
    private ProductCategoryService productCategoryService;

    public  ProductDto mapToProductDto(Product product){
       return new ProductDto(
               product.getId(),
               product.getName(),
               product.getDescription(),
               product.getCategory().getId(),
               product.getPrice(),
               product.getStock(),
               product.getImageUrl(),
               product.getCreatedAt(),
               product.getUpdatedAt()
       );
    }

    public Product mapToProduct(ProductDto productDto){
        ProductCategoryDto categoryDto = productCategoryService.getProductCategoryById(productDto.getCategoryId());
        ProductCategory category = ProductCategoryMapper.mapToProductCategory(categoryDto);

        return new Product(
                productDto.getId(),
                productDto.getName(),
                productDto.getDescription(),
                category,
                productDto.getPrice(),
                productDto.getStock(),
                productDto.getImageUrl(),
                productDto.getCreatedAt(),
                productDto.getUpdatedAt()
        );
    }

}
