package com.example.ebookstore.Service;

import com.example.ebookstore.Entity.Book;
import com.example.ebookstore.Entity.Order;
import com.example.ebookstore.Entity.Users;
import com.example.ebookstore.Repository.BookRepository;
import com.example.ebookstore.Repository.OrderRepository;
import com.example.ebookstore.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, BookRepository bookRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    public List<Map<String, Object>> createOrder(List<Map<String, Object>> cartItems, LocalDateTime orderDate, String shippingAddress, String paymentMethod) {
        List<Map<String, Object>> result = new ArrayList<>();

        for (Map<String, Object> cartItem : cartItems) {
            // Convert userId and bookId to Long to avoid ClassCastException
            Long userId = ((Number) cartItem.get("userId")).longValue();
            Long bookId = ((Number) cartItem.get("bookId")).longValue();
            int quantity = (int) cartItem.get("quantity");
            // Convert Double to BigDecimal
            BigDecimal total = BigDecimal.valueOf((Double) cartItem.get("total"));

            Optional<Users> optionalUser = userRepository.findById(userId);
            Optional<Book> optionalBook = bookRepository.findById(bookId);

            if (optionalUser.isPresent() && optionalBook.isPresent()) {
                Users user = optionalUser.get();
                Book book = optionalBook.get();

                Order order = new Order();
                order.setUser(user);
                order.setBook(book);
                order.setQuantity(quantity);
                order.setOrderDate(orderDate);
                order.setShippingAddress(shippingAddress);
                order.setPaymentMethod(paymentMethod);
                order.setTotalPrice(total);

                Order savedOrder = orderRepository.save(order);

                Map<String, Object> orderMap = new HashMap<>();
                orderMap.put("orderId", savedOrder.getOrderId());
                orderMap.put("bookId", savedOrder.getBook().getBookId());
                orderMap.put("bookTitle", savedOrder.getBook().getTitle());
                orderMap.put("bookPrice", savedOrder.getBook().getPrice());
                orderMap.put("bookImage", savedOrder.getBook().getImagePath());
                orderMap.put("userId", savedOrder.getUser().getId());
                orderMap.put("username", savedOrder.getUser().getUsername());
                orderMap.put("userEmail", savedOrder.getUser().getEmail());
                orderMap.put("quantity", savedOrder.getQuantity());
                orderMap.put("shippingAddress", savedOrder.getShippingAddress());
                orderMap.put("paymentMethod", savedOrder.getPaymentMethod());
                orderMap.put("totalPrice", savedOrder.getTotalPrice());
                orderMap.put("status", savedOrder.getStatus());
                orderMap.put("orderDate", savedOrder.getOrderDate());


                result.add(orderMap);
            } else {
                // Handle the case where user or book is not found
                result.add(Map.of("error", "User or book not found"));
            }
        }

        return result;
    }

}
