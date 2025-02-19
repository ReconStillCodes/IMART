package com.example.Internship.service;

import com.example.Internship.dto.CartDto;
import com.example.Internship.dto.CartItemDto;
import com.example.Internship.dto.ProductDto;
import com.example.Internship.entity.Cart;
import com.example.Internship.entity.Product;
import com.example.Internship.exception.ResourceNotFoundException;
import com.example.Internship.mapper.CartMapper;
import com.example.Internship.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {
    @Autowired
    private CartRepository repo;

    @Autowired
    private CartMapper cartMapper;

    @Lazy
    @Autowired
    private CartItemService cartItemService;

    public CartDto createCart(CartDto cartDto){
        Cart cart = cartMapper.mapToCart(cartDto);
        Cart savedCart = repo.save(cart);
        return cartMapper.mapToCartDto(savedCart);
    }

    public CartDto getCartById(Integer id){
        Cart cart = repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Cart does not Exist with id : " + id));
        return cartMapper.mapToCartDto(cart);
    }

    public List<CartDto> getAllCarts(){
        List<Cart> cartList = repo.findAll();
        return cartList.stream().map((cart) -> cartMapper.mapToCartDto(cart)).collect(Collectors.toList());
    }

    public CartDto getCartByUserIdAndStatus(Integer userId, String status){
        Optional<Cart> cart = repo.findByUserIdAndStatusIgnoreCase(userId, status);
        if(cart.isEmpty()) return null;
        return cartMapper.mapToCartDto(cart.get());
    }

    public CartDto updateCart(CartDto cartDto){
        Cart cart = repo.findById(cartDto.getId()).orElseThrow(()->
            new ResourceNotFoundException("Cart does not Exist with id : " + cartDto.getId()));

        Cart newCart = cartMapper.mapToCart(cartDto);

        cart.setUser(newCart.getUser());
        cart.setTotalPrice(newCart.getTotalPrice());
        cart.setStatus(newCart.getStatus());

        Cart savedCart = repo.save(cart);
        return cartMapper.mapToCartDto(savedCart);
    }

    public CartDto calculateTotalPrice(Integer id){
        CartDto cartDto = getCartById( id);
        List<CartItemDto> cartItemDtoList = cartItemService.getCartItemByCartId(cartDto.getId());

        double totalPrice = 0;

        for(CartItemDto cartItem : cartItemDtoList){
            totalPrice += cartItem.getTotalPrice();
        }

        cartDto.setTotalPrice(totalPrice);
        return updateCart(cartDto);
    }

}
