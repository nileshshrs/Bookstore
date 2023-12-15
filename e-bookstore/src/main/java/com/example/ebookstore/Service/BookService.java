package com.example.ebookstore.Service;

import com.example.ebookstore.Entity.Book;
import com.example.ebookstore.Repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    public Optional<Book> getBookById(long id){
        return bookRepository.findById(id);
    }

    public void deleteBook(Long bookId){
        Book existingBook=bookRepository.findById(bookId).orElseThrow(()->new IllegalArgumentException("Book with given id does not exist"));
        bookRepository.delete(existingBook);
    }

}
