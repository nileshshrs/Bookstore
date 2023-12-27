package com.example.ebookstore.Repository;

import com.example.ebookstore.Entity.Book;
import com.example.ebookstore.Entity.Cart;
import com.example.ebookstore.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUserAndBook(Users user, Book book);

    List<Cart> findByUser(Users user);

    List<Cart> findByUserId(Long userId);
    // You can add custom query methods if needed
}
