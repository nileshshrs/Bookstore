package com.example.ebookstore.Repository;

import com.example.ebookstore.Entity.Book;
import com.example.ebookstore.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);

    void deleteByBook(Book book);
    // You can add custom query methods if needed
}
