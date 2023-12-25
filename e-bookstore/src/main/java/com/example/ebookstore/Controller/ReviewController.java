package com.example.ebookstore.Controller;

import com.example.ebookstore.Entity.Book;
import com.example.ebookstore.Entity.Review;
import com.example.ebookstore.Entity.Users;
import com.example.ebookstore.Service.BookService;
import com.example.ebookstore.Service.ReviewService;
import com.example.ebookstore.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v2/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {
    private final ReviewService reviewService;
    private final UserService userService;
    private final BookService bookService;

    @Autowired
    public ReviewController(ReviewService reviewService, UserService userService, BookService bookService) {
        this.reviewService = reviewService;
        this.userService = userService;
        this.bookService = bookService;
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addReview(@RequestBody Map<String,Object> requestBody){
        try{
            Long userId = ((Number) requestBody.get("userId")).longValue();
            Long bookId = ((Number) requestBody.get("bookId")).longValue();
            String reviewText = (String) requestBody.get("reviewText");
            Optional<Users> userOptional = userService.getUsersById(userId);
            Optional<Book> bookOptional = bookService.getBookById(bookId);

            if (userOptional.isPresent() && bookOptional.isPresent()) {
                Users user = userOptional.get();
                Book book = bookOptional.get();

                Review newReview = reviewService.addReview(user, book, reviewText);
                Map<String, Object> responseData = new HashMap<>();

                responseData.put("userId", user.getId());
                responseData.put("bookId", book.getBookId());
                responseData.put("reviewText", reviewText);

                return new ResponseEntity<>(responseData, HttpStatus.OK);
            } else {
                String errorMessage = "User or book not found.";
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("message", errorMessage);
                return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
            }
        }catch (IllegalArgumentException e){
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
        }
        }
}
