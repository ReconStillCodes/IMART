package com.example.Internship.mapper;

import com.example.Internship.dto.OrderDto;
import com.example.Internship.dto.OrderItemDto;
import com.example.Internship.dto.ProductDto;
import com.example.Internship.entity.Order;
import com.example.Internship.entity.OrderItem;
import com.example.Internship.entity.Product;
import com.example.Internship.service.OrderService;
import com.example.Internship.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OrderItemMapper {
    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService productService;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private ProductMapper productMapper;

    public OrderItemDto mapToOrderItemDto(OrderItem orderItem){
        return new OrderItemDto(
                orderItem.getId(),
                orderItem.getProduct().getId(),
                orderItem.getOrder().getId(),
                orderItem.getQuantity(),
                orderItem.getTotalPrice(),
                orderItem.getCreatedAt(),
                orderItem.getUpdatedAt()
        );
    }

    public OrderItem mapToOrderItem(OrderItemDto orderItemDto){
        OrderDto orderDto = orderService.getOrderById(orderItemDto.getOrderId());
        Order order = orderMapper.mapToOrder(orderDto);

        ProductDto productDto = productService.getProductById(orderItemDto.getProductId());
        Product product = productMapper.mapToProduct(productDto);

        return new OrderItem(
                orderItemDto.getId(),
                product,
                order,
                orderItemDto.getQuantity(),
                orderItemDto.getTotalPrice(),
                orderItemDto.getCreatedAt(),
                orderItemDto.getUpdatedAt()
        );
    }

}
