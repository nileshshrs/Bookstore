package com.example.ebookstore.Repository;

import com.example.ebookstore.Entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book,Long> {
    boolean existsBookByIsbn(String isbn);
}
