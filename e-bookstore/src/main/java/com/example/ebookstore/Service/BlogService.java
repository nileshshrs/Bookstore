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

    public Blog addBlog(String blogTitle, Users user,String imagePath,String blogDetails){
        if (blogTitle.isBlank() || blogDetails.isBlank() || imagePath.isBlank() ) {
            throw new IllegalArgumentException("Arguments provided are empty or invalid.");
        }
        if (blogRepository.existsByBlogTitle(blogTitle)) {
            throw new IllegalArgumentException("Blog with same title already exists");
        }

        Blog newBlog = new Blog();
        newBlog.setBlogDetails(blogDetails);
        newBlog.setBlogTitle(blogTitle);
        newBlog.setImagePath(imagePath);
        newBlog.setAuthor(user);
        return blogRepository.save(newBlog);
    }

    public List<Map<String,Object>> getAllBlogs(){
        List<Map<String,Object>> blogsData=new ArrayList<>();
        List<Blog> allBlogs=blogRepository.findAll();

        for (Blog blog : allBlogs) {
            Map<String,Object> singleBlog=new HashMap<>();
            singleBlog.put("blogId",blog.getBlogId());
            singleBlog.put("blogTitle",blog.getBlogTitle());
            singleBlog.put("blogAuthorName",blog.getAuthor().getUsername());
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

    public Blog patchBlog(Blog updatedBlog){

        Blog existingBlog=blogRepository.findById(updatedBlog.getBlogId()).orElseThrow(()-> new IllegalArgumentException("Blog doesnt exist"));

        if ((updatedBlog.getBlogId() != null) || (updatedBlog.getAuthor() != null)) {
            throw new IllegalArgumentException("Author and id cant be changed.(Just delete it)");
        }

        if (updatedBlog.getBlogTitle()!=null){
            existingBlog.setBlogTitle(updatedBlog.getBlogTitle());
        }
        if (updatedBlog.getBlogDetails()!=null){
            existingBlog.setBlogDetails(updatedBlog.getBlogDetails());
        }
        if (updatedBlog.getImagePath()!=null){
            existingBlog.setImagePath(updatedBlog.getImagePath());
        }
        return blogRepository.save(existingBlog);

//        private Users author;
//
//        private String blogDetails;
//
//
//        private String imagePath;
    }

    public Optional<Blog> getBlogById(Long blogId){
        return blogRepository.findById(blogId);
    }


}
