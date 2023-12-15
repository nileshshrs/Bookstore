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

    public Book putBook(Long bookId,Book updatedBook){
        Book existingBook=bookRepository.findById(bookId).orElseThrow(
                ()->new IllegalArgumentException("Book does not exist")
        );
        //if book with given id does not exist we throw above exception which controller deals with

        existingBook.setTitle(updatedBook.getTitle());
        existingBook.setAuthorName(updatedBook.getAuthorName());
        existingBook.setIsbn(updatedBook.getIsbn());
        existingBook.setPrice(updatedBook.getPrice());
        existingBook.setInStock(updatedBook.isInStock());
        existingBook.setCategories(updatedBook.getCategories());
        existingBook.setGenres(updatedBook.getGenres());
        existingBook.setDescription(updatedBook.getDescription());
        existingBook.setDownloadLink(updatedBook.getDownloadLink());
        existingBook.setImagePath(updatedBook.getImagePath());

        return bookRepository.save(existingBook);
    }

}
