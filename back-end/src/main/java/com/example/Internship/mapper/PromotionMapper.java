package com.example.Internship.mapper;

import com.example.Internship.dto.PromotionCategoryDto;
import com.example.Internship.dto.PromotionDto;
import com.example.Internship.entity.Promotion;
import com.example.Internship.entity.PromotionCategory;
import com.example.Internship.service.PromotionCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PromotionMapper {
    @Autowired
    private PromotionCategoryService promotionCategoryService;

    @Autowired
    private PromotionCategoryMapper promotionCategoryMapper;

    public PromotionDto mapToPromotionDto(Promotion promotion){
        return new PromotionDto(
                promotion.getId(),
                promotion.getName(),
                promotion.getDescription(),
                promotion.getDiscountValue(),
                promotion.getStatus(),
                promotion.getStartDate(),
                promotion.getEndDate(),
                promotion.getCategory().getId(),
                promotion.getCreatedAt(),
                promotion.getUpdatedAt()
        );
    }

    public Promotion mapToPromotion(PromotionDto promotionDto){
        PromotionCategoryDto categoryDto = promotionCategoryService.getPromotionCategoryById(promotionDto.getCategoryId());
        PromotionCategory category = promotionCategoryMapper.mapToPromotionCategory(categoryDto);

        return new Promotion(
                promotionDto.getId(),
                promotionDto.getName(),
                promotionDto.getDescription(),
                promotionDto.getDiscountValue(),
                promotionDto.getStatus(),
                promotionDto.getStartDate(),
                promotionDto.getEndDate(),
                category,
                promotionDto.getCreatedAt(),
                promotionDto.getUpdatedAt()
        );
    }
}
