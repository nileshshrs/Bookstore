package com.example.ebookstore.Controller;

import com.example.ebookstore.Entity.Blog;
import com.example.ebookstore.Entity.BlogComment;
import com.example.ebookstore.Entity.Users;
import com.example.ebookstore.Service.BlogCommentService;
import com.example.ebookstore.Service.BlogService;
import com.example.ebookstore.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v2/blogs/comments")
@CrossOrigin(origins = "http://localhost:5173")
public class BlogCommentController {
    private final BlogCommentService commentService;
    private final UserService userService;
    private final BlogService blogService;

    @Autowired
    public BlogCommentController(BlogCommentService commentService, UserService userService, BlogService blogService) {
        this.commentService = commentService;
        this.userService = userService;
        this.blogService = blogService;
    }

    public ResponseEntity<Map<String,Object>> addComment(Map<String,Object> requestBody){
        try{
            if (requestBody.get("commentText") == null || requestBody.get("userId") == null || requestBody.get("blogId") == null) {
                throw new IllegalArgumentException("Null values present");
            }
            String commentText = (String) requestBody.get("commentText");
            Long userId = (Long) requestBody.get("userId");
            Long blogId = (Long) requestBody.get("blogId");

            Optional<Users> userOptional = userService.getUsersById(userId);
            Optional<Blog> blogOptional = blogService.getBlogById(blogId);

            if (userOptional.isPresent() && blogOptional.isPresent()) {
                Users user = userOptional.get();
                Blog blog = blogOptional.get();

                Map<String, Object> comment = commentService.addComment(commentText, user, blog);

                return new ResponseEntity<>(comment,HttpStatus.OK);
            }else {
                throw new IllegalArgumentException("User or blog id given is incorrect.");
            }
        }catch (IllegalArgumentException e){
            Map<String, Object> errorMessage=new HashMap<>();
            errorMessage.put("Message",e.getMessage());
            return new ResponseEntity<>(errorMessage,HttpStatus.CONFLICT);
        }
    }
//    public ResponseEntity<Map<String,Object>>(Map<String,Object> requestBody)
//    public ResponseEntity<Map<String,Object>>(Map<String,Object> requestBody)
//    public ResponseEntity<Map<String,Object>>(Map<String,Object> requestBody)

}
