package com.example.ebookstore.Service;

import com.example.ebookstore.Repository.BlogCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BlogCommentService {
    private final BlogCommentRepository commentRepository;

    @Autowired
    public BlogCommentService(BlogCommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }
}
