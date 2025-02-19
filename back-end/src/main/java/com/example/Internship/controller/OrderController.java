package com.example.Internship.controller;

import com.example.Internship.dto.CheckoutRequest;
import com.example.Internship.dto.OrderDto;
import com.example.Internship.facade.CheckoutFacade;
import com.example.Internship.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private CheckoutFacade checkoutFacade;

    @PostMapping
    public ResponseEntity<OrderDto> createOrder(@RequestBody OrderDto orderDto){
        OrderDto savedOrderDto = orderService.createOrder(orderDto);
        return new ResponseEntity<>(savedOrderDto, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable("id") Integer id){
        OrderDto orderDto = orderService.getOrderById(id);
        return ResponseEntity.ok(orderDto);
    }

    @GetMapping
    public ResponseEntity<List<OrderDto>> getAllOrders(){
        List<OrderDto> orderDtoList = orderService.getAllOrders();
        return ResponseEntity.ok(orderDtoList);
    }

    @PostMapping("/checkout")
    public ResponseEntity<String> checkOut(@RequestBody CheckoutRequest request){
        OrderDto orderDto = checkoutFacade.checkOut(request);
        return ResponseEntity.ok("Checkout Succeed");
    }

}
