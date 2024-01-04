package com.example.ebookstore.Repository;

import com.example.ebookstore.Entity.Blog;
import com.example.ebookstore.Entity.BlogComment;
import com.example.ebookstore.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogCommentRepository extends JpaRepository<BlogComment,Long> {
    boolean existsByBlogAndUser(Blog blog, Users user);

    List<BlogComment> findAllByBlog_BlogId(Long blogId);
}
