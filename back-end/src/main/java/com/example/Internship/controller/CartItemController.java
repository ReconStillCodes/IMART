package com.example.Internship.controller;

import com.example.Internship.dto.CartDto;
import com.example.Internship.dto.CartItemDto;
import com.example.Internship.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart-items")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @PostMapping
    public ResponseEntity<CartItemDto> createCartItem(@RequestBody CartItemDto cartItemDto){
        CartItemDto savedCartItemDto = cartItemService.createCartItem(cartItemDto);
        return new ResponseEntity<>(savedCartItemDto, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<CartItemDto> getCartItemById(@PathVariable("id") Integer id){
        CartItemDto cartItemDto = cartItemService.getCartItemById(id);
        return ResponseEntity.ok(cartItemDto);
    }

    @GetMapping
    public ResponseEntity<List<CartItemDto>> getAllCartItems(){
        List<CartItemDto> cartItemDtoList = cartItemService.getAllCartItems();
        return ResponseEntity.ok(cartItemDtoList);
    }

    @GetMapping("/cartId/{cartId}")
    public ResponseEntity<List<CartItemDto>> getCartItemByCartId(@PathVariable("cartId") Integer cartId){
        List<CartItemDto> cartItemDtoList = cartItemService.getCartItemByCartId(cartId);
        return ResponseEntity.ok(cartItemDtoList);
    }

    @PutMapping("/update-quantity/{id}")
    public ResponseEntity<CartItemDto> updateQuantity(@PathVariable("id") Integer id,@RequestBody Integer change){
        CartItemDto cartItemDto = cartItemService.updateQuantity(id, change);
        return ResponseEntity.ok(cartItemDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCartItem(@PathVariable("id") Integer id){
        cartItemService.deleteCartItem(id);
        return ResponseEntity.ok("Cart Item Successfully deleted");
    }
}
