package com.example.ebookstore.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "reviews",uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id","book_id"})
})
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private long reviewId;
    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName = "id",nullable = false)
    private Users user;
    @ManyToOne
    @JoinColumn(name = "book_id",referencedColumnName = "book_id",nullable = false)
    private Book book;
    @Column(name = "review_text",columnDefinition = "TEXT")
    private String reviewText;

    public long getReviewId() {
        return reviewId;
    }

    public void setReviewId(long reviewId) {
        this.reviewId = reviewId;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }
}
