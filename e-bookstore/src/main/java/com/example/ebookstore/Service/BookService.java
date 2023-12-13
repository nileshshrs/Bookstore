package com.example.ebookstore.Service;

import com.example.ebookstore.Entity.Book;
import com.example.ebookstore.Repository.BookRepository;
import org.springframework.stereotype.Service;

@Service
public class BookService {
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book createBook(Book newBook){
        if(bookRepository.existsBookByIsbn(newBook.getIsbn())){
            throw new IllegalArgumentException("Book with same isbn already exists");
        }
        return bookRepository.save(newBook);
    }

}
