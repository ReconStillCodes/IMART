package com.example.Internship.mapper;

import com.example.Internship.dto.CartDto;
import com.example.Internship.dto.UserDto;
import com.example.Internship.entity.Cart;
import com.example.Internship.entity.User;
import com.example.Internship.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CartMapper {

    @Autowired
    private UserService userService;

    @Autowired
    private UserMapper userMapper;

    public CartDto mapToCartDto(Cart cart){
        return new CartDto(
                cart.getId(),
                cart.getUser().getId(),
                cart.getTotalPrice(),
                cart.getStatus(),
                cart.getCreatedAt(),
                cart.getUpdatedAt()
        );
    }

    public Cart mapToCart(CartDto cartDto){
        UserDto userDto = userService.getUserById(cartDto.getUserId());
        User user = userMapper.mapToUser(userDto);

        return new Cart(
                cartDto.getId(),
                user,
                cartDto.getTotalPrice(),
                cartDto.getStatus(),
                cartDto.getCreatedAt(),
                cartDto.getUpdatedAt()
        );
    }

}
