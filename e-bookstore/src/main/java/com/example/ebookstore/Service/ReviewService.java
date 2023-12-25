package com.example.ebookstore.Service;

import com.example.ebookstore.Entity.Book;
import com.example.ebookstore.Entity.Review;
import com.example.ebookstore.Entity.Users;
import com.example.ebookstore.Repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

//    public List<Review> getAllReviewsByBookId(Long bookId){
//
//    }
}
