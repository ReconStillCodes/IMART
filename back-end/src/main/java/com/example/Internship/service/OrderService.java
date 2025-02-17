package com.example.Internship.service;

import com.example.Internship.dto.OrderDto;
import com.example.Internship.dto.PaymentDto;
import com.example.Internship.entity.Order;
import com.example.Internship.entity.Payment;
import com.example.Internship.exception.ResourceNotFoundException;
import com.example.Internship.mapper.OrderMapper;
import com.example.Internship.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository repo;

    @Autowired
    private OrderMapper orderMapper;

    public OrderDto createOrder(OrderDto orderDto){
        Order order = orderMapper.mapToOrder(orderDto);
        Order savedOrder = repo.save(order);
        return orderMapper.mapToOrderDto(savedOrder);
    }

    public OrderDto getOrderById(Integer id){
        Order order = repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Order does not exist with the given id : " + id));
        return orderMapper.mapToOrderDto(order);
    }

    public List<OrderDto> getAllOrders(){
        List<Order> orderList = repo.findAll();
        return orderList.stream().map((order) -> orderMapper.mapToOrderDto(order)).collect(Collectors.toList());
    }
}
