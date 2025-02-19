package com.example.Internship.controller;

import com.example.Internship.dto.CartDto;
import com.example.Internship.dto.ProductDto;
import com.example.Internship.entity.Cart;
import com.example.Internship.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carts")
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping
    public ResponseEntity<CartDto> createCart(@RequestBody CartDto cartDto){
        CartDto savedCartDto = cartService.createCart(cartDto);
        return new ResponseEntity<>(savedCartDto, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<CartDto> getCartById(@PathVariable("id") Integer id){
        CartDto cartDto = cartService.getCartById(id);
        return ResponseEntity.ok(cartDto);
    }

    @GetMapping
    public ResponseEntity<List<CartDto>> getAllCarts(){
        List<CartDto> cartDtoList = cartService.getAllCarts();
        return ResponseEntity.ok(cartDtoList);
    }

    @GetMapping("userId/{userId}/status/{status}")
    public ResponseEntity<CartDto> getCartByUserIdAndStatus(@PathVariable("userId") Integer userId,@PathVariable("status") String status){
        CartDto cartDto = cartService.getCartByUserIdAndStatus(userId, status);
        return ResponseEntity.ok(cartDto);
    }

    @PutMapping("/calculate-total-price/{id}")
    public ResponseEntity<CartDto> calculateTotalPrice(@PathVariable("id") Integer id){
        CartDto savedCartDto = cartService.calculateTotalPrice(id);
        return ResponseEntity.ok(savedCartDto);
    }

}
