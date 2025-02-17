package com.example.Internship.controller;

import com.example.Internship.dto.CartDto;
import com.example.Internship.dto.OrderItemDto;
import com.example.Internship.entity.OrderItem;
import com.example.Internship.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order-items")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @PostMapping
    public ResponseEntity<OrderItemDto> createOrderItem(@RequestBody OrderItemDto orderItemDto){
        OrderItemDto savedOrderItemDto = orderItemService.createOrderItem(orderItemDto);
        return new ResponseEntity<>(savedOrderItemDto, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<OrderItemDto> getOrderItemById(@PathVariable("id") Integer id){
        OrderItemDto orderItemDto = orderItemService.getOrderItemById(id);
        return ResponseEntity.ok(orderItemDto);
    }

    @GetMapping
    public ResponseEntity<List<OrderItemDto>> getAllOrderItems(){
        List<OrderItemDto> orderItemDtoList = orderItemService.getAllOrderItems();
        return ResponseEntity.ok(orderItemDtoList);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<List<OrderItemDto>> getOrderItemsByProductId(@PathVariable("id") Integer productId){
        List<OrderItemDto> orderItemDtoList = orderItemService.getOrderItemsByProductId(productId);
        return ResponseEntity.ok(orderItemDtoList);
    }

    @GetMapping("/product-quantity/{id}")
    public ResponseEntity<Integer> getQuantityByProductId(@PathVariable("id") Integer productId){
        Integer quantity = orderItemService.getQuantityByProductId(productId);
        return ResponseEntity.ok(quantity);
    }
}
