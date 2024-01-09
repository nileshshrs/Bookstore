package com.example.ebookstore.Controller;

import com.example.ebookstore.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v2/orders")
@CrossOrigin(origins = {"http://localhost:5173","http://localhost:5174"})
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
    @GetMapping("/all")
    public List<Map<String, Object>> getAllOrders() {
        return orderService.getAllOrders();
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getOrdersByUserId(@PathVariable Long userId) {
        try {
            List<Map<String, Object>> userOrders = orderService.getOrdersByUserId(userId);
            return ResponseEntity.ok(userOrders);
        } catch (Exception e) {
            // Handle the exception and return an appropriate response
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to fetch orders for user with ID: " + userId);
            errorResponse.put("message", e.getMessage()); // Include the exception message
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonList(errorResponse));
        }
    }

}
