package com.example.Internship.mapper;

import com.example.Internship.dto.CartDto;
import com.example.Internship.dto.CartItemDto;
import com.example.Internship.dto.ProductDto;
import com.example.Internship.entity.Cart;
import com.example.Internship.entity.CartItem;
import com.example.Internship.entity.Product;
import com.example.Internship.service.CartService;
import com.example.Internship.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CartItemMapper {

    @Autowired
    private CartService cartService;

    @Autowired
    private ProductService productService;

    @Autowired
    private CartMapper cartMapper;

    @Autowired
    private ProductMapper productMapper;

    public CartItemDto mapToCartItemDto(CartItem cartItem){
        return new CartItemDto(
                cartItem.getId(),
                cartItem.getCart().getId(),
                cartItem.getProduct().getId(),
                cartItem.getQuantity(),
                cartItem.getTotalPrice(),
                cartItem.getCreatedAt(),
                cartItem.getUpdatedAt()
        );
    }

    public CartItem mapToCartItem(CartItemDto cartItemDto){
        CartDto cartDto = cartService.getCartById(cartItemDto.getCartId());
        Cart cart = cartMapper.mapToCart(cartDto);

        ProductDto productDto = productService.getProductById(cartItemDto.getProductId());
        Product product = productMapper.mapToProduct(productDto);

        return new CartItem(
                cartItemDto.getId(),
                cart,
                product,
                cartItemDto.getQuantity(),
                cartItemDto.getTotalPrice(),
                cartItemDto.getCreatedAt(),
                cartItemDto.getUpdatedAt()
        );
    }


}
