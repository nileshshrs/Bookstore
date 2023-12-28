package com.example.ebookstore.Testing;

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
import java.util.List;
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
                responseData.put("reviewText", newReview.getReviewText());

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

    @GetMapping("/getByBook/{bookId}")
    public ResponseEntity<List<Map<String,Object>>> getAllReviewsOfBook(@PathVariable Long bookId){
        try{
            Optional<Book> existingBook = bookService.getBookById(bookId);
            if (existingBook.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            List<Map<String, Object>> reviewsData = reviewService.getAllReviewsByBookId(bookId);
            return new ResponseEntity<>(reviewsData, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{reviewId}")
    public ResponseEntity<Object> deleteReview(@PathVariable Long reviewId){
        try{
            reviewService.deleteReview(reviewId);
            Map<String,Object> successResponse=new HashMap<>();
            successResponse.put("message","Deleted Successfully");
            return new ResponseEntity<>(successResponse,HttpStatus.OK);

        }catch (IllegalArgumentException e){
            Map<String,Object> errorResponse=new HashMap<>();
            errorResponse.put("message",e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Map<String,Object>>> getAllReviews(){
        try{
            List<Map<String, Object>> reviewsData = reviewService.getAllReviews();
            return new ResponseEntity<>(reviewsData,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
