package com.example.Internship.controller;

import com.example.Internship.dto.ProductDto;
import com.example.Internship.dto.PromotionDto;
import com.example.Internship.dto.PromotionProductRequest.PromotionProductRequest;
import com.example.Internship.entity.Promotion;
import com.example.Internship.factory.PromotionProductFactory.PromotionProductFactory;
import com.example.Internship.service.ProductService;
import com.example.Internship.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/promotions")
public class PromotionCopntroller {

    @Autowired
    private PromotionService promotionService;


    @PostMapping
    public ResponseEntity<PromotionDto> createPromotion(@RequestBody PromotionDto promotionDto) {
        PromotionDto savedPromotionDto = promotionService.createPromotion(promotionDto);
        return new ResponseEntity<>(savedPromotionDto, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<PromotionDto> getPromotionById(@PathVariable("id") Integer id) {
        PromotionDto promotionDto = promotionService.getPromotionById(id);
        return ResponseEntity.ok(promotionDto);
    }

    @GetMapping
    public ResponseEntity<List<PromotionDto>> getAllPromotions() {
        List<PromotionDto> promotionDtoList = promotionService.getAllPromotions();
        return ResponseEntity.ok(promotionDtoList);
    }
}


