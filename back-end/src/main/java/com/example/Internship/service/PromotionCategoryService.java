package com.example.Internship.service;

import com.example.Internship.dto.PromotionCategoryDto;
import com.example.Internship.entity.PromotionCategory;
import com.example.Internship.exception.ResourceNotFoundException;
import com.example.Internship.mapper.PromotionCategoryMapper;
import com.example.Internship.repository.PromotionCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PromotionCategoryService {
    @Autowired
    private PromotionCategoryRepository repo;

    @Autowired
    private PromotionCategoryMapper promotionCategoryMapper;

    public PromotionCategoryDto createPromotionCategory(PromotionCategoryDto promotionCategoryDto){
        PromotionCategory promotionCategory = promotionCategoryMapper.mapToPromotionCategory(promotionCategoryDto);
        PromotionCategory savedPromotionCategory = repo.save(promotionCategory);
        return promotionCategoryMapper.mapToPromotionCategoryDto(savedPromotionCategory);
    }

    public PromotionCategoryDto getPromotionCategoryById(Integer id){
        PromotionCategory promotionCategory = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Promotion Category does not exist with id: " + id));
        return promotionCategoryMapper.mapToPromotionCategoryDto(promotionCategory);
    }

    public List<PromotionCategoryDto> getAllPromotionCategories(){
        List<PromotionCategory> promotionCategoryList = repo.findAll();
        return promotionCategoryList.stream().map((pc) -> promotionCategoryMapper.mapToPromotionCategoryDto(pc)).collect(Collectors.toList());
    }
}
