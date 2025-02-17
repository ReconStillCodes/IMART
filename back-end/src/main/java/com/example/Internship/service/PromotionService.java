package com.example.Internship.service;

import com.example.Internship.dto.ProductDto;
import com.example.Internship.dto.PromotionDto;
import com.example.Internship.entity.Product;
import com.example.Internship.entity.Promotion;
import com.example.Internship.exception.ResourceNotFoundException;
import com.example.Internship.mapper.PromotionMapper;
import com.example.Internship.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PromotionService {

    @Autowired
    private PromotionMapper promotionMapper;

    @Autowired
    private PromotionRepository repo;

    public PromotionDto createPromotion(PromotionDto promotionDto){
        Promotion promotion = promotionMapper.mapToPromotion(promotionDto);
        Promotion savedPromotion = repo.save(promotion);
        return promotionMapper.mapToPromotionDto(savedPromotion);
    }

    public PromotionDto getPromotionById(Integer id){
        Promotion promotion = repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Promotion does not Exist with id : " + id));
        return promotionMapper.mapToPromotionDto(promotion);
    }

    public List<PromotionDto> getAllPromotions(){
        List<Promotion> promotionList = repo.findAll();
        return promotionList.stream().map((promotion) -> promotionMapper.mapToPromotionDto(promotion)).collect(Collectors.toList());
    }
}
