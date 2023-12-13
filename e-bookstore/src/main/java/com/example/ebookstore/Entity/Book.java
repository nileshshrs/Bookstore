package com.example.ebookstore.Entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Set;

@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Long bookId;
    @Column(name = "title")
    private String title;
    @Column(name = "isbn",unique = true)
    private String isbn;
    @Column(name = "author_name")
    private String authorName;
    @Column(name = "price")
    private BigDecimal price;
    @Column(name = "description",columnDefinition = "TEXT")
    private String description;
    @Column(name = "download_link")
    private String downloadLink;
    @Column(name = "image_path")
    private String imagePath;
    @Column(name = "in_stock")
    private boolean inStock=true;   //default is set to trueu0i-
    public enum Category{
        PHYSICAL,
        EBOOK,
        AUDIOBOOK
    }
    @ElementCollection
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "book_category",joinColumns = @JoinColumn(name = "book_id"))
    @Column(name = "category")
    private Set<Category> categories;
    @ElementCollection
    @CollectionTable(name = "book_genre",joinColumns = @JoinColumn(name = "book_id"))
    @Column(name = "genre")
    private Set<String> genres;

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        description = description;
    }

    public String getDownloadLink() {
        return downloadLink;
    }

    public void setDownloadLink(String downloadLink) {
        this.downloadLink = downloadLink;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public boolean isInStock() {
        return inStock;
    }

    public void setInStock(boolean inStock) {
        this.inStock = inStock;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public Set<String> getGenres() {
        return genres;
    }

    public void setGenres(Set<String> genres) {
        this.genres = genres;
    }
}
