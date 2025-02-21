package com.example.Internship.controller;

import com.example.Internship.dto.ProductDto;
import com.example.Internship.dto.SearchingProductRequest;
import com.example.Internship.entity.Product;
import com.example.Internship.service.ProductService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto){
        ProductDto savedProductDto = productService.createProduct(productDto);
        return new ResponseEntity<>(savedProductDto, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable("id") Integer id){
        ProductDto productDto = productService.getProductById(id);
        return ResponseEntity.ok(productDto);
    }

    @GetMapping("/page/{page}/size/{size}")
    public ResponseEntity<List<ProductDto>> getAllProducts(@PathVariable("page") int page, @PathVariable("size") int size){
        List<ProductDto> productDtoList = productService.getAllProducts(page, size);
        return ResponseEntity.ok(productDtoList);
    }

    @PostMapping("/search/{page}/{size}")
    public ResponseEntity<List<ProductDto>> searchProduct(@PathVariable("page") int page, @PathVariable("size") int size, @RequestBody SearchingProductRequest request){

//        System.out.println("🔍 Received Search Request");
//        System.out.println("Page: " + page + ", Size: " + size);
//        System.out.println("Name: " + request.getName());
//        System.out.println("Min Price: " + request.getMinPrice());
//        System.out.println("Max Price: " + request.getMaxPrice());
//        System.out.println("Category ID: " + request.getCategoryId());

        List<ProductDto> productDtoList = productService.searchProduct(page, size, request);
        return ResponseEntity.ok(productDtoList);
    }

    @PostMapping("/search/count/{size}")
    public ResponseEntity<Integer> countSearchProduct(@RequestBody SearchingProductRequest request, @PathVariable("size") int size){
        int count = productService.countSerachProduct(request, size);
        return ResponseEntity.ok(count);
    }


    @PutMapping("{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable("id") Integer id, @RequestBody ProductDto productDto){
        ProductDto updatedProduct = productService.updateProduct(id, productDto);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Integer id){
        productService.deleteProduct(id);
        return ResponseEntity.ok("Delete Product " + id + " Successfull");
    }

    @GetMapping("/total-page/{size}")
    public ResponseEntity<Integer> getTotalPage(@PathVariable("size") int size){
        int totalPage = productService.getTotalPage(size);
        return ResponseEntity.ok(totalPage);
    }

}
