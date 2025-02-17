package com.example.Internship.controller;

import com.example.Internship.dto.ProductCategoryDto;
import com.example.Internship.entity.ProductCategory;
import com.example.Internship.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-categories")
public class ProductCategoryController {

    @Autowired
    private ProductCategoryService productCategoryService;

    @PostMapping
    public ResponseEntity<ProductCategoryDto> createProductCategory(@RequestBody ProductCategoryDto productCategoryDto){
        ProductCategoryDto savedProductCategory = productCategoryService.createProductCategory(productCategoryDto);
        return new ResponseEntity<>(savedProductCategory, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public  ResponseEntity<ProductCategoryDto> getProductCategoryById(@PathVariable("id") Integer id){
        ProductCategoryDto productCategoryDto = productCategoryService.getProductCategoryById(id);
        return ResponseEntity.ok(productCategoryDto);
    }

    @GetMapping
    public ResponseEntity<List<ProductCategoryDto>> getAllProductCategories(){
        List<ProductCategoryDto> productCategoryDtoList = productCategoryService.getAllProductCategories();
        return ResponseEntity.ok(productCategoryDtoList);
    }
}
