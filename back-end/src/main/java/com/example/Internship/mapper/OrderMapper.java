package com.example.Internship.mapper;

import com.example.Internship.dto.OrderDto;
import com.example.Internship.dto.PaymentDto;
import com.example.Internship.dto.UserDto;
import com.example.Internship.entity.Order;
import com.example.Internship.entity.Payment;
import com.example.Internship.entity.User;
import com.example.Internship.service.PaymentService;
import com.example.Internship.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {

    @Autowired
    private UserService userService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PaymentMapper paymentMapper;

    public OrderDto mapToOrderDto(Order order){
        return new OrderDto(
                order.getId(),
                order.getUser().getId(),
                order.getTotalPrice(),
                order.getStatus(),
                order.getPayment().getId(),
                order.getCreatedAt(),
                order.getUpdatedAt()
        );
    }

    public Order mapToOrder(OrderDto orderDto){
        UserDto userDto = userService.getUserById(orderDto.getUserId());
        User user = userMapper.mapToUser(userDto);

        PaymentDto paymentDto = paymentService.getPaymentById(orderDto.getPaymentId());
        Payment payment = paymentMapper.mapToPayment(paymentDto);

        return new Order(
                orderDto.getId(),
                user,
                orderDto.getTotalPrice(),
                orderDto.getStatus(),
                payment,
                orderDto.getCreatedAt(),
                orderDto.getUpdatedAt()
        );
    }
}
