package com.example.Internship.controller;

import com.example.Internship.dto.PromotionCategoryDto;
import com.example.Internship.service.PromotionCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/promotion-categories")
public class PromotionCategoryController {

    @Autowired
    private PromotionCategoryService promotionCategoryService;

    @PostMapping
    public ResponseEntity<PromotionCategoryDto> createPromotionCategory(@RequestBody PromotionCategoryDto promotionCategoryDto){
        PromotionCategoryDto savedPromotionCategory = promotionCategoryService.createPromotionCategory(promotionCategoryDto);
        return new ResponseEntity<>(savedPromotionCategory, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<PromotionCategoryDto> getPromotionCategoryById(@PathVariable("id") Integer id){
        PromotionCategoryDto promotionCategoryDto = promotionCategoryService.getPromotionCategoryById(id);
        return ResponseEntity.ok(promotionCategoryDto);
    }

    @GetMapping
    public ResponseEntity<List<PromotionCategoryDto>> getAllPromotionCategories(){
        List<PromotionCategoryDto> promotionCategoryDtoList = promotionCategoryService.getAllPromotionCategories();
        return ResponseEntity.ok(promotionCategoryDtoList);
    }
}
