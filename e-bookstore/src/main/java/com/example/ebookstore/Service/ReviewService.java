package com.example.ebookstore.Service;

import com.example.ebookstore.Entity.Book;
import com.example.ebookstore.Entity.Review;
import com.example.ebookstore.Entity.Users;
import com.example.ebookstore.Repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public Review addReview(Users user, Book book,String reviewText){
        if (user == null || book == null || reviewText.isBlank()) {
            throw new IllegalArgumentException("Invalid input parameters");
        }
        if (reviewRepository.existsByBookAndUser(book, user)){
            throw new IllegalArgumentException("Review from user about book already exists.");
        }
        Review newReview=new Review();
        newReview.setBook(book);
        newReview.setUser(user);
        newReview.setReviewText(reviewText);
        return reviewRepository.save(newReview);
    }

    public List<Map<String,Object>> getAllReviewsByBookId(Long bookId){
        List<Map<String,Object>> reviewsData=new ArrayList<>();

        List<Review> reviews=reviewRepository.findAllByBook_BookId(bookId);

        for (Review review : reviews) {
            Map<String,Object> singleReview=new HashMap<>();
            singleReview.put("bookId",review.getBook().getBookId());
            singleReview.put("userId",review.getUser().getId());
            singleReview.put("reviewText",review.getReviewText());

            reviewsData.add(singleReview);
        }
        return reviewsData;
    }
}
