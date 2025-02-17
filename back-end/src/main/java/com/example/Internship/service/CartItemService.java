package com.example.Internship.service;

import com.example.Internship.dto.CartDto;
import com.example.Internship.dto.CartItemDto;
import com.example.Internship.entity.Cart;
import com.example.Internship.entity.CartItem;
import com.example.Internship.exception.ResourceNotFoundException;
import com.example.Internship.mapper.CartItemMapper;
import com.example.Internship.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartItemService {
    @Autowired
    private CartItemRepository repo;

    @Autowired
    private CartItemMapper cartItemMapper;

    public CartItemDto createCartItem(CartItemDto cartItemDto){
        CartItem cartItem = cartItemMapper.mapToCartItem(cartItemDto);
        CartItem savedCartItem = repo.save(cartItem);
        return cartItemMapper.mapToCartItemDto(savedCartItem);
    }

    public CartItemDto getCartItemById(Integer id){
        CartItem cartItem = repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Cart item does not Exist with id : " + id));
        return cartItemMapper.mapToCartItemDto(cartItem);
    }

    public List<CartItemDto> getAllCartItems(){
        List<CartItem> cartItemList = repo.findAll();
        return cartItemList.stream().map((cartItem) -> cartItemMapper.mapToCartItemDto(cartItem)).collect(Collectors.toList());
    }



}
