package com.example.ebookstore.Service;

import com.example.ebookstore.Entity.Blog;
import com.example.ebookstore.Entity.Users;
import com.example.ebookstore.Repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BlogService {
    private final BlogRepository blogRepository;

    @Autowired
    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    public Blog addBlog(Blog newBlog){
//        String blogTitle, Users user,String imgPath,String blogDetails
        if (blogRepository.existsById(newBlog.getBlogId())){
            throw new IllegalArgumentException("BlogId already exists");    //if we were to pass same blogid(will nevre happen)
        }
        return blogRepository.save(newBlog);
    }

    public List<Map<String,Object>> getAllBlogs(){
        List<Map<String,Object>> blogsData=new ArrayList<>();
        List<Blog> allBlogs=blogRepository.findAll();

        for (Blog blog : allBlogs) {
            Map<String,Object> singleBlog=new HashMap<>();
            singleBlog.put("blogId",blog.getBlogId());
            singleBlog.put("blogTitle",blog.getBlogTitle());
            singleBlog.put("blogAuthorName",blog.getAuthor().getName());
            singleBlog.put("blogDetails",blog.getBlogDetails());
            singleBlog.put("blogImgPath",blog.getImagePath());

            blogsData.add(singleBlog);
        }
        return blogsData;
    }

    public void deleteBlog(Long blogId){
        Optional<Blog> existingBlog=blogRepository.findById(blogId);    //Can i just do existsBy??
        if (existingBlog.isEmpty()){
            throw new IllegalArgumentException("Blog does not Exist.");
        }
        blogRepository.deleteById(blogId);  //if we dont need this optional for delete
    }

}
