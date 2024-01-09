package com.example.ebookstore.Controller;

import com.example.ebookstore.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v2/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/create")
    public List<Map<String, Object>> createOrder(@RequestBody Map<String, Object> requestData) {
        List<Map<String, Object>> cartItems = (List<Map<String, Object>>) requestData.get("cartItems");

        // Convert timestamp to LocalDateTime
        Instant timestamp = Instant.ofEpochMilli((Long) requestData.get("orderDate"));
        LocalDateTime orderDate = LocalDateTime.ofInstant(timestamp, ZoneOffset.UTC);

        String shippingAddress = (String) requestData.get("shippingAddress");
        String paymentMethod = (String) requestData.get("paymentMethod");

        return orderService.createOrder(cartItems, orderDate, shippingAddress, paymentMethod);
    }
}
