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
            singleBlog.put("authorName",blog.getAuthor().getUsername());
            singleBlog.put("blogDetails",blog.getBlogDetails());
            singleBlog.put("ImgPath",blog.getImagePath());

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

        if ( updatedBlog.getAuthor() != null) {
            throw new IllegalArgumentException("Author cant be changed.(Just delete it)");
            //this shouldnot happen but in case
        }
        if ((!(updatedBlog.getBlogTitle().equals(existingBlog.getBlogTitle()))) && blogRepository.existsByBlogTitle(updatedBlog.getBlogTitle())){
            throw new IllegalArgumentException("Blog with same title cant exist");
        }
        String []title_details_image={updatedBlog.getBlogTitle(),updatedBlog.getBlogDetails(),updatedBlog.getImagePath()};
        String updatedTitle=updatedBlog.getBlogTitle();
        String updatedDetails=updatedBlog.getBlogDetails();
        String updatedImagePath=updatedBlog.getImagePath();

        StringBuilder errorString=new StringBuilder();
        for (int i = 0; i < title_details_image.length; i++) {
            if (title_details_image[i].isBlank()) {
                switch (i){
                    case 0:
                        errorString.append("title is empty, ");
                        break;
                    case 1:
                        errorString.append("post(details) is empty, ");
                        break;
                    case 2:
                        errorString.append("imgPath is empty");
                        break;

                }
            }
        }
        if (!(errorString.toString().isBlank())){
            throw new IllegalArgumentException(errorString.toString());
        }

        if (updatedTitle!=null && !updatedTitle.isBlank() ){
            existingBlog.setBlogTitle(updatedBlog.getBlogTitle());
        }
        if (updatedDetails!=null && !updatedDetails.isBlank()){
            existingBlog.setBlogDetails(updatedBlog.getBlogDetails());
        }
        if (updatedImagePath!=null && !updatedImagePath.isBlank()){
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
