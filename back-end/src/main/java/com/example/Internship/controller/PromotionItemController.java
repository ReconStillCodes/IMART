package com.example.Internship.controller;

import com.example.Internship.dto.ProductDto;
import com.example.Internship.dto.PromotionCategoryDto;
import com.example.Internship.dto.PromotionDto;
import com.example.Internship.dto.PromotionItemDto;
import com.example.Internship.dto.PromotionProductRequest.PromotionProductRequest;
import com.example.Internship.entity.PromotionItem;
import com.example.Internship.factory.PromotionProductFactory.PromotionProductFactory;
import com.example.Internship.service.ProductService;
import com.example.Internship.service.PromotionItemService;
import com.example.Internship.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/promotion-items")
public class PromotionItemController {

    @Autowired
    private PromotionItemService promotionItemService;

    @Autowired
    private PromotionService promotionService;

    @Autowired
    private ProductService productService;


    @PostMapping
    public ResponseEntity<PromotionItemDto> createPromotionItem(@RequestBody PromotionItemDto promotionItemDto){
        PromotionItemDto savedPromotionItem =promotionItemService.createdPromotionItem(promotionItemDto);
        return new ResponseEntity<>(savedPromotionItem, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<PromotionItemDto> getPromotionItemById(@PathVariable("id") Integer id){
        PromotionItemDto promotionItemDto = promotionItemService.getPromotionItemById(id);
        return ResponseEntity.ok(promotionItemDto);
    }

    @GetMapping
    public ResponseEntity<List<PromotionItemDto>> getAllPromotionItems(){
        List<PromotionItemDto> promotionItemDtoList = promotionItemService.getAllPromotionItems();
        return ResponseEntity.ok(promotionItemDtoList);
    }

    @GetMapping("/promotions/{id}")
    public ResponseEntity<List<PromotionItemDto>> getPromotionItemByPromotionId(@PathVariable("id") Integer id){
        List<PromotionItemDto> promotionItemDtoList = promotionItemService.getPromotionItemsByPromotionId(id);
        return ResponseEntity.ok( promotionItemDtoList);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<List<PromotionItemDto>> getPromotionItemByProductId(@PathVariable("id") Integer id){
        List<PromotionItemDto> promotionItemDtoList = promotionItemService.getPromotionItemsByProductId(id);
        return ResponseEntity.ok( promotionItemDtoList);
    }

    @GetMapping("/promotion-product-request/{productId}/{promotionId}")
    public ResponseEntity<PromotionProductRequest> getPromotionProductRequest(@PathVariable("productId") Integer productId,@PathVariable("promotionId") Integer promotionId){
        ProductDto productDto = productService.getProductById(productId);
        PromotionDto promotionDto = promotionService.getPromotionById(promotionId);
        PromotionProductFactory factory = PromotionProductFactory.getFactory(promotionDto.getCategoryId());

        PromotionProductRequest promotionProductRequest = null;

        if(factory != null){
            promotionProductRequest = factory.createProduct(productDto, promotionDto);
        }

        return ResponseEntity.ok(promotionProductRequest);
    }


}
