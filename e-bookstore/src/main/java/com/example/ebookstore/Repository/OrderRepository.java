package com.example.ebookstore.Repository;

import com.example.ebookstore.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // You can add custom query methods if needed
}
