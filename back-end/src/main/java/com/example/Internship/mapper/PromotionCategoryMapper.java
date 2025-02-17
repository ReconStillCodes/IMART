package com.example.Internship.mapper;

import com.example.Internship.dto.PromotionCategoryDto;
import com.example.Internship.entity.PromotionCategory;
import org.springframework.stereotype.Component;

@Component
public class PromotionCategoryMapper {

    public PromotionCategoryDto mapToPromotionCategoryDto(PromotionCategory promotionCategory){
        return new PromotionCategoryDto(
                promotionCategory.getId(),
                promotionCategory.getName(),
                promotionCategory.getDescription(),
                promotionCategory.getCreatedAt(),
                promotionCategory.getUpdatedAt()
        );
    }

    public PromotionCategory mapToPromotionCategory(PromotionCategoryDto promotionCategoryDto){
        return new PromotionCategory(
                promotionCategoryDto.getId(),
                promotionCategoryDto.getName(),
                promotionCategoryDto.getDescription(),
                promotionCategoryDto.getCreatedAt(),
                promotionCategoryDto.getUpdatedAt()
        );
    }
}
