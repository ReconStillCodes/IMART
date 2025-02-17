package com.example.Internship.mapper;

import com.example.Internship.dto.ProductDto;
import com.example.Internship.dto.PromotionDto;
import com.example.Internship.dto.PromotionItemDto;
import com.example.Internship.entity.Product;
import com.example.Internship.entity.Promotion;
import com.example.Internship.entity.PromotionItem;
import com.example.Internship.service.ProductService;
import com.example.Internship.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PromotionItemMapper {

    @Autowired
    private PromotionService promotionService;

    @Autowired
    private ProductService productService;

    @Autowired
    private PromotionMapper promotionMapper;

    @Autowired
    private ProductMapper productMapper;

    public PromotionItemDto mapToPromotionItemDto (PromotionItem promotionItem){
        return new PromotionItemDto(
                promotionItem.getId(),
                promotionItem.getPromotion().getId(),
                promotionItem.getProduct().getId(),
                promotionItem.getQuantity(),
                promotionItem.getCreatedAt(),
                promotionItem.getUpdatedAt()
        );
    }

    public PromotionItem mapToPromotionItem(PromotionItemDto promotionItemDto){
        PromotionDto promotionDto = promotionService.getPromotionById(promotionItemDto.getPromotionId());
        Promotion promotion = promotionMapper.mapToPromotion(promotionDto);

        ProductDto productDto = productService.getProductById(promotionItemDto.getProductId());
        Product product = productMapper.mapToProduct(productDto);

        return new PromotionItem(
                promotionItemDto.getId(),
                promotion,
                product,
                promotionItemDto.getQuantity(),
                promotionItemDto.getCreatedAt(),
                promotionItemDto.getUpdatedAt()
        );
    }

}
