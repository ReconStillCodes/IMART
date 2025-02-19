package com.example.Internship.facade;

import com.example.Internship.dto.*;
import com.example.Internship.entity.Order;
import com.example.Internship.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CheckoutFacade {
    @Autowired
    private CartService cartService;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderItemService orderItemService;

    @Autowired
    private ProductService productService;



    public OrderDto checkOut(CheckoutRequest request){
        CartDto cartDto = cartService.getCartById(request.getCartId());
        List<CartItemDto> cartItemDtoList = cartItemService.getCartItemByCartId(request.getCartId());

        cartDto.setStatus("completed");
        cartDto = cartService.updateCart(cartDto);

        double tax = 0.1;
        double orderTotal = cartDto.getTotalPrice() + cartDto.getTotalPrice() * tax;

        OrderDto orderDto = new OrderDto(cartDto.getUserId(), orderTotal, "completed", request.getPaymentId());
        orderDto = orderService.createOrder(orderDto);

        for(CartItemDto cItem : cartItemDtoList){
            ProductDto productDto = productService.getProductById(cItem.getProductId());
            productDto.setStock(productDto.getStock() - cItem.getQuantity());
            productDto = productService.updateProduct(productDto.getId(), productDto);

            OrderItemDto oItem = new OrderItemDto(cItem.getProductId(), orderDto.getId(), cItem.getQuantity(), cItem.getTotalPrice());
            oItem = orderItemService.createOrderItem(oItem);
        }

        return orderDto;
    }
}
