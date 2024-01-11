package com.example.ebookstore.Repository;

import com.example.ebookstore.Entity.Book;
import com.example.ebookstore.Entity.Cart;
import com.example.ebookstore.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUserAndBook(Users user, Book book);

    List<Cart> findByUser(Users user);

    List<Cart> findByUserId(Long userId);


}
