package com.example.ebookstore.Repository;

import com.example.ebookstore.Entity.Book;
import com.example.ebookstore.Entity.Review;
import com.example.ebookstore.Entity.Users;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {
    boolean existsByBookAndUser(Book book,Users user);

    List<Review> findAllByBook_BookId(Long bookId);


}
