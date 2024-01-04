package com.example.ebookstore.Service;

import com.example.ebookstore.Entity.Blog;
import com.example.ebookstore.Entity.BlogComment;
import com.example.ebookstore.Entity.Users;
import com.example.ebookstore.Repository.BlogCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BlogCommentService {
    private final BlogCommentRepository commentRepository;

    @Autowired
    public BlogCommentService(BlogCommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Map<String, Object> addComment(String commentText, Users user, Blog blog){
        BlogComment newComment=new BlogComment();
        if (user == null || blog==null || commentText==null || commentText.isBlank()) {
            throw new IllegalArgumentException("Invalid input parameters");
        }
        if (commentRepository.existsByBlogAndUser(blog,user)){
            throw new IllegalArgumentException("Comment already exist.");
        }

        newComment.setCommentText(commentText);
        newComment.setBlog(blog);
        newComment.setUser(user);
        commentRepository.save(newComment);

        Map<String,Object> singleComment=new HashMap<>();
        singleComment.put("commentId",newComment.getCommentId());
        singleComment.put("blogId",newComment.getBlog().getBlogId());
        singleComment.put("userId",newComment.getUser().getId());
        singleComment.put("userName",newComment.getUser().getUsername());
        singleComment.put("commentText",newComment.getCommentText());

        return singleComment;
    }

    public List<Map<String,Object>> getAllCommentsByBlogId(Long blogId){
        List<Map<String,Object>> commentsData=new ArrayList<>();

        List<BlogComment> comments=commentRepository.findAllByBlog_BlogId(blogId);

        for (BlogComment comment : comments) {
            Map<String,Object> singleComment=new HashMap<>();
            singleComment.put("commentId",comment.getCommentId());
            singleComment.put("blogId",comment.getBlog().getBlogId());
            singleComment.put("userId",comment.getUser().getId());
            singleComment.put("userName",comment.getUser().getUsername());
            singleComment.put("commentText",comment.getCommentText());

            commentsData.add(singleComment);
        }
        return commentsData;
    }

    public Map<String,Object> updateCommentText(Long commentId,String commentText){
        Optional<BlogComment> optionalComment=commentRepository.findById(commentId);

        if (optionalComment.isEmpty()){
            throw new IllegalArgumentException("Comment with given id does not exist.");
        }
        BlogComment existingComment= optionalComment.get();
        if (commentText != null && (!commentText.isBlank())) {
            existingComment.setCommentText(commentText);
        }else {
            throw new IllegalArgumentException("Comment text is not provided or is empty.");
        }
        commentRepository.save(existingComment);

        Map<String,Object> singleComment=new HashMap<>();
        singleComment.put("commentId",existingComment.getCommentId());
        singleComment.put("blogId",existingComment.getBlog().getBlogId());
        singleComment.put("userId",existingComment.getUser().getId());
        singleComment.put("userName",existingComment.getUser().getUsername());
        singleComment.put("commentText",existingComment.getCommentText());

        return singleComment;
    }

    public Map<String,Object> getCommentById(Long commentId){
        BlogComment comment=commentRepository.findById(commentId).orElseThrow(()->new IllegalArgumentException("Comment with given id does not exist"));

        Map<String,Object> singleComment=new HashMap<>();
        singleComment.put("commentId",comment.getCommentId());
        singleComment.put("blogId",comment.getBlog().getBlogId());
        singleComment.put("userId",comment.getUser().getId());
        singleComment.put("userName",comment.getUser().getUsername());
        singleComment.put("commentText",comment.getCommentText());

        return singleComment;
    }

}
