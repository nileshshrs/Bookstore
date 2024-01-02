package com.example.ebookstore.Controller;

import com.example.ebookstore.Entity.Blog;
import com.example.ebookstore.Entity.Users;
import com.example.ebookstore.Service.BlogService;
import com.example.ebookstore.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("api/v2/blogs")
@CrossOrigin(origins = "http://localhost:5173")
public class BlogController {
    private final BlogService blogService;
    private final UserService userService;

    public BlogController(BlogService blogService,UserService userService) {
        this.blogService = blogService;
        this.userService=userService;
    }

    @PostMapping("/add")
    public ResponseEntity<Object> createBlog(@RequestBody Map<String,Object> requestBody){
        try{
            String blogTitle = (String) requestBody.get("blogTitle");
            String blogDetails = (String) requestBody.get("blogDetails");
            String imagePath = (String) requestBody.get("imagePath");

            Long userId = ((Number) requestBody.get("userId")).longValue();

            Optional<Users> userOptional = userService.getUsersById(userId);
            if (userOptional.isEmpty()) {
                String errorMessage = "User not found.";
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("message", errorMessage);
                return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
            }

            Users user = userOptional.get();
            Blog blogItem=blogService.addBlog(blogTitle,user,blogDetails,imagePath);

            Map<String, Object> responseData = new HashMap<>();
            responseData.put("blogTitle", blogItem.getBlogTitle());
            responseData.put("blogDetails", blogItem.getBlogDetails());
            responseData.put("authorName", blogItem.getAuthor().getUsername());
            responseData.put("imagePath", blogItem.getImagePath());

            return new ResponseEntity<>(responseData, HttpStatus.OK);
        }catch (IllegalArgumentException e){
            String errorMessage = e.getMessage();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", errorMessage);
            return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Map<String,Object>>> getAllBlogs(){
        try{
            List<Map<String, Object>> allBlogs = blogService.getAllBlogs();
            return new ResponseEntity<>(allBlogs, HttpStatus.OK);
        }catch (Exception e) {
            List<Map<String, Object>> errorList=new ArrayList<>();
            Map<String, Object> error=new HashMap<>();
            error.put("message",e.getMessage());
            errorList.add(error);
            return new ResponseEntity<>(errorList,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getById/{blogId}")
    public ResponseEntity<Map<String,Object>> getBlogById(@PathVariable Long blogId){
        try{
            Blog existingBlog = blogService.getBlogById(blogId).orElseThrow(() -> new RuntimeException("Blog with given id not found"));

            Map<String,Object> blogData=new HashMap<>();
            blogData.put("blogId",existingBlog.getBlogId());
            blogData.put("blogTitle",existingBlog.getBlogTitle());
            blogData.put("authorName",existingBlog.getAuthor().getUsername());
            blogData.put("blogDetails",existingBlog.getBlogDetails());
            blogData.put("imagePath",existingBlog.getImagePath());


            return new ResponseEntity<>(blogData,HttpStatus.OK);
        }catch (RuntimeException e){
            Map<String,Object> errorMessage=new HashMap<>();
            errorMessage.put("message",e.getMessage());
            return new ResponseEntity<>(errorMessage,HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{blogId}")
    public ResponseEntity<Map<String,Object>> deleteBlog(@PathVariable Long blogId){
        try{
            blogService.deleteBlog(blogId);
            Map<String,Object> successMessage=new HashMap<>();
            successMessage.put("message","Blog Deleted Successfully");
            return new ResponseEntity<>(successMessage,HttpStatus.OK);

        }catch (IllegalArgumentException e){
            Map<String,Object> errorMessage=new HashMap<>();
            errorMessage.put("message",e.getMessage());
            return new ResponseEntity<>(errorMessage,HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/update/{blogId}")
    public ResponseEntity<Map<String,Object>> editBlog(@PathVariable Long blogId,@RequestBody Map<String,String> requestBody){
//        details title imgpath userid

        try {
            String blogTitle = requestBody.get("blogTitle");
            String blogDetails = requestBody.get("blogDetails");
            String blogImage = requestBody.get("imagePath");

            Blog changes = new Blog();
            changes.setBlogId(blogId);
            changes.setBlogTitle(blogTitle);
            changes.setBlogDetails(blogDetails);
            changes.setImagePath(blogImage);


            Blog updatedBlog = blogService.patchBlog(changes);

            Map<String, Object> blogData = new HashMap<>();
            blogData.put("blogId", updatedBlog.getBlogId());
            blogData.put("blogTitle", updatedBlog.getBlogTitle());
            blogData.put("authorName", updatedBlog.getAuthor().getUsername());
            blogData.put("blogDetails", updatedBlog.getBlogDetails());
            blogData.put("imagePath", updatedBlog.getImagePath());

            return new ResponseEntity<>(blogData,HttpStatus.OK);

        }catch (IllegalArgumentException e){
            Map<String,Object> errorResponse=new HashMap<>();
            errorResponse.put("Message",e.getMessage());
            return new ResponseEntity<>(errorResponse,HttpStatus.CONFLICT);
        }
    }
}
