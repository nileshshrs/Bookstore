package com.example.ebookstore.Repository;

import com.example.ebookstore.Entity.BlogComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogCommentRepository extends JpaRepository<BlogComment,Long> {

    List<BlogComment> findAllByBlog_BlogId(Long blogId);
}
