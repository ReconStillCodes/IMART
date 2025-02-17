package com.example.Internship.service;

import com.example.Internship.dto.CartDto;
import com.example.Internship.dto.OrderDto;
import com.example.Internship.dto.OrderItemDto;
import com.example.Internship.entity.Cart;
import com.example.Internship.entity.OrderItem;
import com.example.Internship.exception.ResourceNotFoundException;
import com.example.Internship.mapper.OrderItemMapper;
import com.example.Internship.mapper.OrderMapper;
import com.example.Internship.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository repo;

    @Autowired
    private OrderItemMapper orderItemMapper;

    public OrderItemDto createOrderItem(OrderItemDto orderItemDto){
        OrderItem orderItem = orderItemMapper.mapToOrderItem(orderItemDto);
        OrderItem savedOrderItem = repo.save(orderItem);
        return orderItemMapper.mapToOrderItemDto(savedOrderItem);
    }

    public OrderItemDto getOrderItemById(Integer id){
        OrderItem orderItem = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order Item Does not Exist with id : " + id));
        return orderItemMapper.mapToOrderItemDto(orderItem);
    }

    public List<OrderItemDto> getAllOrderItems(){
        List<OrderItem> orderItemList = repo.findAll();
        return orderItemList.stream().map((orderItem) -> orderItemMapper.mapToOrderItemDto(orderItem)).collect(Collectors.toList());
    }

    public List<OrderItemDto> getOrderItemsByProductId(Integer productId){
        List<OrderItem> orderItemList = repo.findByProductId(productId);
        return orderItemList.stream().map((orderItem) -> orderItemMapper.mapToOrderItemDto(orderItem)).collect(Collectors.toList());
    }

    public Integer getQuantityByProductId(Integer productId){
        List<OrderItemDto> orderItemDtoList = getOrderItemsByProductId(productId);
        Integer quantity = 0;

        for(OrderItemDto orderItemDto : orderItemDtoList){
            quantity += orderItemDto.getQuantity();
        }

        return quantity;
    }


}
