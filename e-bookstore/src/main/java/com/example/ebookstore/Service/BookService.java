package com.example.ebookstore.Service;

import com.example.ebookstore.Entity.Book;
import com.example.ebookstore.Repository.BookRepository;
import com.example.ebookstore.Repository.CartRepository;
import com.example.ebookstore.Repository.OrderRepository;
import com.example.ebookstore.Repository.ReviewRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BookService {
    private final BookRepository bookRepository;
    private final CartRepository cartRepository;
    private final ReviewRepository reviewRepository;
    private final OrderRepository orderRepository;

    @Autowired
    public BookService(BookRepository bookRepository, CartRepository cartRepository, ReviewRepository reviewRepository, OrderRepository orderRepository) {
        this.bookRepository = bookRepository;
        this.cartRepository=cartRepository;
        this.reviewRepository=reviewRepository;
        this.orderRepository=orderRepository;
    }

    public synchronized Book createBook(Book newBook) {


        if (newBook.getTitle() == null || newBook.getTitle().isBlank()
                || newBook.getPrice() == null
                || newBook.getIsbn() == null || newBook.getIsbn().isBlank()
                || newBook.getAuthorName() == null || newBook.getAuthorName().isBlank()
                || newBook.getDescription() == null || newBook.getDescription().isBlank()
                || newBook.getGenres() == null || newBook.getGenres().isEmpty()
                || newBook.getCategories() == null || newBook.getCategories().isEmpty()
                || newBook.getImagePath() ==null || newBook.getImagePath().isBlank()) {
            throw new IllegalArgumentException("Fields CANNOT BE Empty.");
        }
        if (bookRepository.existsBookByIsbn(newBook.getIsbn())) {
            throw new IllegalArgumentException("Book with the same ISBN already exists");
        }
        return bookRepository.save(newBook);
    }

    public synchronized List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public synchronized Optional<Book> getBookById(long id) {
        return bookRepository.findById(id);
    }

    public synchronized void deleteBook(Long bookId) {
        Book existingBook = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("Book with the given ID does not exist"));

        // Then delete the book
        cartRepository.deleteByBook(existingBook);
        reviewRepository.deleteByBook(existingBook);
        orderRepository.deleteByBook(existingBook);
        bookRepository.delete(existingBook);

    }

    public synchronized Book putBook(Long bookId, Book updatedBook) {
        Book existingBook = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("Book does not exist"));
        if (updatedBook.getTitle() == null || updatedBook.getTitle().isBlank()
                || updatedBook.getPrice() == null
                || updatedBook.getIsbn() == null || updatedBook.getIsbn().isBlank()
                || updatedBook.getAuthorName() == null || updatedBook.getAuthorName().isBlank()
                || updatedBook.getDescription() == null || updatedBook.getDescription().isBlank()
                || updatedBook.getGenres() == null || updatedBook.getGenres().isEmpty()
                || updatedBook.getCategories() == null || updatedBook.getCategories().isEmpty()
                || updatedBook.getImagePath() ==null || updatedBook.getImagePath().isBlank()) {
            throw new IllegalArgumentException("Fields CANNOT BE Empty.");
        }
        if(bookRepository.existsBookByIsbn(existingBook.getIsbn())){
            throw new IllegalArgumentException("Book with the given ID does not exist");
        }
        // Update the fields of the existing book
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
