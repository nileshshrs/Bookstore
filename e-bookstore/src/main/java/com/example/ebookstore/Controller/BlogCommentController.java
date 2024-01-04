package com.example.ebookstore.Controller;

import com.example.ebookstore.Entity.Blog;
import com.example.ebookstore.Entity.Users;
import com.example.ebookstore.Service.BlogCommentService;
import com.example.ebookstore.Service.BlogService;
import com.example.ebookstore.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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

    @PostMapping("/addComment/{blogId}")
    public ResponseEntity<Map<String,Object>> addComment(@PathVariable Long blogId,@RequestBody Map<String,Object> requestBody){
        try{
            if (requestBody.get("commentText") == null || requestBody.get("userId") == null) {
                throw new IllegalArgumentException("Null values present");
            }
            String commentText = (String) requestBody.get("commentText");
            Long userId = ((Number) requestBody.get("userId")).longValue();


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
    @GetMapping("/getByBlog/{blogId}")
    public ResponseEntity<List<Map<String,Object>>> getCommentsByBlogId(@PathVariable Long blogId){
        try{
            Blog existingBlog = blogService.getBlogById(blogId).orElseThrow(() -> new IllegalArgumentException("Blog with given id does not exist"));
            List<Map<String, Object>> comments = commentService.getAllCommentsByBlogId(existingBlog.getBlogId());
            return new ResponseEntity<>(comments, HttpStatus.OK);
        } catch (IllegalArgumentException e){
            List<Map<String, Object>> errors =new ArrayList<>();
            Map<String,Object> message=new HashMap<>();
            message.put("Message",e.getMessage());
            errors.add(message);
            return new ResponseEntity<>(errors,HttpStatus.CONFLICT);
        }
    }
//    public ResponseEntity<Map<String,Object>>(Map<String,Object> requestBody)
//    public ResponseEntity<Map<String,Object>>(Map<String,Object> requestBody)

}
