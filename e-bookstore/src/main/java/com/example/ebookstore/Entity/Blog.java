package com.example.ebookstore.Entity;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.sql.Date;

@Entity
@Table(name = "blogs")
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "blog_id")
    private Long blogId;

    @Column(name = "blog_title")
    private String blogTitle;
    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName = "id",nullable = false)
    private Users author;
    @Column(name = "blog_details" ,columnDefinition = "TEXT", length=10000)
    private String blogDetails;

    @Column(name = "image_path")
    private String imagePath;
//    private Date publishDate;


    public Long getBlogId() {
        return blogId;
    }

    public void setBlogId(Long blogId) {
        this.blogId = blogId;
    }

    public String getBlogTitle() {
        return blogTitle;
    }

    public void setBlogTitle(String blogTitle) {
        this.blogTitle = blogTitle;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Users getAuthor() {
        return author;
    }

    public void setAuthor(Users author) {
        this.author = author;
    }

    public String getBlogDetails() {
        return blogDetails;
    }

    public void setBlogDetails(String blogDetails) {
        this.blogDetails = blogDetails;
    }
}
